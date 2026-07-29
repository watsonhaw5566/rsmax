const parser = require('@babel/parser');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const fs = require('fs-extra');
const path = require('node:path');
const {jsxToWxml} = require('@rsmax/babel-plugin-jsx-to-wxml');
const transformJsPlugin = require('@rsmax/babel-plugin-transform-js');
const {transformModule: babelTransformModule} = transformJsPlugin;
const {processStyle, isModuleFile, isStyleFile, MODULE_EXT_PATTERN} = require('./css-modules');
const {loadProjectConfig, detectInstalledLibraries, buildResolver, resolveComponents} = require('./component-resolver');
const {logger} = require("rslog");

const RUNTIME_SOURCE = require.resolve('@rsmax/runtime');
const STORE_SOURCE = require.resolve('@rsmax/store');
const STORE_MIDDLEWARE_SOURCE = require.resolve('@rsmax/store/middleware');
const I18N_SOURCE = require.resolve('@rsmax/i18n');

const STYLE_EXTS = ['.wxss', '.css', '.less', '.scss', '.sass'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
const STATIC_EXTS = [...STYLE_EXTS, '.json', '.wxml', ...IMAGE_EXTS];
const PREPROCESSOR_EXTS = ['.css', '.less', '.scss', '.sass'];

async function parseFile(filePath) {
    const code = await fs.readFile(filePath, 'utf-8');
    const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'classProperties']
    });
    return {ast, code};
}

function extractWxml(ast, code) {
    const result = jsxToWxml(ast, code);
    // jsxToWxml now returns { wxml, components }
    if (result && typeof result === 'object' && 'wxml' in result) {
        return result;
    }
    // Backward compatibility (in case of old format)
    return {wxml: result, components: new Set()};
}

function analyzeFile(ast) {
    let hasExportDefault = false;
    let isFunctionalExport = false;
    let hasRsmaxImport = false;
    let hasStoreCore = false;
    let hasStoreMiddleware = false;
    let hasI18n = false;

    traverse(ast, {
        ExportDefaultDeclaration(path) {
            hasExportDefault = true;
            const decl = path.node.declaration;
            if (t.isFunctionDeclaration(decl) || t.isArrowFunctionExpression(decl)) {
                isFunctionalExport = true;
            }
        },
        ImportDeclaration(path) {
            if (t.isStringLiteral(path.node.source, {value: '@rsmax/runtime'})) {
                hasRsmaxImport = true;
            }
            if (t.isStringLiteral(path.node.source, {value: '@rsmax/store'})) {
                hasStoreCore = true;
            }
            if (t.isStringLiteral(path.node.source, {value: '@rsmax/store/middleware'})) {
                hasStoreCore = true;
                hasStoreMiddleware = true;
            }
            if (t.isStringLiteral(path.node.source, {value: '@rsmax/i18n'})) {
                hasI18n = true;
            }
        },
        VariableDeclaration(path) {
            if (path.node.declarations.length === 1) {
                const decl = path.node.declarations[0];
                if (t.isCallExpression(decl.init) &&
                    t.isIdentifier(decl.init.callee, {name: 'require'}) &&
                    decl.init.arguments.length === 1 &&
                    t.isStringLiteral(decl.init.arguments[0])) {
                    const src = decl.init.arguments[0].value;
                    if (src === '@rsmax/runtime') hasRsmaxImport = true;
                    if (src === '@rsmax/store') hasStoreCore = true;
                    if (src === '@rsmax/store/middleware') {
                        hasStoreCore = true;
                        hasStoreMiddleware = true;
                    }
                    if (src === '@rsmax/i18n') hasI18n = true;
                }
            }
        }
    });

    return {
        hasExportDefault,
        isFunctionalExport,
        hasRsmaxImport,
        hasStoreCore,
        hasStoreMiddleware,
        hasI18n,
        needsRuntime: isFunctionalExport || hasRsmaxImport,
        needsStoreCore: hasStoreCore,
        needsStoreMiddleware: hasStoreMiddleware,
        needsI18n: hasI18n
    };
}

function needsTransform(ast, ext) {
    if (ext === '.jsx') return true;
    const info = analyzeFile(ast);
    return info.hasExportDefault;
}

function usesRuntime(ast) {
    const info = analyzeFile(ast);
    return info.needsRuntime;
}

function usesStore(ast) {
    const info = analyzeFile(ast);
    return info.needsStoreCore;
}

function usesStoreMiddleware(ast) {
    const info = analyzeFile(ast);
    return info.needsStoreMiddleware;
}

function usesI18n(ast) {
    const info = analyzeFile(ast);
    return info.needsI18n;
}

function hasEsModuleSyntax(ast) {
    let found = false;
    traverse(ast, {
        ImportDeclaration() {
            found = true;
        },
        ExportNamedDeclaration() {
            found = true;
        },
        ExportDefaultDeclaration() {
            found = true;
        },
        ExportAllDeclaration() {
            found = true;
        }
    });
    return found;
}

function calculateRuntimePath(targetFileDir, targetRoot) {
    const relative = path.relative(targetFileDir, targetRoot);
    if (relative === '') return './rsmax-runtime.js';
    return relative.split(path.sep).join('/') + '/rsmax-runtime.js';
}

function calculateStorePath(targetFileDir, targetRoot) {
    const relative = path.relative(targetFileDir, targetRoot);
    if (relative === '') return './rsmax-store.js';
    return relative.split(path.sep).join('/') + '/rsmax-store.js';
}

function calculateStoreMiddlewarePath(targetFileDir, targetRoot) {
    const relative = path.relative(targetFileDir, targetRoot);
    if (relative === '') return './rsmax-store-middleware.js';
    return relative.split(path.sep).join('/') + '/rsmax-store-middleware.js';
}

