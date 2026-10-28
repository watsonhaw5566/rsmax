const fs = require('fs-extra');
const path = require('node:path');
const {logger} = require('rslog');
const babel = require('@babel/core');
const t = require('@babel/types');

/**
 * 内置的「构建 npm」实现，直接生成微信小程序运行时可识别的 miniprogram_npm 产物，
 * 无需依赖 miniprogram-ci（避免其 ~20MB 体积与传递依赖问题）。
 *
 * 设计与 miniprogram-ci 的 packNpmManually 行为对齐：
 *  1. 从 projectRoot/package.json 的 dependencies 出发，按 Node 解析规则
 *     （node_modules 向上查找 + symlink realpath）收集运行时可达的依赖包；
 *  2. 小程序组件包（含 miniprogram 字段或 miniprogram_dist 目录）整目录拷贝；
 *  3. 普通 JS 包通过内置模块运行时打包为单文件 index.js，ESM 语法在打包阶段
 *     就地改写为 CJS，跨包 require 走原生 require（由微信解析 miniprogram_npm）。
 */

const PARSER_PLUGINS = [
  'classProperties', 'classPrivateProperties', 'classPrivateMethods',
  'objectRestSpread', 'optionalChaining', 'nullishCoalescingOperator',
  'asyncGenerators', 'dynamicImport', 'exportDefaultFrom',
  'numericSeparator', 'logicalAssignment',
];

// ---------------------------------------------------------------------------
// 极简 glob 匹配（支持 **、*、?），仅用于 ignores 过滤，不引入 minimatch 依赖
// ---------------------------------------------------------------------------
function globToRegex(pattern) {
  let re = '';
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === '*') {
      if (pattern[i + 1] === '*') { re += '.*'; i++; }
      else re += '[^/]*';
    } else if (c === '?') {
      re += '.';
    } else if ('.+^${}()|[]\\'.includes(c)) {
      re += '\\' + c;
    } else {
      re += c;
    }
  }
  return new RegExp('^' + re + '$');
}

