const parser = require('@babel/parser');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const fs = require('fs-extra');
const path = require('node:path');
const {jsxToWxml} = require('@rsmax/babel-plugin-jsx-to-wxml');
const transformJsPlugin = require('@rsmax/babel-plugin-transform-js');
const {transformModule: babelTransformModule} = transformJsPlugin;
const {processStyle, isModuleFile, isStyleFile} = require('./css-modules');
const {loadProjectConfig, detectInstalledLibraries, buildResolver, resolveComponents} = require('./component-resolver');
const {logger} = require("rslog");

const RUNTIME_SOURCE = require.resolve('@rsmax/runtime');
const STORE_SOURCE = require.resolve('@rsmax/store');
const STORE_MIDDLEWARE_SOURCE = require.resolve('@rsmax/store/middleware');
const I18N_SOURCE = require.resolve('@rsmax/i18n');

const STYLE_EXTS = ['.wxss', '.css', '.less', '.scss', '.sass'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
const PREPROCESSOR_EXTS = ['.css', '.less', '.scss', '.sass'];
const WXS_EXT = '.wxs';

/**
 * Parse app.json to extract subPackages (also aliased as subpackages) configuration.
 * Returns an array of normalized sub-package descriptors:
 *   { root: 'packageA', pages: [...], independent: false, name?: '...' }
 * Returns empty array if no subPackages defined.
 */
async function parseSubPackages(srcDir) {
    const appJsonPath = path.join(srcDir, 'app.json');
    if (!await fs.pathExists(appJsonPath)) return [];
    try {
        const appConfig = await fs.readJson(appJsonPath);
        const raw = appConfig.subPackages || appConfig.subpackages || [];
        return raw.map(sp => ({
            root: sp.root.replace(/\/+$/, ''),
            pages: sp.pages || [],
            independent: !!sp.independent,
            name: sp.name || undefined
        }));
    } catch (e) {
        logger.warn('[rsmax] Failed to parse app.json subPackages:', e.message);
        return [];
    }
}

/**
 * Determine if a given file path (relative to srcDir) resides inside any subPackage root.
 * Returns the matching subPackage descriptor, or null for main-package files.
 */
function findSubPackageForFile(relativePath, subPackages) {
    if (!subPackages || subPackages.length === 0) return null;
    const normalized = relativePath.replace(/\\/g, '/');
    for (const sp of subPackages) {
        const rootWithSep = sp.root + '/';
        if (normalized === sp.root || normalized.startsWith(rootWithSep)) {
            return sp;
        }
    }
    return null;
}

/**
 * Get the effective "runtime root" for require-path calculation and runtime-copy target.
 * - For main-package files: targetRoot (dist/)
 * - For regular sub-packages: targetRoot (dist/) — they share runtime with main package
 * - For independent sub-packages: targetRoot/<sp.root> — they have their own runtime copy
 */
function getEffectiveTargetRoot(targetDir, targetRoot, subPackage) {
    if (subPackage && subPackage.independent) {
        return path.join(targetRoot, subPackage.root);
    }
    return targetRoot;
}

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
    if (result && typeof result === 'object' && 'wxml' in result) {
        return result;
    }
    return {wxml: result, components: new Set()};
}

/**
 * Collect WXS imports from AST: import m from './tools.wxs'
 * Returns array of { module: localName, src: importPath }
 */
function collectWxsImports(ast) {
    const wxsImports = [];
    traverse(ast, {
        ImportDeclaration(path) {
            const source = path.node.source.value;
            if (source.endsWith(WXS_EXT)) {
                let moduleName = null;
                path.node.specifiers.forEach(spec => {
                    if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
                        moduleName = spec.local.name;
                    }
                });
                // Use filename without extension as default module name if no default import
                if (!moduleName) {
                    const basename = path.basename(source, WXS_EXT);
                    moduleName = basename.replace(/[^a-zA-Z0-9_]/g, '_');
                }
                wxsImports.push({module: moduleName, src: source});
            }
        },
        VariableDeclaration(path) {
            // Handle: const m = require('./tools.wxs')
            if (path.node.declarations.length === 1) {
                const decl = path.node.declarations[0];
                if (t.isCallExpression(decl.init) &&
                    t.isIdentifier(decl.init.callee, {name: 'require'}) &&
                    decl.init.arguments.length === 1 &&
                    t.isStringLiteral(decl.init.arguments[0])) {
                    const src = decl.init.arguments[0].value;
                    if (src.endsWith(WXS_EXT)) {
                        let moduleName = null;
                        if (t.isIdentifier(decl.id)) {
                            moduleName = decl.id.name;
                        } else {
                            const basename = path.basename(src, WXS_EXT);
                            moduleName = basename.replace(/[^a-zA-Z0-9_]/g, '_');
                        }
                        wxsImports.push({module: moduleName, src});
                    }
                }
            }
        }
    });
    return wxsImports;
}