function calculateI18nPath(targetFileDir, targetRoot) {
    const relative = path.relative(targetFileDir, targetRoot);
    if (relative === '') return './rsmax-i18n.js';
    return relative.split(path.sep).join('/') + '/rsmax-i18n.js';
}

/**
 * Find the project's locales directory.
 * Priority: <projectRoot>/locales (conventional), then <srcDir>/locales.
 * Returns the absolute path to the locales dir, or null if not found.
 */
function findLocalesDir(projectRoot, srcDir) {
    const candidates = [
        path.join(projectRoot, 'locales'),
        path.join(srcDir, 'locales'),
    ];
    for (const dir of candidates) {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            return dir;
        }
    }
    return null;
}

let i18nCopiedOnce = false;

/**
 * Copy @rsmax/i18n runtime to dist root, copy locale JSON files from project,
 * and generate rsmax-i18n-locales.js that registers all locale messages.
 * Returns the list of locale codes discovered (e.g. ['en', 'zh-CN']).
 */
async function ensureI18nCopied(targetRoot, projectRoot, srcDir) {
    const i18nTarget = path.join(targetRoot, 'rsmax-i18n.js');
    if (!fs.existsSync(i18nTarget)) {
        fs.copySync(I18N_SOURCE, i18nTarget);
    }

    const localesDir = findLocalesDir(projectRoot, srcDir);
    let locales = [];
    if (localesDir) {
        // Always regenerate the locales module (locale files may have been added/changed)
        locales = await copyLocalesAndGenerate(localesDir, targetRoot);
    } else if (!i18nCopiedOnce) {
        // No locales dir found — generate an empty locales module so require() doesn't fail
        const localesModule = path.join(targetRoot, 'rsmax-i18n-locales.js');
        if (!fs.existsSync(localesModule)) {
            fs.writeFileSync(localesModule, 'module.exports = {};\n');
        }
    }

    i18nCopiedOnce = true;
    return locales;
}

async function copyLocalesAndGenerate(localesDir, targetRoot) {
    const targetLocalesDir = path.join(targetRoot, 'locales');
    fs.ensureDirSync(targetLocalesDir);

    // Find all .js locale files in the locales directory (flat, e.g. en.js, zh-CN.js)
    const entries = fs.readdirSync(localesDir);
    const localeCodes = [];
    const entries_js = [];

    for (const entry of entries) {
        const fullPath = path.join(localesDir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isFile() && entry.endsWith('.js')) {
            const localeCode = entry.replace(/\.js$/, '');
            localeCodes.push(localeCode);
            // Copy .js locale file directly to dist/locales/
            fs.copySync(fullPath, path.join(targetLocalesDir, entry));
            // Add a lazy require entry so locale files are only loaded when the language is used
            entries_js.push(`  '${localeCode}': function() { return require('./locales/${entry}'); }`);
        }
    }

    // Generate rsmax-i18n-locales.js
    const localesModule = path.join(targetRoot, 'rsmax-i18n-locales.js');
    const content = entries_js.length > 0
        ? 'module.exports = {\n' + entries_js.join(',\n') + '\n};\n'
        : 'module.exports = {};\n';
    fs.writeFileSync(localesModule, content);

    return localeCodes;
}

function transformJsCode(ast, code, type = 'page', paths = {}) {
    const {
        runtimePath = './rsmax-runtime.js',
        storePath = './rsmax-store.js',
        storeMiddlewarePath = './rsmax-store-middleware.js',
        i18nPath = './rsmax-i18n.js'
    } = paths;
    const result = babel.transformFromAstSync(ast, code, {
        plugins: [[transformJsPlugin, {type, runtimePath, storePath, storeMiddlewarePath, i18nPath}]],
        configFile: false,
        babelrc: false,
        generatorOpts: {retainLines: false, compact: false}
    });
    return result.code;
}

function getFileType(filePath) {
    const basename = path.basename(filePath);
    if (basename === 'app.js' || basename === 'app.jsx') {
        return 'app';
    }
    const normalizedPath = filePath.replace(/\\/g, '/');
    if (normalizedPath.includes('/components/')) {
        return 'component';
    }
    return 'page';
}

async function ensureRuntimeCopied(targetDir) {
    const runtimeTarget = path.join(targetDir, 'rsmax-runtime.js');
    if (!await fs.pathExists(runtimeTarget)) {
        await fs.copy(RUNTIME_SOURCE, runtimeTarget);
    }
}

async function ensureStoreCopied(targetDir, options = {}) {
    const {core = false, middleware = false} = options;
    if (core) {
        const storeTarget = path.join(targetDir, 'rsmax-store.js');
        if (!await fs.pathExists(storeTarget)) {
            await fs.copy(STORE_SOURCE, storeTarget);
        }
    }
    if (middleware) {
        const mwTarget = path.join(targetDir, 'rsmax-store-middleware.js');
        if (!await fs.pathExists(mwTarget)) {
            await fs.copy(STORE_MIDDLEWARE_SOURCE, mwTarget);
        }
    }
}

/**
 * Copy public directory contents to target root.
 * Files in public/ are copied directly to dist/, preserving directory structure:
 *   public/icon.png → dist/icon.png
 *   public/images/logo.png → dist/images/logo.png
 */
async function copyPublicDir(sourceDir, targetDir) {
    const publicDir = path.join(sourceDir, 'public');
    if (!await fs.pathExists(publicDir)) {
        return;
    }

    async function copyRecursive(src, dst) {
        const entries = await fs.readdir(src, {withFileTypes: true});
        await fs.ensureDir(dst);
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const dstPath = path.join(dst, entry.name);
            if (entry.isDirectory()) {
                await copyRecursive(srcPath, dstPath);
            } else {
                await fs.copy(srcPath, dstPath);
            }
        }
    }

    await copyRecursive(publicDir, targetDir);
}