function matchAnyPattern(patterns, relPath) {
  if (!patterns || patterns.length === 0) return false;
  const norm = relPath.split(path.sep).join('/');
  for (const p of patterns) {
    if (globToRegex(p).test(norm)) return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// ESM -> CJS 就地改写插件
// 仅处理 import / export 语法；其余语法保持原样输出（与微信开发者工具一致，
// 不做 ES 降级，语法兼容性由目标基础库决定）。
// ---------------------------------------------------------------------------
const esmToCjsPlugin = function () {
  return {
    name: 'rsmax-npm-esm-to-cjs',
    visitor: {
      Program: {
        enter(path, state) {
          state.hasExport = false;
        },
        exit(path, state) {
          if (state.hasExport) {
            path.unshiftContainer('body', t.expressionStatement(
              t.assignmentExpression(
                '=',
                t.memberExpression(t.identifier('exports'), t.identifier('__esModule')),
                t.booleanLiteral(true)
              )
            ));
          }
        },
      },

      CallExpression(path, state) {
        const node = path.node;
        if (t.isIdentifier(node.callee, {name: 'require'}) &&
            node.arguments.length === 1 &&
            t.isStringLiteral(node.arguments[0])) {
          state.opts.requires.push(node.arguments[0].value);
        }
      },

      ImportDeclaration(path) {
        const source = path.node.source;
        const specs = path.node.specifiers;
        const srcLit = source;
        const stmts = [];
        if (!specs || specs.length === 0) {
          // import 'side-effect'
          stmts.push(t.expressionStatement(t.callExpression(t.identifier('require'), [srcLit])));
        } else {
          for (const spec of specs) {
            if (t.isImportDefaultSpecifier(spec)) {
              stmts.push(t.variableDeclaration('var', [
                t.variableDeclarator(
                  spec.local,
                  t.callExpression(t.identifier('__REQUIRE_DEFAULT__'), [
                    t.callExpression(t.identifier('require'), [srcLit]),
                  ])
                ),
              ]));
            } else if (t.isImportNamespaceSpecifier(spec)) {
              stmts.push(t.variableDeclaration('var', [
                t.variableDeclarator(
                  spec.local,
                  t.callExpression(t.identifier('__REQUIRE_WILDCARD__'), [
                    t.callExpression(t.identifier('require'), [srcLit]),
                  ])
                ),
              ]));
            } else if (t.isImportSpecifier(spec)) {
              const imported = spec.imported;
              const key = t.isIdentifier(imported) ? imported.name : imported.value;
              stmts.push(t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.objectPattern([t.objectProperty(
                    t.isValidIdentifier(key) ? t.identifier(key) : t.stringLiteral(key),
                    spec.local,
                    false,
                    t.isValidIdentifier(key) && key === spec.local.name
                  )]),
                  t.callExpression(t.identifier('require'), [srcLit])
                ),
              ]));
            }
          }
        }
        if (stmts.length === 1) path.replaceWith(stmts[0]);
        else path.replaceWithMultiple(stmts);
      },

      ExportDefaultDeclaration(path, state) {
        state.hasExport = true;
        const decl = path.node.declaration;
        if (t.isFunctionDeclaration(decl) || t.isClassDeclaration(decl)) {
          if (decl.id) {
            const name = decl.id.name;
            path.replaceWithMultiple([
              decl,
              t.expressionStatement(t.assignmentExpression(
                '=',
                t.memberExpression(t.identifier('exports'), t.identifier('default')),
                t.identifier(name)
              )),
            ]);
          } else {
            const expr = t.isFunctionDeclaration(decl)
              ? t.functionExpression(null, decl.params, decl.body, decl.generator, decl.async)
              : t.classExpression(null, decl.superClass, decl.body);
            path.replaceWith(t.expressionStatement(t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('exports'), t.identifier('default')),
              expr
            )));
          }
        } else {
          path.replaceWith(t.expressionStatement(t.assignmentExpression(
            '=',
            t.memberExpression(t.identifier('exports'), t.identifier('default')),
            decl
          )));
        }
      },

      ExportNamedDeclaration(path, state) {
        state.hasExport = true;
        const decl = path.node.declaration;
        const specifiers = path.node.specifiers;
        const source = path.node.source;
        if (decl) {
          const stmts = [decl];
          if (t.isVariableDeclaration(decl)) {
            for (const d of decl.declarations) {
              if (t.isIdentifier(d.id)) {
                stmts.push(t.expressionStatement(t.assignmentExpression(
                  '=',
                  t.memberExpression(t.identifier('exports'), t.identifier(d.id.name)),
                  t.identifier(d.id.name)
                )));
              }
            }
          } else if ((t.isFunctionDeclaration(decl) || t.isClassDeclaration(decl)) && decl.id) {
            stmts.push(t.expressionStatement(t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('exports'), t.identifier(decl.id.name)),
              t.identifier(decl.id.name)
            )));
          }
          path.replaceWithMultiple(stmts);
        } else if (source) {
          // export { x } from 'src'
          const tmp = path.scope.generateUidIdentifier('__rsmaxT');
          const stmts = [t.variableDeclaration('var', [
            t.variableDeclarator(tmp, t.callExpression(t.identifier('require'), [source])),
          ])];
          for (const spec of specifiers) {
            if (!t.isExportSpecifier(spec)) continue;
            const local = t.isIdentifier(spec.local) ? spec.local.name : spec.local.value;
            const exported = t.isIdentifier(spec.exported) ? spec.exported.name : spec.exported.value;
            stmts.push(t.expressionStatement(t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('exports'),
                t.isValidIdentifier(exported) ? t.identifier(exported) : t.stringLiteral(exported),
                !t.isValidIdentifier(exported)),
              t.memberExpression(tmp,
                t.isValidIdentifier(local) ? t.identifier(local) : t.stringLiteral(local),
                !t.isValidIdentifier(local))
            )));
          }
          path.replaceWithMultiple(stmts);
        } else {
          // export { x } (local)
          const stmts = [];
          for (const spec of specifiers) {
            if (!t.isExportSpecifier(spec)) continue;
            const local = t.isIdentifier(spec.local) ? spec.local.name : spec.local.value;
            const exported = t.isIdentifier(spec.exported) ? spec.exported.name : spec.exported.value;
            stmts.push(t.expressionStatement(t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('exports'),
                t.isValidIdentifier(exported) ? t.identifier(exported) : t.stringLiteral(exported),
                !t.isValidIdentifier(exported)),
              t.identifier(local)
            )));
          }
          path.replaceWithMultiple(stmts);
        }
      },

      ExportAllDeclaration(path, state) {
        state.hasExport = true;
        const source = path.node.source.value;
        const tmp = path.scope.generateUidIdentifier('__rsmaxT');
        const forEachCall = t.callExpression(
          t.memberExpression(
            t.callExpression(t.memberExpression(t.identifier('Object'), t.identifier('keys')), [tmp]),
            t.identifier('forEach')
          ),
          [t.functionExpression(null, [t.identifier('k')], t.blockStatement([
            t.ifStatement(
              t.logicalExpression('||',
                t.binaryExpression('===', t.identifier('k'), t.stringLiteral('default')),
                t.binaryExpression('===', t.identifier('k'), t.stringLiteral('__esModule'))),
              t.returnStatement()
            ),
            t.expressionStatement(t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('exports'), t.identifier('k'), true),
              t.memberExpression(tmp, t.identifier('k'), true)
            )),
          ]))]
        );
        path.replaceWithMultiple([
          t.variableDeclaration('var', [t.variableDeclarator(tmp, t.callExpression(t.identifier('require'), [t.stringLiteral(source)]))]),
          t.expressionStatement(forEachCall),
        ]);
      },
    },
  };
};