/**
 * Inject wxs tags at the beginning of WXML content.
 */
function prependWxsTags(wxmlContent, wxsImports) {
    if (wxsImports.length === 0) return wxmlContent;
    const tags = wxsImports.map(imp => `<wxs module="${imp.module}" src="${imp.src}" />`).join('\n');
    return tags + '\n' + wxmlContent;
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

/**
 * Find the project's public directory for static assets.
 * Priority: <projectRoot>/public (conventional, same level as src/),
 *           then <srcDir>/public (public inside source directory).
 * Returns the absolute path to the public dir, or null if not found.
 */
function findPublicDir(projectRoot, srcDir) {
    const candidates = [
        path.join(projectRoot, 'public'),
        path.join(srcDir, 'public'),
    ];
    for (const dir of candidates) {
        if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
            return dir;
        }
    }
    return null;
}

/**
 * Copy @rsmax/i18n runtime to targetRoot, copy locale JS files from project,
 * and generate rsmax-i18n-locales.js that registers all locale messages.
 * Returns the list of locale codes discovered (e.g. ['en', 'zh-CN']).
 *
 * @param targetRoot - root directory where rsmax-i18n.js should be placed
 * @param projectRoot - project root (parent of srcDir) for finding locales/
 * @param srcDir - source directory, used as fallback for locales lookup
 * @param localesState - per-build state object with a `copiedRoots` Set to avoid
 *                       redundant regeneration across files in the same build
 */
async function ensureI18nCopied(targetRoot, projectRoot, srcDir, localesState) {
    const i18nTarget = path.join(targetRoot, 'rsmax-i18n.js');
    if (!fs.existsSync(i18nTarget)) {
        fs.copySync(I18N_SOURCE, i18nTarget);
    }

    // Track which target roots have already had locales generated in this build
    // to avoid redundant file copies when multiple pages in the same root use i18n
    if (localesState) {
        if (!localesState.copiedRoots) {
            localesState.copiedRoots = new Set();
        }
        if (localesState.copiedRoots.has(targetRoot)) {
            return [];
        }
        localesState.copiedRoots.add(targetRoot);
    }

    const localesDir = findLocalesDir(projectRoot, srcDir);
    let locales = [];
    if (localesDir) {
        // Always regenerate the locales module (locale files may have been added/changed)
        locales = await copyLocalesAndGenerate(localesDir, targetRoot);
    } else {
        // No locales dir found — generate an empty locales module so require() doesn't fail
        const localesModule = path.join(targetRoot, 'rsmax-i18n-locales.js');
        if (!fs.existsSync(localesModule)) {
            fs.writeFileSync(localesModule, 'module.exports = {};\n');
        }
    }

    return locales;
}