async function compileStyleFile(sourcePath, forceModules = false) {
    const ext = path.extname(sourcePath);
    const useModules = forceModules || isModuleFile(sourcePath);
    const {css, classNames} = await processStyle(sourcePath, undefined, {ext, modules: useModules});
    return {css, classNames};
}

async function compileStyle(sourcePath) {
    const {css} = await compileStyleFile(sourcePath, false);
    return css;
}

function resolveStyleImport(sourceJsDir, importPath) {
    const ext = path.extname(importPath);
    if (ext && isStyleFile(importPath)) {
        return path.resolve(sourceJsDir, importPath);
    }
    for (const styleExt of STYLE_EXTS) {
        const candidate = path.resolve(sourceJsDir, importPath + styleExt);
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    for (const styleExt of PREPROCESSOR_EXTS) {
        const candidate = path.resolve(sourceJsDir, importPath + styleExt);
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }
    return path.resolve(sourceJsDir, importPath);
}

function collectStyleImports(ast, sourceJsDir) {
    const moduleStyles = [];
    const plainStyles = [];
    const importSources = new Set();

    function isLikelyStyleImport(source) {
        if (isStyleFile(source)) return true;
        return false;
    }

    traverse(ast, {
        ImportDeclaration(importPath) {
            const source = importPath.node.source.value;
            if (!isLikelyStyleImport(source)) return;

            const resolvedPath = resolveStyleImport(sourceJsDir, source);
            const isMod = isModuleFile(source) || isModuleFile(resolvedPath);

            importSources.add(resolvedPath);

            if (isMod) {
                let localName = 'styles';
                importPath.node.specifiers.forEach(spec => {
                    if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
                        localName = spec.local.name;
                    }
                });
                moduleStyles.push({source, resolvedPath, localName});
            } else {
                plainStyles.push({source, resolvedPath});
            }

            importPath.remove();
        },

        VariableDeclaration(varPath) {
            if (varPath.node.declarations.length !== 1) return;
            const decl = varPath.node.declarations[0];
            if (!t.isCallExpression(decl.init)) return;
            if (!t.isIdentifier(decl.init.callee, {name: 'require'})) return;
            if (decl.init.arguments.length !== 1) return;
            if (!t.isStringLiteral(decl.init.arguments[0])) return;

            const source = decl.init.arguments[0].value;
            if (!isLikelyStyleImport(source)) return;

            const resolvedPath = resolveStyleImport(sourceJsDir, source);
            const isMod = isModuleFile(source) || isModuleFile(resolvedPath);

            importSources.add(resolvedPath);

            if (isMod) {
                let localName = 'styles';
                if (t.isIdentifier(decl.id)) {
                    localName = decl.id.name;
                } else if (t.isObjectPattern(decl.id)) {
                    const prop = decl.id.properties.find(p => t.isObjectProperty(p) && t.isIdentifier(p.key, {name: 'default'}));
                    if (prop && t.isIdentifier(prop.value)) localName = prop.value.name;
                }
                moduleStyles.push({source, resolvedPath, localName});
                varPath.remove();
            } else {
                plainStyles.push({source, resolvedPath});
                varPath.remove();
            }
        }
    });

    return {moduleStyles, plainStyles, importSources};
}

function injectModuleStylesConst(ast, moduleStylesMappings) {
    if (moduleStylesMappings.length === 0) return;

    function isValidIdentifier(name) {
        return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
    }

    function buildObjectExpr(classNames) {
        const properties = Object.keys(classNames).map(key => {
            const keyNode = isValidIdentifier(key) ? t.identifier(key) : t.stringLiteral(key);
            return t.objectProperty(keyNode, t.stringLiteral(classNames[key]));
        });
        return t.objectExpression(properties);
    }

    const body = ast.program.body;
    const exportDefaultIndex = body.findIndex(stmt => t.isExportDefaultDeclaration(stmt));

    if (exportDefaultIndex === -1) {
        // No export default - inject at module level (fallback)
        const stmtsToInject = moduleStylesMappings.map(({localName, classNames}) =>
            t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier(localName), buildObjectExpr(classNames))
            ])
        );
        body.unshift(...stmtsToInject);
        return;
    }

    const exportDecl = body[exportDefaultIndex];
    const declaration = exportDecl.declaration;

    // Build statements: const styles = {...}; this.setData({ styles });
    function buildInjectStmts(localName, classNames) {
        const objExpr = buildObjectExpr(classNames);
        return [
            t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier(localName), objExpr)
            ]),
            t.expressionStatement(
                t.callExpression(
                    t.memberExpression(t.thisExpression(), t.identifier('setData')),
                    [
                        t.objectExpression([
                            t.objectProperty(t.identifier(localName), t.identifier(localName), false, false)
                        ])
                    ]
                )
            )
        ];
    }

    const allStmts = [];
    moduleStylesMappings.forEach(({localName, classNames}) => {
        allStmts.push(...buildInjectStmts(localName, classNames));
    });

    // Determine if the export is a functional component (function or arrow function with JSX)
    let fnBody = null;

    if (t.isFunctionDeclaration(declaration)) {
        fnBody = declaration.body;
    } else if (t.isArrowFunctionExpression(declaration)) {
        if (t.isBlockStatement(declaration.body)) {
            fnBody = declaration.body;
        } else {
            // Expression body (e.g., () => <view/>) - wrap in block statement
            fnBody = t.blockStatement([t.returnStatement(declaration.body)]);
            declaration.body = fnBody;
        }
    }

    if (fnBody && t.isBlockStatement(fnBody)) {
        // Inject at the beginning of the function body so this.data gets set
        // before any hooks run, ensuring WXML can access {{styles.xxx}}
        fnBody.body.unshift(...allStmts);
    } else {
        // Non-functional export (plain object, class) - inject at module level
        // without this.data assignment (no `this` context at module scope)
        const moduleLevelStmts = moduleStylesMappings.map(({localName, classNames}) =>
            t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier(localName), buildObjectExpr(classNames))
            ])
        );
        body.splice(exportDefaultIndex, 0, ...moduleLevelStmts);
    }
}