function transformModuleCode(code) {
  const requires = [];
  const result = babel.transformSync(code, {
    babelrc: false,
    configFile: false,
    compact: false,
    retainLines: true,
    parserOpts: {sourceType: 'module', plugins: PARSER_PLUGINS},
    plugins: [[esmToCjsPlugin, {requires}]],
  });
  return {code: result.code, requires: [...new Set(requires)]};
}

// ---------------------------------------------------------------------------
// 依赖收集：按 Node 解析规则从 projectRoot 出发 BFS 收集运行时依赖
// ---------------------------------------------------------------------------
function resolveDepDir(fromDir, depName) {
  let cur = fromDir;
  while (true) {
    const candidate = path.join(cur, 'node_modules', depName);
    if (fs.existsSync(candidate)) return candidate;
    const parent = path.dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return null;
}

/**
 * @param {string} projectRoot
 * @param {object} projectPkg
 * @param {string[]} ignores
 * @param {Array<{msg:string}>} warns
 * @returns {Array<{name:string,dir:string,pkgJson:object}>}
 */
function collectPackages(projectRoot, projectPkg, ignores, warns) {
  // projectRoot 与包目录都使用 realpath，避免 macOS /tmp -> /private/tmp
  // 这类软链导致 path.relative 产出跨根路径，进而让 ignores 匹配失效。
  let rootReal;
  try {
    rootReal = fs.realpathSync(projectRoot);
  } catch (e) {
    rootReal = projectRoot;
  }
  const deps = (projectPkg && projectPkg.dependencies) || {};
  const queue = [];
  for (const name of Object.keys(deps)) {
    queue.push({name, from: projectRoot});
  }

  const seenReal = new Set();
  const nameToReal = new Map();
  const packages = [];

  while (queue.length) {
    const {name, from} = queue.shift();
    const found = resolveDepDir(from, name);
    if (!found) {
      warns.push({msg: `dependency "${name}" not found in node_modules`});
      continue;
    }
    let real;
    try {
      real = fs.realpathSync(found);
    } catch (e) {
      warns.push({msg: `cannot resolve realpath of "${name}": ${e.message}`});
      continue;
    }
    if (seenReal.has(real)) continue;

    const pkgJsonRel = path.relative(rootReal, path.join(real, 'package.json'));
    if (matchAnyPattern(ignores, pkgJsonRel)) continue;

    let pkgJson;
    try {
      pkgJson = fs.readJsonSync(path.join(real, 'package.json'));
    } catch (e) {
      warns.push({msg: `failed to read package.json of "${name}": ${e.message}`});
      continue;
    }

    // 同名多版本冲突：首次解析胜出，其余跳过并告警（与微信官方打包行为一致，
    // 不支持嵌套 miniprogram_npm 多版本共存）
    if (nameToReal.has(name)) {
      warns.push({msg: `multiple versions of "${name}" detected, using the first resolved one`});
      seenReal.add(real);
      continue;
    }
    nameToReal.set(name, real);
    seenReal.add(real);
    packages.push({name, dir: real, pkgJson});

    const transitive = (pkgJson.dependencies) || {};
    for (const dn of Object.keys(transitive)) {
      queue.push({name: dn, from: real});
    }
  }
  return packages;
}

// ---------------------------------------------------------------------------
// 小程序组件包：整目录拷贝
// ---------------------------------------------------------------------------
function getComponentDistDir(pkgDir, pkgJson) {
  const sub = (typeof pkgJson.miniprogram === 'string' && pkgJson.miniprogram) || 'miniprogram_dist';
  const dir = path.join(pkgDir, sub);
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory() ? dir : null;
}

async function copyDir(src, dest, ignores, pkgDir) {
  const entries = await fs.readdir(src, {withFileTypes: true});
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules') continue;
      await copyDir(srcPath, path.join(dest, entry.name), ignores, pkgDir);
    } else if (entry.isFile()) {
      const rel = path.relative(pkgDir, srcPath);
      if (matchAnyPattern(ignores, rel)) continue;
      await fs.copy(srcPath, path.join(dest, entry.name));
    }
  }
}