async function copyLocalesAndGenerate(localesDir, targetRoot) {
    const targetLocalesDir = path.join(targetRoot, 'locales');
    fs.ensureDirSync(targetLocalesDir);

    // Clean stale locale files from target before copying (handles deletions in watch mode)
    const staleEntries = fs.readdirSync(targetLocalesDir);
    const sourceEntries = fs.readdirSync(localesDir);
    const sourceFiles = new Set(sourceEntries.filter(e => {
        const fullPath = path.join(localesDir, e);
        return fs.existsSync(fullPath) && fs.statSync(fullPath).isFile() && e.endsWith('.js');
    }));
    for (const entry of staleEntries) {
        if (!sourceFiles.has(entry)) {
            fs.removeSync(path.join(targetLocalesDir, entry));
        }
    }

    // Find all .js locale files in the locales directory (flat, e.g. en.js, zh-CN.js)
    const localeCodes = [];
    const entries_js = [];

    for (const entry of sourceEntries) {
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

function getFileType(filePath, srcDir, subPackages) {
    const basename = path.basename(filePath);
    if (basename === 'app.js' || basename === 'app.jsx') {
        return 'app';
    }
    // Determine relative path from srcDir to identify components directories
    // regardless of whether the file is in the main package or a sub-package
    let relativeToSrc = filePath;
    if (srcDir && filePath.startsWith(srcDir)) {
        relativeToSrc = path.relative(srcDir, filePath);
    }
    const normalizedPath = relativeToSrc.replace(/\\/g, '/');
    // Match both top-level and sub-package components/ directories
    if (/\/components\//.test('/' + normalizedPath) || normalizedPath.startsWith('components/')) {
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
 * Accepts an already-resolved publicDir path (from findPublicDir).
 */
async function copyPublicDir(publicDir, targetDir) {
    if (!publicDir || !await fs.pathExists(publicDir)) {
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
            const resolvedCached = path.resolve(cached.targetWxssPath);
            const resolvedTarget = path.resolve(targetWxssPath);
            if (resolvedCached !== resolvedTarget) {
                await fs.copy(resolvedCached, resolvedTarget);
            } else if (!await fs.pathExists(resolvedTarget)) {
                // Upstream (JS/JSX handler) may have removed the file via fs.remove()
                // before calling this function. Re-create it from source.
                if (ext === '.wxss') {
                    await fs.copy(stylePath, resolvedTarget);
                } else {
                    const {css} = await compileStyleFile(stylePath);
                    await fs.writeFile(resolvedTarget, css, 'utf-8');
                }
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
    const {targetRoot, projectRoot, srcDir, subPackages} = options;
    const compiledCache = options.compiledCache || new Map();

    // Determine if this file belongs to a sub-package, and compute the effective runtime root
    let subPackage = null;
    if (srcDir && subPackages && subPackages.length > 0) {
        const relPath = path.relative(srcDir, sourcePath);
        subPackage = findSubPackageForFile(relPath, subPackages);
    }
    const effectiveRoot = getEffectiveTargetRoot(targetDir, targetRoot, subPackage);

    await fs.ensureDir(targetDir);

    if (ext === '.jsx' || ext === '.js') {
        const {ast, code} = await parseFile(sourcePath);
        const fileType = getFileType(sourcePath, srcDir, subPackages);
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

            if (needsRuntimeInFile && effectiveRoot) {
                await ensureRuntimeCopied(effectiveRoot);
            }
            if (effectiveRoot && (needsStoreCoreInFile || needsStoreMwInFile)) {
                await ensureStoreCopied(effectiveRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile && effectiveRoot) {
                await ensureI18nCopied(effectiveRoot, projectRoot, srcDir, options.localesState);
            }

            // Collect WXS imports (import m from './tools.wxs')
            const wxsImports = collectWxsImports(ast);

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
                const finalWxml = prependWxsTags(wxml, wxsImports);
                const wxmlPath = path.join(targetDir, basename + '.wxml');
                await fs.writeFile(wxmlPath, finalWxml, 'utf-8');
            }

            const paths = {};
            if (needsRuntimeInFile && effectiveRoot) {
                paths.runtimePath = calculateRuntimePath(targetDir, effectiveRoot);
            }
            if (needsStoreCoreInFile && effectiveRoot) {
                paths.storePath = calculateStorePath(targetDir, effectiveRoot);
            }
            if (needsStoreMwInFile && effectiveRoot) {
                paths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetDir, effectiveRoot);
            }
            if (needsI18nInFile && effectiveRoot) {
                paths.i18nPath = calculateI18nPath(targetDir, effectiveRoot);
            }

            const jsCode = transformJsCode(ast, code, fileType, paths);
            const jsTargetPath = path.join(targetDir, basename + '.js');
            await fs.writeFile(jsTargetPath, jsCode, 'utf-8');
        } else if (hasEsModuleSyntax(ast)) {
            // Plain ES module (e.g. store definitions) - convert to CommonJS
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (effectiveRoot && (needsStoreCoreInFile || needsStoreMwInFile)) {
                await ensureStoreCopied(effectiveRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile && effectiveRoot) {
                await ensureI18nCopied(effectiveRoot, projectRoot, srcDir, options.localesState);
            }
            const modulePaths = {};
            if (needsStoreCoreInFile && effectiveRoot) {
                modulePaths.storePath = calculateStorePath(targetDir, effectiveRoot);
            }
            if (needsStoreMwInFile && effectiveRoot) {
                modulePaths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetDir, effectiveRoot);
            }
            if (needsI18nInFile && effectiveRoot) {
                modulePaths.i18nPath = calculateI18nPath(targetDir, effectiveRoot);
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
        // Remove old wxss first to ensure clean rebuild (no stale inlined module CSS)
        await fs.remove(wxssTarget);
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
        const targetWxssPath = path.join(targetDir, basename + '.wxss');
        if (compiledCache && compiledCache.has(sourcePath)) {
            // Already compiled (e.g. by findAndCompileStyle from JS handler).
            // Ensure target exists — it may have been removed/recreated since caching.
            if (!await fs.pathExists(targetWxssPath)) {
                await fs.ensureDir(path.dirname(targetWxssPath));
                const {css} = await compileStyleFile(sourcePath);
                await fs.writeFile(targetWxssPath, css, 'utf-8');
            }
            return;
        }
        await fs.ensureDir(path.dirname(targetWxssPath));
        const {css} = await compileStyleFile(sourcePath);
        await fs.writeFile(targetWxssPath, css, 'utf-8');
        if (compiledCache) compiledCache.set(sourcePath, {targetWxssPath, classNames: null});
    } else if (ext === '.wxss') {
        if (compiledCache && compiledCache.has(sourcePath)) {
            if (!await fs.pathExists(targetPath)) {
                await fs.copy(sourcePath, targetPath);
            }
            return;
        }
        await fs.copy(sourcePath, targetPath);
        if (compiledCache) compiledCache.set(sourcePath, {targetWxssPath: targetPath, classNames: null});
    } else if (ext === WXS_EXT) {
        // Copy .wxs files directly to target
        await fs.copy(sourcePath, targetPath);
    } else if (ext === '.json') {
        // Skip standalone .json copy if a same-named .js/.jsx exists next to it.
        // The JS/JSX handler (line ~887) already reads this .json, merges usingComponents,
        // and writes the final version to target. Copying again here would overwrite
        // the merged result if file traversal order puts .jsx/.js before .json.
        const baseDir = path.dirname(sourcePath);
        const baseName = path.basename(sourcePath, '.json');
        const pairedJs = path.join(baseDir, baseName + '.js');
        const pairedJsx = path.join(baseDir, baseName + '.jsx');
        if (await fs.pathExists(pairedJs) || await fs.pathExists(pairedJsx)) {
            // Already handled by the JS/JSX branch; skip to avoid overwriting merged config.
            return;
        }
        await fs.copy(sourcePath, targetPath);
    } else if (ext === '.wxml' || IMAGE_EXTS.includes(ext)) {
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

/**
 * Ensure that independent sub-packages have their own copy of runtime files
 * (rsmax-runtime.js, rsmax-store.js, rsmax-i18n.js) in their root directory,
 * because independent sub-packages cannot depend on the main package.
 */
async function ensureIndependentSubPackageRuntimes(targetRoot, subPackages, projectRoot, srcDir) {
    for (const sp of subPackages) {
        if (!sp.independent) continue;
        const spRoot = path.join(targetRoot, sp.root);
        await fs.ensureDir(spRoot);
        // Always copy runtime files to independent sub-package roots
        await ensureRuntimeCopied(spRoot);
        // Copy store/i18n only if there are files in the sub-package that need them.
        // Since we can't know before scanning, we copy them proactively when the
        // sub-package directory exists in source — but to keep it simple and safe,
        // we do a quick scan for imports before copying; if found in any file of
        // the sub-package, ensure the file is present. The compileFile step will
        // also call ensureStoreCopied/ensureI18nCopied with effectiveRoot as needed,
        // so this pre-copy is just a safety net.
        // (The per-file logic already handles this correctly via effectiveRoot.)
    }
}

async function compile(sourceDir, targetDir, options = {}) {
    logger.log(`[rsmax] Compiling ${sourceDir} -> ${targetDir}`);

    // Ensure target directory exists, but do NOT empty it (incremental build).
    // miniprogram_npm and other existing files are preserved across builds.
    // Use `rsmax clean` for a full clean build.
    await fs.ensureDir(targetDir);

    // Resolve project root (parent of sourceDir) and find public directory
    const projectRoot = path.dirname(sourceDir);

    // Copy public directory static assets to target root (overwrites existing files)
    // public/ can be at project root (sibling of src/) or inside src/
    const publicDir = findPublicDir(projectRoot, sourceDir);
    await copyPublicDir(publicDir, targetDir);

    // Load project config and detect installed UI libraries
    // Note: Do NOT copy package.json into targetDir (miniprogramRoot).
    // When using packNpmManually, DevTools uses packNpmRelationList to find package.json;
    // a package.json inside miniprogramRoot without adjacent node_modules can cause issues.
    const projectPkgPath = path.join(projectRoot, 'package.json');
    let projectPkg = {};
    if (await fs.pathExists(projectPkgPath)) {
        projectPkg = await fs.readJson(projectPkgPath);
    }
    const projectConfig = await loadProjectConfig(projectRoot);
    const installedPresets = detectInstalledLibraries(projectPkg);
    const componentResolver = buildResolver(projectConfig, installedPresets);

    // Parse subPackages configuration from app.json
    const subPackages = await parseSubPackages(sourceDir);
    if (subPackages.length > 0) {
        const names = subPackages.map(sp => sp.root + (sp.independent ? ' (independent)' : '')).join(', ');
        logger.log(`[rsmax] Found subPackages: ${names}`);
    }

    // Per-build state to avoid redundant i18n locale regeneration per target root
    const localesState = {copiedRoots: new Set()};

    // Pre-create independent sub-package output directories
    await ensureIndependentSubPackageRuntimes(targetDir, subPackages, projectRoot, sourceDir);

    await compileDir(sourceDir, targetDir, {
        targetRoot: targetDir,
        projectRoot,
        srcDir: sourceDir,
        subPackages,
        componentResolver,
        publicDir,
        localesState
    });

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

    // Parse subPackages for watch mode
    const watchSubPackages = await parseSubPackages(sourceDir);

    // Resolve public directory for watch mode (supports project root or src/)
    const resolvedPublicDir = findPublicDir(projectRoot, sourceDir);

    // Also watch projectRoot/locales if it exists (conventional locale location)
    const projectLocalesDir = path.join(projectRoot, 'locales');

    const ignored = [
        /node_modules/,
        /\.git/,
        filePath => {
            const resolved = path.resolve(filePath);
            return resolved.startsWith(path.resolve(targetDir));
        }
    ];

    // Watch sourceDir, plus project-root public/ and locales/ if they exist outside sourceDir
    const watchPaths = [sourceDir];
    const projectPublicDir = path.join(projectRoot, 'public');
    if (resolvedPublicDir === projectPublicDir && await fs.pathExists(projectPublicDir)) {
        watchPaths.push(projectPublicDir);
    }
    if (await fs.pathExists(projectLocalesDir) && !projectLocalesDir.startsWith(path.resolve(sourceDir) + path.sep)) {
        watchPaths.push(projectLocalesDir);
    }

    const watcher = chokidar.watch(watchPaths, {
        ignored,
        persistent: true,
        ignoreInitial: true
    });

    // Track style -> JS file dependencies for hot reload of CSS Modules
    // Key: absolute resolved style file path, Value: Set of absolute JS/JSX file paths that import it
    const styleDependents = new Map();

    function registerStyleDependency(stylePath, jsFilePath) {
        const resolvedStyle = path.resolve(stylePath);
        if (!styleDependents.has(resolvedStyle)) {
            styleDependents.set(resolvedStyle, new Set());
        }
        styleDependents.get(resolvedStyle).add(path.resolve(jsFilePath));
    }

    function removeStyleDependenciesFor(jsFilePath) {
        const resolvedJs = path.resolve(jsFilePath);
        for (const [stylePath, dependents] of styleDependents) {
            dependents.delete(resolvedJs);
            if (dependents.size === 0) {
                styleDependents.delete(stylePath);
            }
        }
    }

    function scanJsForStyleDeps(jsFilePath) {
        const resolvedJs = path.resolve(jsFilePath);
        if (!fs.existsSync(jsFilePath)) return;
        try {
            const code = fs.readFileSync(jsFilePath, 'utf-8');
            const ast = parser.parse(code, {
                sourceType: 'module',
                plugins: ['jsx', 'classProperties']
            });
            const sourceJsDir = path.dirname(jsFilePath);
            const {moduleStyles, plainStyles} = collectStyleImports(ast, sourceJsDir);
            for (const s of moduleStyles) {
                registerStyleDependency(s.resolvedPath, resolvedJs);
            }
            for (const s of plainStyles) {
                registerStyleDependency(s.resolvedPath, resolvedJs);
            }
        } catch (e) {
            // Ignore parse errors during dependency scan
        }
    }

    function scanDirForStyleDeps(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, {withFileTypes: true});
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
                scanDirForStyleDeps(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name);
                if (ext === '.js' || ext === '.jsx') {
                    scanJsForStyleDeps(fullPath);
                }
            }
        }
    }

    // Build initial dependency map after the first compile
    scanDirForStyleDeps(sourceDir);

    async function handleJsFileEvent(filePath, targetPath) {
        const ext = path.extname(filePath);
        const {ast, code} = await parseFile(filePath);
        const basename = path.basename(filePath, ext);
        const targetFileDir = path.dirname(targetPath);
        const fileType = getFileType(filePath, sourceDir, watchSubPackages);
        const sourceJsDir = path.dirname(filePath);
        const compiledCache = new Map();

        // Determine sub-package context for this file
        let subPackage = null;
        const relPath = path.relative(sourceDir, filePath);
        subPackage = findSubPackageForFile(relPath, watchSubPackages);
        const effectiveRoot = getEffectiveTargetRoot(targetFileDir, targetDir, subPackage);

        const shouldTransform = ext === '.jsx' || needsTransform(ast);
        let customComponents = new Set();
        let wxssImports = [];
        let moduleInlineCss = [];
        let importSources = new Set();

        if (shouldTransform) {
            const needsRuntimeInFile = usesRuntime(ast);
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (needsRuntimeInFile) {
                await ensureRuntimeCopied(effectiveRoot);
            }
            if (needsStoreCoreInFile || needsStoreMwInFile) {
                await ensureStoreCopied(effectiveRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile) {
                // Fresh state per event (watch mode processes one file at a time)
                await ensureI18nCopied(effectiveRoot, projectRoot, sourceDir, null);
            }

            // Collect WXS imports (import m from './tools.wxs')
            const wxsImports = collectWxsImports(ast);

            const {moduleStyles, plainStyles, importSources: impSrcs} = collectStyleImports(ast, sourceJsDir);
            importSources = impSrcs;
            let moduleStylesMappings = [];

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
                const finalWxml = prependWxsTags(wxml, wxsImports);
                const wxmlPath = path.join(targetFileDir, basename + '.wxml');
                await fs.writeFile(wxmlPath, finalWxml, 'utf-8');
            }

            const paths = {};
            if (needsRuntimeInFile) {
                paths.runtimePath = calculateRuntimePath(targetFileDir, effectiveRoot);
            }
            if (needsStoreCoreInFile) {
                paths.storePath = calculateStorePath(targetFileDir, effectiveRoot);
            }
            if (needsStoreMwInFile) {
                paths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetFileDir, effectiveRoot);
            }
            if (needsI18nInFile) {
                paths.i18nPath = calculateI18nPath(targetFileDir, effectiveRoot);
            }

            const jsCode = transformJsCode(ast, code, fileType, paths);
            await fs.writeFile(path.join(targetFileDir, basename + '.js'), jsCode, 'utf-8');
        } else if (hasEsModuleSyntax(ast)) {
            // Plain ES module (e.g. store definitions) - convert to CommonJS
            const needsStoreCoreInFile = usesStore(ast);
            const needsStoreMwInFile = usesStoreMiddleware(ast);
            const needsI18nInFile = usesI18n(ast);
            if (needsStoreCoreInFile || needsStoreMwInFile) {
                await ensureStoreCopied(effectiveRoot, {core: needsStoreCoreInFile, middleware: needsStoreMwInFile});
            }
            if (needsI18nInFile) {
                await ensureI18nCopied(effectiveRoot, projectRoot, sourceDir, null);
            }
            const modulePaths = {};
            if (needsStoreCoreInFile) {
                modulePaths.storePath = calculateStorePath(targetFileDir, effectiveRoot);
            }
            if (needsStoreMwInFile) {
                modulePaths.storeMiddlewarePath = calculateStoreMiddlewarePath(targetFileDir, effectiveRoot);
            }
            if (needsI18nInFile) {
                modulePaths.i18nPath = calculateI18nPath(targetFileDir, effectiveRoot);
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

        // Compile same-named style file and merge with imported/inlined styles
        // (applies to ALL JS files, not just shouldTransform ones)
        const wxssTarget = path.join(targetFileDir, basename + '.wxss');
        await fs.remove(wxssTarget);
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
        if (wxssContent || wxssImports.length > 0 || moduleInlineCss.length > 0) {
            await fs.writeFile(wxssTarget, wxssContent, 'utf-8');
        }

        // Update style dependency map for this JS file
        if (shouldTransform) {
            removeStyleDependenciesFor(filePath);
            const freshCode = await fs.readFile(filePath, 'utf-8');
            const freshAst = parser.parse(freshCode, {
                sourceType: 'module',
                plugins: ['jsx', 'classProperties']
            });
            const {moduleStyles: ms, plainStyles: ps} = collectStyleImports(freshAst, path.dirname(filePath));
            for (const s of ms) registerStyleDependency(s.resolvedPath, filePath);
            for (const s of ps) registerStyleDependency(s.resolvedPath, filePath);
        }
    }

    async function handleStyleFileEvent(filePath, targetPath) {
        const ext = path.extname(filePath);
        const isModule = isModuleFile(filePath);

        // For CSS Module files (.module.less/.module.css/.module.scss/.module.sass),
        // do NOT generate a standalone .wxss file. Instead, find all JS/JSX files
        // that import this module and trigger their recompilation so that the
        // inlined CSS and scoped class-name mappings are regenerated.
        if (isModule) {
            const resolvedStyle = path.resolve(filePath);
            const dependents = styleDependents.get(resolvedStyle);
            if (dependents && dependents.size > 0) {
                for (const jsFile of dependents) {
                    const jsExt = path.extname(jsFile);
                    const jsRelative = path.relative(sourceDir, jsFile);
                    const jsTarget = path.join(targetDir, jsRelative);
                    try {
                        await handleJsFileEvent(jsFile, jsTarget);
                        logger.log(`[rsmax] Changed: ${jsRelative} (style dep: ${path.basename(filePath)})`);
                    } catch (err) {
                        logger.error(`[rsmax] Error recompiling dependent ${jsRelative}:`, err.message);
                    }
                }
            }
            return;
        }

        // Non-module style files (.less/.scss/.sass/.css, not *.module.*): compile to standalone .wxss
        if (ext === '.wxss') {
            await fs.copy(filePath, targetPath);
        } else {
            const basename = path.basename(filePath, ext);
            const targetFileDir = path.dirname(targetPath);
            const targetWxssPath = path.join(targetFileDir, basename + '.wxss');
            await fs.ensureDir(path.dirname(targetWxssPath));
            const {css} = await compileStyleFile(filePath);
            await fs.writeFile(targetWxssPath, css, 'utf-8');
        }
    }

    /**
     * Check if a file is inside the public directory and get its mapped target path.
     * Files in public/ map directly to dist root:
     *   public/icon.png → dist/icon.png
     *   public/images/logo.png → dist/images/logo.png
     * Supports public/ at project root (sibling of src/) or inside src/.
     * Returns null for the public directory itself (to avoid accidentally deleting dist root).
     */
    function getPublicTargetPath(filePath) {
        const normalizedFile = path.resolve(filePath);
        // Check both possible public directory locations
        const publicCandidates = [
            path.resolve(projectRoot, 'public'),
            path.resolve(sourceDir, 'public'),
        ];
        for (const publicDir of publicCandidates) {
            // Don't map the public directory itself - that would point to dist root
            if (normalizedFile === publicDir) {
                return {isPublicRoot: true};
            }
            if (normalizedFile.startsWith(publicDir + path.sep)) {
                const relativeToPublic = path.relative(publicDir, normalizedFile);
                return {targetPath: path.join(targetDir, relativeToPublic)};
            }
        }
        return null;
    }

    function getDisplayRelPath(filePath) {
        // For files inside sourceDir, show relative-to-src path;
        // otherwise show relative-to-projectRoot path (e.g. public/foo.png)
        const resolved = path.resolve(filePath);
        const srcResolved = path.resolve(sourceDir);
        if (resolved.startsWith(srcResolved + path.sep)) {
            return path.relative(sourceDir, filePath);
        }
        return path.relative(projectRoot, filePath);
    }

    /**
     * Regenerate i18n locales (copy locale files + regenerate rsmax-i18n-locales.js)
     * for all relevant roots: main target root and all independent subpackage roots.
     * Called when a locale file changes in watch mode.
     */
    async function regenerateAllI18n() {
        const roots = [targetDir];
        for (const sp of watchSubPackages) {
            if (sp.independent) {
                roots.push(path.join(targetDir, sp.root));
            }
        }
        for (const root of roots) {
            // Only regenerate if rsmax-i18n.js exists in this root (i18n is actually used)
            if (fs.existsSync(path.join(root, 'rsmax-i18n.js'))) {
                await ensureI18nCopied(root, projectRoot, sourceDir, null);
            }
        }
    }

    /**
     * Check if a file path is inside the locales directory (either projectRoot/locales
     * or sourceDir/locales). Returns the matched locales dir or null.
     */
    function getLocalesDirForFile(filePath) {
        const resolved = path.resolve(filePath);
        const candidates = [
            path.resolve(projectRoot, 'locales'),
            path.resolve(sourceDir, 'locales'),
        ];
        for (const dir of candidates) {
            if (resolved === dir || resolved.startsWith(dir + path.sep)) {
                return dir;
            }
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
                logger.log(`[rsmax] ${event}: ${getDisplayRelPath(filePath)} (public asset)`);
            } catch (err) {
                logger.error(`[rsmax] Error ${event.toLowerCase()} ${getDisplayRelPath(filePath)}:`, err.message);
            }
            return;
        }

        // Handle locale file changes (projectRoot/locales or src/locales)
        const localesDir = getLocalesDirForFile(filePath);
        if (localesDir) {
            try {
                await regenerateAllI18n();
                logger.log(`[rsmax] ${event}: ${getDisplayRelPath(filePath)} (locale file - regenerated i18n)`);
            } catch (err) {
                logger.error(`[rsmax] Error regenerating i18n for ${getDisplayRelPath(filePath)}:`, err.message);
            }
            return;
        }

        // Ignore file events from outside sourceDir (e.g. files in projectRoot that aren't public/ or locales/)
        const resolvedFile = path.resolve(filePath);
        if (!resolvedFile.startsWith(path.resolve(sourceDir) + path.sep)) {
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
            } else if (ext === WXS_EXT) {
                await fs.copy(filePath, targetPath);
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
                    logger.log(`[rsmax] Removed: ${getDisplayRelPath(filePath)} (public asset)`);
                } catch (err) {
                    logger.error(`[rsmax] Error removing ${getDisplayRelPath(filePath)}:`, err.message);
                }
            }
            // If publicInfo.isPublicRoot, do nothing (don't delete dist)
            return;
        }

        // Handle locale file deletion
        if (getLocalesDirForFile(filePath)) {
            try {
                await regenerateAllI18n();
                logger.log(`[rsmax] Removed: ${getDisplayRelPath(filePath)} (locale file - regenerated i18n)`);
            } catch (err) {
                logger.error(`[rsmax] Error regenerating i18n for removed ${getDisplayRelPath(filePath)}:`, err.message);
            }
            return;
        }

        // Ignore unlink events from outside sourceDir
        const resolvedFile = path.resolve(filePath);
        if (!resolvedFile.startsWith(path.resolve(sourceDir) + path.sep)) {
            return;
        }

        const relativePath = path.relative(sourceDir, filePath);
        const ext = path.extname(filePath);
        const basename = path.basename(filePath, ext);

        try {
            if (ext === '.js' || ext === '.jsx') {
                // JS file removed: clean up style dependency entries
                removeStyleDependenciesFor(filePath);
                const targetPath = path.join(targetDir, relativePath);
                await fs.remove(targetPath);
            } else if (STYLE_EXTS.includes(ext)) {
                const isModule = isModuleFile(filePath);
                if (isModule) {
                    // Module style removed: trigger recompilation of dependent JS files
                    // so the inlined CSS is removed, then clean up dependency map
                    const dependents = styleDependents.get(path.resolve(filePath));
                    if (dependents && dependents.size > 0) {
                        for (const jsFile of [...dependents]) {
                            const jsRelative = path.relative(sourceDir, jsFile);
                            const jsTarget = path.join(targetDir, jsRelative);
                            try {
                                await handleJsFileEvent(jsFile, jsTarget);
                                logger.log(`[rsmax] Changed: ${jsRelative} (style dep removed: ${path.basename(filePath)})`);
                            } catch (err) {
                                logger.error(`[rsmax] Error recompiling dependent ${jsRelative}:`, err.message);
                            }
                        }
                    }
                    styleDependents.delete(path.resolve(filePath));
                } else if (ext !== '.wxss') {
                    const targetWxssPath = path.join(targetDir, path.dirname(relativePath), basename + '.wxss');
                    const sourceBasePath = filePath.replace(ext, '');

                    let hasOtherStyle = false;
                    for (const otherExt of STYLE_EXTS) {
                        if (otherExt !== ext && await fs.pathExists(sourceBasePath + otherExt) && !isModuleFile(sourceBasePath + otherExt)) {
                            hasOtherStyle = true;
                            await handleFileEvent('Changed', sourceBasePath + otherExt);
                            break;
                        }
                    }

                    if (!hasOtherStyle) {
                        await fs.remove(targetWxssPath);
                    }
                } else {
                    // .wxss removed
                    const targetPath = path.join(targetDir, relativePath);
                    await fs.remove(targetPath);
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
                    logger.log(`[rsmax] Removed directory: ${getDisplayRelPath(dirPath)} (public asset)`);
                } catch (err) {
                    logger.error(`[rsmax] Error removing directory ${getDisplayRelPath(dirPath)}:`, err.message);
                }
            }
            // If publicInfo.isPublicRoot (the public/ dir itself), trigger a full rebuild is safest
            if (publicInfo.isPublicRoot) {
                logger.log('[rsmax] public/ directory removed, triggering full rebuild...');
                await compile(sourceDir, targetDir);
            }
            return;
        }
        // Ignore directory events from outside sourceDir
        const resolvedDir = path.resolve(dirPath);
        if (!resolvedDir.startsWith(path.resolve(sourceDir) + path.sep)) {
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
    parseSubPackages,
    findSubPackageForFile,
    getEffectiveTargetRoot,
    compileStyle,
    compileStyleFile,
    collectStyleImports,
    injectModuleStylesConst,
    processStyle,
    isModuleFile,
    isStyleFile,
    RUNTIME_SOURCE
};