function getWxssImportPath(fromWxssDir, toWxssPath) {
    let rel = path.relative(fromWxssDir, toWxssPath);
    if (!rel.startsWith('.')) rel = './' + rel;
    return rel.split(path.sep).join('/');
}

async function ensureStyleCompiled(resolvedSourcePath, targetJsDir, sourceJsDir, compiledCache, inlineMode = false) {
    if (!inlineMode && compiledCache.has(resolvedSourcePath)) {
        return compiledCache.get(resolvedSourcePath);
    }

    const ext = path.extname(resolvedSourcePath);
    const isMod = isModuleFile(resolvedSourcePath);
    const relPath = path.relative(sourceJsDir, resolvedSourcePath);
    const baseName = path.basename(relPath, ext);
    const dirName = path.dirname(relPath);

    const {css, classNames} = await compileStyleFile(resolvedSourcePath);

    let result;
    if (inlineMode && isMod) {
        // For inlined module styles, don't write a separate file - return CSS content for inlining
        result = {targetWxssPath: null, cssContent: css, classNames: isMod ? classNames : null};
    } else {
        const targetWxssPath = path.join(targetJsDir, dirName, baseName + '.wxss');
        await fs.ensureDir(path.dirname(targetWxssPath));
        await fs.writeFile(targetWxssPath, css, 'utf-8');
        result = {targetWxssPath, classNames: isMod ? classNames : null};
        compiledCache.set(resolvedSourcePath, result);
    }
    return result;
}

async function findAndCompileStyle(sourceBasePath, targetWxssPath, importedStylePaths, compiledCache) {
    for (const ext of STYLE_EXTS) {
        const stylePath = sourceBasePath + ext;
        if (!await fs.pathExists(stylePath)) continue;
        if (isModuleFile(stylePath)) continue;

        if (compiledCache.has(stylePath)) {
            const cached = compiledCache.get(stylePath);
            if (path.resolve(cached.targetWxssPath) !== path.resolve(targetWxssPath)) {
                await fs.copy(cached.targetWxssPath, targetWxssPath);
            }
            return {found: true};
        }

        if (ext === '.wxss') {
            await fs.copy(stylePath, targetWxssPath);
        } else {
            const {css} = await compileStyleFile(stylePath);
            await fs.writeFile(targetWxssPath, css, 'utf-8');
        }
        compiledCache.set(stylePath, {targetWxssPath, classNames: null});
        return {found: true};
    }
    return {found: false};
}