// ---------------------------------------------------------------------------
// JS 包打包为单文件 index.js
// 模块运行时模板改编自 miniprogram-ci（MIT 协议），保持与微信官方产物一致。
// ---------------------------------------------------------------------------
const BUNDLE_RUNTIME = [
  'module.exports = (function() {',
  'var __MODS__ = {};',
  'var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };',
  'var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };',
  'var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };',
  'var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };',
].join('\n');

function resolveWithinPackage(packageDir, fromDir, spec) {
  const candidate = path.resolve(fromDir, spec);
  const tries = [
    candidate,
    candidate + '.js',
    candidate + '.json',
    path.join(candidate, 'index.js'),
    path.join(candidate, 'index.json'),
  ];
  for (const f of tries) {
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function resolveEntry(pkgDir, pkgJson) {
  const main = (typeof pkgJson.main === 'string' && pkgJson.main) || 'index.js';
  const candidate = path.join(pkgDir, main);
  if (fs.existsSync(candidate)) {
    const stat = fs.statSync(candidate);
    if (stat.isDirectory()) return path.join(candidate, 'index.js');
    return candidate;
  }
  const tries = [candidate + '.js', candidate + '.json'];
  for (const f of tries) {
    if (fs.existsSync(f)) return f;
  }
  return null;
}

/**
 * 从入口出发递归打包一个包内所有可达的内部模块。
 * 返回打包后的 index.js 内容（含 outsideDeps 注释）。
 */
function packJs(entryAbs, packageDir, warns) {
  const modules = [];
  const idByPath = new Map();
  let nextId = 1;

  function parseOne(fileAbs) {
    const key = path.resolve(fileAbs);
    if (idByPath.has(key)) return idByPath.get(key);
    const id = nextId++;
    idByPath.set(key, id);

    let content;
    let requires = [];
    if (fileAbs.endsWith('.json')) {
      const raw = fs.readFileSync(fileAbs, 'utf8');
      content = 'module.exports = ' + raw;
    } else {
      const raw = fs.readFileSync(fileAbs, 'utf8');
      const transformed = transformModuleCode(raw);
      content = transformed.code;
      requires = transformed.requires;
    }

    const mod = {id, code: content, deps: requires, depsMap: {}};
    modules.push(mod);

    for (const spec of requires) {
      if (!spec.startsWith('.') && !spec.startsWith('/')) continue;
      const resolved = resolveWithinPackage(packageDir, path.dirname(fileAbs), spec);
      if (resolved) {
        const depId = parseOne(resolved);
        mod.depsMap[spec] = depId;
      } else {
        warns.push({msg: `cannot resolve internal module "${spec}" from ${path.relative(packageDir, fileAbs)}`});
      }
    }
    return id;
  }

  parseOne(entryAbs);

  const outsideDeps = [];
  for (const m of modules) {
    for (const d of m.deps) {
      if (!(d in m.depsMap) && !outsideDeps.includes(d)) outsideDeps.push(d);
    }
  }

  const lines = [BUNDLE_RUNTIME];
  for (const m of modules) {
    lines.push(`__DEFINE__(${m.id}, function(require, module, exports) {`);
    lines.push(m.code);
    lines.push(`}, function(modId) {var map = ${JSON.stringify(m.depsMap)}; return __REQUIRE__(map[modId], modId); })`);
  }
  lines.push('return __REQUIRE__(1);');
  lines.push('})()');
  lines.push('//miniprogram-npm-outsideDeps=' + JSON.stringify(outsideDeps));
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// 主入口
// ---------------------------------------------------------------------------
/**
 * @param {Object} options
 * @param {string} options.projectRoot
 * @param {string} options.targetDir
 * @param {Object} options.projectPkg
 * @param {Object|boolean|undefined} options.npmConfig
 * @returns {Promise<boolean>} true if npm build ran, false if skipped
 */
async function buildNpm({projectRoot, targetDir, projectPkg, npmConfig}) {
  let enable = true;
  let ignores = [];

  if (npmConfig === false) {
    enable = false;
  } else if (npmConfig && typeof npmConfig === 'object') {
    if (npmConfig.enable === false) enable = false;
    if (Array.isArray(npmConfig.ignores)) ignores = npmConfig.ignores;
  }

  if (!enable) {
    logger.debug('[rsmax] npm build disabled by config');
    return false;
  }

  const deps = projectPkg && projectPkg.dependencies;
  if (!deps || Object.keys(deps).length === 0) {
    logger.debug('[rsmax] no npm dependencies found, skipping npm build');
    return false;
  }

  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (!await fs.pathExists(packageJsonPath)) {
    logger.warn('[rsmax] package.json not found, skipping npm build');
    return false;
  }

  const warns = [];
  const packages = collectPackages(projectRoot, projectPkg, ignores, warns);

  if (packages.length === 0) {
    for (const w of warns) logger.warn(`[rsmax] npm warning: ${w.msg}`);
    return false;
  }

  logger.log('[rsmax] Building npm (miniprogram_npm)...');
  const startTime = Date.now();

  const npmRoot = path.join(targetDir, 'miniprogram_npm');
  let miniProgramPackNum = 0;
  let otherNpmPackNum = 0;

  for (const pkg of packages) {
    try {
      const outDir = path.join(npmRoot, ...pkg.name.split('/'));
      const componentDir = getComponentDistDir(pkg.dir, pkg.pkgJson);
      if (componentDir) {
        await copyDir(componentDir, outDir, ignores, componentDir);
        miniProgramPackNum++;
      } else {
        const entry = resolveEntry(pkg.dir, pkg.pkgJson);
        if (!entry) {
          warns.push({msg: `entry not found for "${pkg.name}" (main: ${pkg.pkgJson.main})`});
          continue;
        }
        const code = packJs(entry, pkg.dir, warns);
        await fs.ensureDir(outDir);
        await fs.writeFile(path.join(outDir, 'index.js'), code, 'utf8');
        otherNpmPackNum++;
      }
    } catch (err) {
      warns.push({msg: `failed to build "${pkg.name}": ${err.message}`});
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  logger.success(
    `[rsmax] npm build complete (${elapsed}s) ` +
    `miniProgram: ${miniProgramPackNum}, other: ${otherNpmPackNum}`
  );
  for (const w of warns) {
    logger.warn(`[rsmax] npm warning: ${w.msg}`);
  }
  return true;
}

module.exports = {buildNpm};