async function compileFile(sourcePath, targetPath, options = {}) {
    const ext = path.extname(sourcePath);
    const basename = path.basename(sourcePath, ext);
    const targetDir = path.dirname(targetPath);
    const {targetRoot, projectRoot, srcDir} = options;
    const compiledCache = options.compiledCache || new Map();

    await fs.ensureDir(targetDir);

    if (ext === '.jsx' || ext === '.js') {
        const {ast, code} = await parseFile(sourcePath);
        const fileType = getFileType(sourcePath);
        const shouldTransform = needsTransform(ast, ext);
        const sourceJsDir = path.dirname(sourcePath);
        const targetJsDir = targetDir;

        let wxssImports = [];
        let moduleStylesMappings = [];
        let moduleInlineCss = [];
        let importSources = new Set();
        let customComponents = new Set();

        if (shouldTransform) {
            const needsRuntimeInFile = usesRuntime(ast);
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);

            if (needsRuntimeInFile && targetRoot) {
                await ensureRuntimeCopied(targetRoot);
            }
            if (targetRoot && (needsStoreCoreInFile || needsStoreMwInFile)) {
                await ensureStoreCopied(targetRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile && targetRoot) {
                await ensureI18nCopied(targetRoot, projectRoot, srcDir);
            }

            const collected = collectStyleImports(ast, sourceJsDir);
            importSources = collected.importSources;
            const {moduleStyles, plainStyles} = collected;

            for (const style of plainStyles) {
                if (!await fs.pathExists(style.resolvedPath)) continue;
                const compiled = await ensureStyleCompiled(style.resolvedPath, targetJsDir, sourceJsDir, compiledCache);
                wxssImports.push(compiled.targetWxssPath);
            }

            for (const style of moduleStyles) {
                if (!await fs.pathExists(style.resolvedPath)) continue;
                // Module styles are inlined directly into the page wxss (no separate file)
                const compiled = await ensureStyleCompiled(style.resolvedPath, targetJsDir, sourceJsDir, compiledCache, true);
                if (compiled.classNames) {
                    moduleStylesMappings.push({localName: style.localName, classNames: compiled.classNames});
                }
                if (compiled.cssContent) {
                    moduleInlineCss.push(compiled.cssContent);
                }
            }

            injectModuleStylesConst(ast, moduleStylesMappings);

            const {wxml, components} = extractWxml(ast, code);
            customComponents = components || new Set();
            if (wxml && fileType !== 'app') {
                const wxmlPath = path.join(targetDir, basename + '.wxml');
                await fs.writeFile(wxmlPath, wxml, 'utf-8');
            }

            const paths = {};
            if (needsRuntimeInFile && targetRoot) {
                paths.runtimePath = calculateRuntimePath(targetDir, targetRoot);
            }
            if (needsStoreCoreInFile && targetRoot) {
                paths.storePath = calculateStorePath(targetDir, targetRoot);
            }
            if (needsStoreMwInFile && targetRoot) {
                paths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetDir, targetRoot);
            }
            if (needsI18nInFile && targetRoot) {
                paths.i18nPath = calculateI18nPath(targetDir, targetRoot);
            }

            const jsCode = transformJsCode(ast, code, fileType, paths);
            const jsTargetPath = path.join(targetDir, basename + '.js');
            await fs.writeFile(jsTargetPath, jsCode, 'utf-8');
        } else if (hasEsModuleSyntax(ast)) {
            // Plain ES module (e.g. store definitions) - convert to CommonJS
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (targetRoot && (needsStoreCoreInFile || needsStoreMwInFile)) {
                await ensureStoreCopied(targetRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile && targetRoot) {
                await ensureI18nCopied(targetRoot, projectRoot, srcDir);
            }
            const modulePaths = {};
            if (needsStoreCoreInFile && targetRoot) {
                modulePaths.storePath = calculateStorePath(targetDir, targetRoot);
            }
            if (needsStoreMwInFile && targetRoot) {
                modulePaths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetDir, targetRoot);
            }
            if (needsI18nInFile && targetRoot) {
                modulePaths.i18nPath = calculateI18nPath(targetDir, targetRoot);
            }
            const jsCode = babelTransformModule(ast, code, modulePaths);
            await fs.writeFile(targetPath, jsCode, 'utf-8');
        } else {
            await fs.copy(sourcePath, targetPath);
        }

        // Generate or merge JSON config with usingComponents for custom UI components
        const jsonPath = sourcePath.replace(ext, '.json');
        const jsonTarget = path.join(targetDir, basename + '.json');
        let pageConfig = {};

        if (await fs.pathExists(jsonPath)) {
            pageConfig = await fs.readJson(jsonPath);
        }

        // For component files (in components/ directory), ensure "component": true
        if (fileType === 'component') {
            pageConfig.component = true;
        }

        // Resolve component paths if we have custom components and a resolver
        if (customComponents.size > 0 && options.componentResolver) {
            const autoUsingComponents = resolveComponents(customComponents, options.componentResolver);
            if (Object.keys(autoUsingComponents).length > 0) {
                pageConfig.usingComponents = {
                    ...autoUsingComponents,
                    ...(pageConfig.usingComponents || {})
                };
            }
        }

        // Write JSON if: there is an existing source .json, we added usingComponents,
        // or this is a component (needs "component": true)
        const shouldWriteJson = await fs.pathExists(jsonPath)
            || (pageConfig.usingComponents && Object.keys(pageConfig.usingComponents).length > 0)
            || fileType === 'component';
        if (shouldWriteJson) {
            await fs.writeJson(jsonTarget, pageConfig, {spaces: 2});
        }

        const wxssTarget = path.join(targetDir, basename + '.wxss');
        await findAndCompileStyle(
            sourcePath.replace(ext, ''),
            wxssTarget,
            importSources,
            compiledCache
        );

        let wxssContent = '';
        if (await fs.pathExists(wxssTarget)) {
            wxssContent = await fs.readFile(wxssTarget, 'utf-8');
        }

        const importStatements = wxssImports
            .filter(w => path.resolve(w) !== path.resolve(wxssTarget))
            .map(w => `@import "${getWxssImportPath(path.dirname(wxssTarget), w)}";`)
            .join('\n');

        if (importStatements) {
            wxssContent = importStatements + '\n' + wxssContent;
        }

        // Append inlined module CSS directly to the wxss (no separate .module.wxss file)
        if (moduleInlineCss.length > 0) {
            const inlineContent = moduleInlineCss.join('\n');
            wxssContent = wxssContent + (wxssContent ? '\n' : '') + inlineContent;
        }

        if (wxssContent || wxssImports.length > 0 || moduleInlineCss.length > 0) {
            await fs.writeFile(wxssTarget, wxssContent, 'utf-8');
        }

    } else if (STYLE_EXTS.includes(ext) && ext !== '.wxss') {
        if (options.skipStyleCompilation) return;
        // Skip module style files in standalone mode - they are inlined into the importing page's wxss
        if (isModuleFile(sourcePath)) return;
        if (compiledCache && compiledCache.has(sourcePath)) return;
        const targetWxssPath = path.join(targetDir, basename + '.wxss');
        await fs.ensureDir(path.dirname(targetWxssPath));
        const {css} = await compileStyleFile(sourcePath);
        await fs.writeFile(targetWxssPath, css, 'utf-8');
        compiledCache.set(sourcePath, {targetWxssPath, classNames: null});
    } else if (ext === '.wxss') {
        if (compiledCache && compiledCache.has(sourcePath)) return;
        await fs.copy(sourcePath, targetPath);
        compiledCache.set(sourcePath, {targetWxssPath: targetPath, classNames: null});
    } else if (ext === '.json' || ext === '.wxml' || IMAGE_EXTS.includes(ext)) {
        await fs.copy(sourcePath, targetPath);
    } else {
        await fs.copy(sourcePath, targetPath);
    }
}

async function compileDir(sourceDir, targetDir, options = {}) {
    await fs.ensureDir(targetDir);

    const opts = options.targetRoot ? {...options} : {...options, targetRoot: targetDir};
    const compiledCache = new Map();
    opts.compiledCache = compiledCache;

    // Track source root for public directory detection
    if (!opts.sourceRoot) {
        opts.sourceRoot = sourceDir;
    }

    const entries = await fs.readdir(sourceDir, {withFileTypes: true});

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
            if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === '.git') {
                continue;
            }
            // Skip public directory at source root - handled separately by copyPublicDir
            if (entry.name === 'public' && sourceDir === opts.sourceRoot) {
                continue;
            }
            await compileDir(sourcePath, targetPath, opts);
        } else {
            await compileFile(sourcePath, targetPath, opts);
        }
    }
}

async function compile(sourceDir, targetDir, options = {}) {
    logger.log(`[rsmax] Compiling ${sourceDir} -> ${targetDir}`);

    // Reset idempotent-copy flags for a fresh build
    i18nCopiedOnce = false;

    // Ensure target directory exists, but do NOT empty it (incremental build).
    // miniprogram_npm and other existing files are preserved across builds.
    // Use `rsmax clean` for a full clean build.
    await fs.ensureDir(targetDir);

    // Copy public directory static assets to target root (overwrites existing files)
    await copyPublicDir(sourceDir, targetDir);

    // Load project config and detect installed UI libraries
    // Note: Do NOT copy package.json into targetDir (miniprogramRoot).
    // When using packNpmManually, DevTools uses packNpmRelationList to find package.json;
    // a package.json inside miniprogramRoot without adjacent node_modules can cause issues.
    const projectRoot = path.dirname(sourceDir);
    const projectPkgPath = path.join(projectRoot, 'package.json');
    let projectPkg = {};
    if (await fs.pathExists(projectPkgPath)) {
        projectPkg = await fs.readJson(projectPkgPath);
    }
    const projectConfig = await loadProjectConfig(projectRoot);
    const installedPresets = detectInstalledLibraries(projectPkg);
    const componentResolver = buildResolver(projectConfig, installedPresets);

    await compileDir(sourceDir, targetDir, {targetRoot: targetDir, projectRoot, srcDir: sourceDir, componentResolver});

    logger.success('[rsmax] Compilation complete!');
}

async function watch(sourceDir, targetDir, options = {}) {
    const chokidar = require('chokidar');

    logger.log(`[rsmax] Watching ${sourceDir} for changes...`);

    await compile(sourceDir, targetDir, options);

    // Build component resolver for watch mode (same as in compile())
    const projectRoot = path.dirname(sourceDir);
    const projectPkgPath = path.join(projectRoot, 'package.json');
    let projectPkg = {};
    if (await fs.pathExists(projectPkgPath)) {
        projectPkg = await fs.readJson(projectPkgPath);
    }
    const projectConfig = await loadProjectConfig(projectRoot);
    const installedPresets = detectInstalledLibraries(projectPkg);
    const watchComponentResolver = buildResolver(projectConfig, installedPresets);

    const ignored = [
        /node_modules/,
        /\.git/,
        filePath => {
            const resolved = path.resolve(filePath);
            return resolved.startsWith(path.resolve(targetDir));
        }
    ];

    const watcher = chokidar.watch(sourceDir, {
        ignored,
        persistent: true,
        ignoreInitial: true
    });

    async function handleJsFileEvent(filePath, targetPath) {
        const ext = path.extname(filePath);
        const {ast, code} = await parseFile(filePath);
        const basename = path.basename(filePath, ext);
        const targetFileDir = path.dirname(targetPath);
        const fileType = getFileType(filePath);
        const sourceJsDir = path.dirname(filePath);
        const compiledCache = new Map();

        const shouldTransform = ext === '.jsx' || needsTransform(ast);
        let customComponents = new Set();

        if (shouldTransform) {
            const needsRuntimeInFile = usesRuntime(ast);
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (needsRuntimeInFile) {
                await ensureRuntimeCopied(targetDir);
            }
            if (needsStoreCoreInFile || needsStoreMwInFile) {
                await ensureStoreCopied(targetDir, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile) {
                await ensureI18nCopied(targetDir, projectRoot, sourceDir);
            }

            const {moduleStyles, plainStyles, importSources} = collectStyleImports(ast, sourceJsDir);
            let wxssImports = [];
            let moduleStylesMappings = [];
            let moduleInlineCss = [];

            for (const style of plainStyles) {
                if (!await fs.pathExists(style.resolvedPath)) continue;
                const compiled = await ensureStyleCompiled(style.resolvedPath, targetFileDir, sourceJsDir, compiledCache);
                wxssImports.push(compiled.targetWxssPath);
            }

            for (const style of moduleStyles) {
                if (!await fs.pathExists(style.resolvedPath)) continue;
                const compiled = await ensureStyleCompiled(style.resolvedPath, targetFileDir, sourceJsDir, compiledCache, true);
                if (compiled.classNames) {
                    moduleStylesMappings.push({localName: style.localName, classNames: compiled.classNames});
                }
                if (compiled.cssContent) {
                    moduleInlineCss.push(compiled.cssContent);
                }
            }

            injectModuleStylesConst(ast, moduleStylesMappings);

            const {wxml, components} = extractWxml(ast, code);
            customComponents = components || new Set();
            if (wxml && fileType !== 'app') {
                const wxmlPath = path.join(targetFileDir, basename + '.wxml');
                await fs.writeFile(wxmlPath, wxml, 'utf-8');
            }

            const paths = {};
            if (needsRuntimeInFile) {
                paths.runtimePath = calculateRuntimePath(targetFileDir, targetDir);
            }
            if (needsStoreCoreInFile) {
                paths.storePath = calculateStorePath(targetFileDir, targetDir);
            }
            if (needsStoreMwInFile) {
                paths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetFileDir, targetDir);
            }
            if (needsI18nInFile) {
                paths.i18nPath = calculateI18nPath(targetFileDir, targetDir);
            }

            const jsCode = transformJsCode(ast, code, fileType, paths);
            await fs.writeFile(path.join(targetFileDir, basename + '.js'), jsCode, 'utf-8');

            const wxssTarget = path.join(targetFileDir, basename + '.wxss');
            await findAndCompileStyle(filePath.replace(ext, ''), wxssTarget, importSources, compiledCache);

            let wxssContent = '';
            if (await fs.pathExists(wxssTarget)) {
                wxssContent = await fs.readFile(wxssTarget, 'utf-8');
            }

            const importStatements = wxssImports
                .filter(w => path.resolve(w) !== path.resolve(wxssTarget))
                .map(w => `@import "${getWxssImportPath(path.dirname(wxssTarget), w)}";`)
                .join('\n');

            if (importStatements) {
                wxssContent = importStatements + '\n' + wxssContent;
            }
            if (moduleInlineCss.length > 0) {
                const inlineContent = moduleInlineCss.join('\n');
                wxssContent = wxssContent + (wxssContent ? '\n' : '') + inlineContent;
            }
            if (wxssContent || moduleInlineCss.length > 0) {
                await fs.writeFile(wxssTarget, wxssContent, 'utf-8');
            }
        } else if (hasEsModuleSyntax(ast)) {
            // Plain ES module (e.g. store definitions) - convert to CommonJS
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (needsStoreCoreInFile || needsStoreMwInFile) {
                await ensureStoreCopied(targetDir, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile) {
                await ensureI18nCopied(targetDir, projectRoot, sourceDir);
            }
            const modulePaths = {};
            if (needsStoreCoreInFile) {
                modulePaths.storePath = calculateStorePath(targetFileDir, targetDir);
            }
            if (needsStoreMwInFile) {
                modulePaths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetFileDir, targetDir);
            }
            if (needsI18nInFile) {
                modulePaths.i18nPath = calculateI18nPath(targetFileDir, targetDir);
            }
            const jsCode = babelTransformModule(ast, code, modulePaths);
            await fs.writeFile(targetPath, jsCode, 'utf-8');
        } else {
            await fs.copy(filePath, targetPath);
        }

        // Generate or merge JSON config with usingComponents
        const jsonPath = filePath.replace(ext, '.json');
        const jsonTarget = path.join(targetFileDir, basename + '.json');
        let pageConfig = {};

        if (await fs.pathExists(jsonPath)) {
            pageConfig = await fs.readJson(jsonPath);
        }

        // For component files, ensure "component": true
        if (fileType === 'component') {
            pageConfig.component = true;
        }

        if (customComponents.size > 0 && watchComponentResolver) {
            const autoUsingComponents = resolveComponents(customComponents, watchComponentResolver);
            if (Object.keys(autoUsingComponents).length > 0) {
                pageConfig.usingComponents = {
                    ...autoUsingComponents,
                    ...(pageConfig.usingComponents || {})
                };
            }
        }

        const shouldWriteJson = await fs.pathExists(jsonPath)
            || (pageConfig.usingComponents && Object.keys(pageConfig.usingComponents).length > 0)
            || fileType === 'component';
        if (shouldWriteJson) {
            await fs.writeJson(jsonTarget, pageConfig, {spaces: 2});
        }
    }

    async function handleStyleFileEvent(filePath, targetPath) {
        const ext = path.extname(filePath);
        if (ext === '.wxss') {
            await fs.copy(filePath, targetPath);
            return;
        }
        const basename = path.basename(filePath, ext);
        const targetFileDir = path.dirname(targetPath);
        const targetWxssPath = path.join(targetFileDir, basename + '.wxss');
        await fs.ensureDir(path.dirname(targetWxssPath));
        const {css} = await compileStyleFile(filePath);
        await fs.writeFile(targetWxssPath, css, 'utf-8');
    }

    /**
     * Check if a file is inside the public directory and get its mapped target path.
     * Files in public/ map directly to dist root:
     *   public/icon.png → dist/icon.png
     *   public/images/logo.png → dist/images/logo.png
     * Returns null for the public directory itself (to avoid accidentally deleting dist root).
     */
    function getPublicTargetPath(filePath) {
        const normalizedSource = path.resolve(sourceDir);
        const normalizedFile = path.resolve(filePath);
        const publicDir = path.join(normalizedSource, 'public');
        // Don't map the public directory itself - that would point to dist root
        if (normalizedFile === publicDir) {
            return {isPublicRoot: true};
        }
        if (normalizedFile.startsWith(publicDir + path.sep)) {
            const relativeToPublic = path.relative(publicDir, normalizedFile);
            return {targetPath: path.join(targetDir, relativeToPublic)};
        }
        return null;
    }

    async function handleFileEvent(event, filePath) {
        const ext = path.extname(filePath);

        // Check if file is in public directory - copy directly to target root
        const publicInfo = getPublicTargetPath(filePath);
        if (publicInfo && publicInfo.targetPath) {
            try {
                await fs.ensureDir(path.dirname(publicInfo.targetPath));
                await fs.copy(filePath, publicInfo.targetPath);
                const relPath = path.relative(sourceDir, filePath);
                logger.log(`[rsmax] ${event}: ${relPath} (public asset)`);
            } catch (err) {
                const relPath = path.relative(sourceDir, filePath);
                logger.error(`[rsmax] Error ${event.toLowerCase()} ${relPath}:`, err.message);
            }
            return;
        }

        const relativePath = path.relative(sourceDir, filePath);
        const targetPath = path.join(targetDir, relativePath);

        try {
            await fs.ensureDir(path.dirname(targetPath));

            if (ext === '.jsx' || ext === '.js') {
                await handleJsFileEvent(filePath, targetPath);
            } else if (STYLE_EXTS.includes(ext)) {
                await handleStyleFileEvent(filePath, targetPath);
            } else {
                await fs.copy(filePath, targetPath);
            }

            logger.log(`[rsmax] ${event}: ${relativePath}`);
        } catch (err) {
            logger.error(`[rsmax] Error ${event.toLowerCase()} ${relativePath}:`, err.message);
        }
    }

    watcher.on('change', (filePath) => handleFileEvent('Changed', filePath));
    watcher.on('add', (filePath) => handleFileEvent('Added', filePath));

    watcher.on('unlink', async (filePath) => {
        // Check if file was in public directory
        const publicInfo = getPublicTargetPath(filePath);
        if (publicInfo) {
            if (publicInfo.targetPath) {
                try {
                    await fs.remove(publicInfo.targetPath);
                    const relPath = path.relative(sourceDir, filePath);
                    logger.log(`[rsmax] Removed: ${relPath} (public asset)`);
                } catch (err) {
                    const relPath = path.relative(sourceDir, filePath);
                    logger.error(`[rsmax] Error removing ${relPath}:`, err.message);
                }
            }
            // If publicInfo.isPublicRoot, do nothing (don't delete dist)
            return;
        }

        const relativePath = path.relative(sourceDir, filePath);
        const ext = path.extname(filePath);
        const basename = path.basename(filePath, ext);

        try {
            if (STYLE_EXTS.includes(ext) && ext !== '.wxss') {
                const targetWxssPath = path.join(targetDir, path.dirname(relativePath), basename + '.wxss');
                const sourceBasePath = filePath.replace(ext, '');

                let hasOtherStyle = false;
                for (const otherExt of STYLE_EXTS) {
                    if (otherExt !== ext && await fs.pathExists(sourceBasePath + otherExt)) {
                        hasOtherStyle = true;
                        await handleFileEvent('Changed', sourceBasePath + otherExt);
                        break;
                    }
                }

                if (!hasOtherStyle) {
                    await fs.remove(targetWxssPath);
                }
            } else {
                const targetPath = path.join(targetDir, relativePath);
                await fs.remove(targetPath);
            }
            logger.log(`[rsmax] Removed: ${relativePath}`);
        } catch (err) {
            logger.error(`[rsmax] Error removing ${relativePath}:`, err.message);
        }
    });

    // Handle directory removal (including public subdirectories)
    watcher.on('unlinkDir', async (dirPath) => {
        const publicInfo = getPublicTargetPath(dirPath);
        if (publicInfo) {
            if (publicInfo.targetPath) {
                try {
                    await fs.remove(publicInfo.targetPath);
                    const relPath = path.relative(sourceDir, dirPath);
                    logger.log(`[rsmax] Removed directory: ${relPath} (public asset)`);
                } catch (err) {
                    const relPath = path.relative(sourceDir, dirPath);
                    logger.error(`[rsmax] Error removing directory ${relPath}:`, err.message);
                }
            }
            // If publicInfo.isPublicRoot (the public/ dir itself), trigger a full rebuild is safest
            if (publicInfo.isPublicRoot) {
                logger.log('[rsmax] public/ directory removed, triggering full rebuild...');
                await compile(sourceDir, targetDir);
            }
            return;
        }
        // For non-public directories, remove corresponding target directory
        const relativePath = path.relative(sourceDir, dirPath);
        const targetPath = path.join(targetDir, relativePath);
        try {
            // Only remove if not a special directory we manage
            const baseName = path.basename(dirPath);
            if (!['dist', 'node_modules', '.git', 'miniprogram_npm', 'public'].includes(baseName)) {
                await fs.remove(targetPath);
                logger.log(`[rsmax] Removed directory: ${relativePath}`);
            }
        } catch (err) {
            logger.error(`[rsmax] Error removing directory ${relativePath}:`, err.message);
        }
    });

    return watcher;
}

async function clean(targetDir) {
    if (!(await fs.pathExists(targetDir))) {
        logger.log(`[rsmax] ${targetDir} does not exist, nothing to clean`);
        return;
    }
    // Preserve miniprogram_npm (generated by WeChat DevTools "Build npm")
    const npmDir = path.join(targetDir, 'miniprogram_npm');
    const hasNpm = await fs.pathExists(npmDir);
    const npmBackupDir = path.join(targetDir, '..', '.miniprogram_npm_backup_' + path.basename(targetDir));
    if (hasNpm) {
        await fs.move(npmDir, npmBackupDir, {overwrite: true});
    }
    await fs.remove(targetDir);
    await fs.ensureDir(targetDir);
    if (hasNpm) {
        await fs.move(npmBackupDir, npmDir);
        logger.log(`[rsmax] Cleaned ${targetDir} (preserved miniprogram_npm)`);
    } else {
        logger.log(`[rsmax] Cleaned ${targetDir}`);
    }
}

module.exports = {
    compile,
    compileFile,
    compileDir,
    watch,
    clean,
    parseFile,
    extractWxml,
    transformJsCode,
    calculateRuntimePath,
    calculateStorePath,
    calculateStoreMiddlewarePath,
    calculateI18nPath,
    getFileType,
    compileStyle,
    compileStyleFile,
    collectStyleImports,
    injectModuleStylesConst,
    processStyle,
    isModuleFile,
    isStyleFile,
    RUNTIME_SOURCE
};
