const t = require('@babel/types');
const babel = require('@babel/core');

/**
 * 编译时替换：将 process.env.VAR / process.env['VAR'] 替换为字面量
 * 支持的 define 值类型：string / number / boolean / null / undefined / 可 JSON 序列化的对象
 */
function buildDefineLiteral(value) {
  if (value === undefined) return t.identifier('undefined');
  if (value === null) return t.nullLiteral();
  if (typeof value === 'boolean') return t.booleanLiteral(value);
  if (typeof value === 'number') return t.numericLiteral(value);
  if (typeof value === 'string') return t.stringLiteral(value);
  // 对象/数组：通过 JSON.parse 在运行时反序列化，避免 babel 构造复杂 AST
  try {
    const json = JSON.stringify(value);
    return t.callExpression(
      t.memberExpression(t.identifier('JSON'), t.identifier('parse')),
      [t.stringLiteral(json)]
    );
  } catch (e) {
    return t.identifier('undefined');
  }
}

/**
 * 创建 define visitor：遍历 AST，将 process.env.XXX / process.env['XXX'] 替换为字面量
 */
function createDefineVisitor(defineObj) {
  if (!defineObj || Object.keys(defineObj).length === 0) return {};

  return {
    MemberExpression(nodePath) {
      const node = nodePath.node;
      // 匹配 process.env
      const isProcessEnv =
        t.isIdentifier(node.object) &&
        node.object.name === 'process' &&
        t.isIdentifier(node.property) &&
        node.property.name === 'env' &&
        node.computed === false;

      if (!isProcessEnv) return;

      // 如果父节点也是 MemberExpression（即 process.env.KEY），则替换父节点
      const parent = nodePath.parent;
      if (t.isMemberExpression(parent) && parent.object === node) {
        let key = null;
        if (t.isIdentifier(parent.property) && !parent.computed) {
          key = parent.property.name;
        } else if (t.isStringLiteral(parent.property)) {
          key = parent.property.value;
        }
        if (key && Object.prototype.hasOwnProperty.call(defineObj, key)) {
          nodePath.parentPath.replaceWith(buildDefineLiteral(defineObj[key]));
          nodePath.parentPath.skip();
          return;
        }
      }

      // 直接访问 process.env 整体：构造成一个对象字面量（避免 process is not defined）
      const props = Object.entries(defineObj).map(([k, v]) =>
        t.objectProperty(
          t.isValidIdentifier(k) ? t.identifier(k) : t.stringLiteral(k),
          buildDefineLiteral(v)
        )
      );
      nodePath.replaceWith(t.objectExpression(props));
      nodePath.skip();
    },
    // 兜底：匹配 const { API_BASE } = process.env 的解构场景
    VariableDeclarator(nodePath) {
      const init = nodePath.node.init;
      if (!init) return;
      const isProcessEnv =
        t.isMemberExpression(init) &&
        t.isIdentifier(init.object) && init.object.name === 'process' &&
        t.isIdentifier(init.property) && init.property.name === 'env' &&
        !init.computed;
      if (!isProcessEnv) return;
      const props = Object.entries(defineObj).map(([k, v]) =>
        t.objectProperty(
          t.isValidIdentifier(k) ? t.identifier(k) : t.stringLiteral(k),
          buildDefineLiteral(v)
        )
      );
      nodePath.node.init = t.objectExpression(props);
    }
  };
}

const ALL_HOOKS = [
  'useState', 'useEffect', 'useContext', 'useQuery', 'useStore',
  'usePageEvent', 'useComponentEvent', 'useAppEvent', 'createContext'
];

const SETUP_FNS = ['createApp', 'createPage', 'createComponent'];
const RUNTIME_UTILS = ['promisify'];
const RSMAX_MODULE = '@rsmax/runtime';
const STORE_MODULE = '@rsmax/store';
const STORE_MIDDLEWARE_MODULE = '@rsmax/store/middleware';
const I18N_MODULE = '@rsmax/i18n';
const I18N_EXPORTS = ['useI18n', 'initI18n', 't', 'setLocale', 'getLocale', 'addMessages', 'getI18n', 'createI18n'];

function isRenderMethod(member) {
  return (t.isClassMethod(member) || t.isObjectMethod(member)) &&
         t.isIdentifier(member.key, { name: 'render' });
}

function convertImportToRequire(specifiers, sourceLit) {
  const stmts = [];
  if (!specifiers || specifiers.length === 0) {
    // import 'side-effect-module'; -> require('module');
    stmts.push(t.expressionStatement(
      t.callExpression(t.identifier('require'), [sourceLit])
    ));
    return stmts;
  }
  for (const spec of specifiers) {
    if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
      stmts.push(t.variableDeclaration('var', [
        t.variableDeclarator(
          t.identifier(spec.local.name),
          t.callExpression(t.identifier('require'), [sourceLit])
        )
      ]));
    } else if (t.isImportSpecifier(spec)) {
      stmts.push(t.variableDeclaration('var', [
        t.variableDeclarator(
          t.objectPattern([
            t.objectProperty(
              t.identifier(spec.imported.name),
              t.identifier(spec.local.name),
              false,
              spec.imported.name === spec.local.name
            )
          ]),
          t.callExpression(t.identifier('require'), [sourceLit])
        )
      ]));
    }
  }
  return stmts;
}

function transformClassToConfig(classBody, addData = true) {
  const properties = [];
  const methods = [];
  let dataObj = null;
  let options = null;

  classBody.body.forEach(member => {
    if (t.isClassProperty(member)) {
      const key = member.key;
      const propName = t.isIdentifier(key) ? key.name : key.value;

      if (propName === 'data' && t.isObjectExpression(member.value)) {
        dataObj = member.value;
      } else if (propName === 'config' && t.isObjectExpression(member.value)) {
        options = member.value;
      } else if (isRenderMethod(member)) {
        return;
      } else if (t.isArrowFunctionExpression(member.value) || t.isFunctionExpression(member.value)) {
        const funcNode = member.value;
        const funcName = t.isIdentifier(key) ? key.name : '';
        const funcExpr = t.functionExpression(
          t.identifier(funcName),
          funcNode.params,
          t.isBlockStatement(funcNode.body) ? funcNode.body : t.blockStatement([t.returnStatement(funcNode.body)]),
          false,
          funcNode.async
        );
        methods.push(t.objectProperty(key, funcExpr, false, false));
      } else {
        properties.push(t.objectProperty(key, member.value, false, false));
      }
    } else if (t.isClassMethod(member)) {
      if (isRenderMethod(member)) return;
      const key = member.key;
      const methodName = t.isIdentifier(key) ? key.name : key.value;
      const funcExpr = t.functionExpression(t.identifier(methodName), member.params, member.body, member.generator, member.async);
      methods.push(t.objectProperty(key, funcExpr, false, false));
    }
  });

  const configProps = [];
  if (dataObj) {
    configProps.push(t.objectProperty(t.identifier('data'), dataObj));
  } else if (addData) {
    configProps.push(t.objectProperty(t.identifier('data'), t.objectExpression([])));
  }
  if (options) {
    configProps.push(t.objectProperty(t.identifier('options'), options));
  }
  configProps.push(...properties, ...methods);
  return t.objectExpression(configProps);
}

function transformObjectToConfig(objExpr, addData = true) {
  const props = [];
  let hasData = false;

  objExpr.properties.forEach(prop => {
    if (t.isObjectMethod(prop)) {
      if (t.isIdentifier(prop.key, { name: 'render' })) return;
      const methodName = t.isIdentifier(prop.key) ? prop.key.name : prop.key.value;
      const funcExpr = t.functionExpression(t.identifier(methodName), prop.params, prop.body, prop.generator, prop.async);
      props.push(t.objectProperty(prop.key, funcExpr, false, false));
    } else if (t.isObjectProperty(prop)) {
      if (t.isIdentifier(prop.key, { name: 'render' })) return;
      if (t.isIdentifier(prop.key, { name: 'data' })) hasData = true;
      if (t.isArrowFunctionExpression(prop.value) || t.isFunctionExpression(prop.value)) {
        const funcNode = prop.value;
        const funcName = t.isIdentifier(prop.key) ? prop.key.name : '';
        const funcExpr = t.functionExpression(t.identifier(funcName), funcNode.params,
          t.isBlockStatement(funcNode.body) ? funcNode.body : t.blockStatement([t.returnStatement(funcNode.body)]),
          false, funcNode.async);
        props.push(t.objectProperty(prop.key, funcExpr, false, false));
      } else {
        props.push(prop);
      }
    } else {
      props.push(prop);
    }
  });

  if (addData && !hasData) {
    props.unshift(t.objectProperty(t.identifier('data'), t.objectExpression([])));
  }
  return t.objectExpression(props);
}

module.exports = function() {
  return {
    name: 'babel-plugin-transform-js',
    visitor: {
      Program: {
        enter(path, state) {
          state.rsmaxImported = new Map();
          state.storeImported = new Map(); // localName -> importedName for @rsmax/store
          state.storeMwImported = new Map(); // localName -> importedName for @rsmax/store/middleware
          state.i18nImported = new Map(); // localName -> importedName for @rsmax/i18n
          state.hasRsmaxImport = false;
          state.usesHooks = false;
          state.usesStore = false;
          state.usesStoreMiddleware = false;
          state.usesI18n = false;
          state.runtimeId = null;

          // 先跑一轮 define 替换（在其他 visitor 执行之前）
          const defineVars = (state.opts && state.opts.define) || {};
          if (Object.keys(defineVars).length > 0) {
            const visitor = createDefineVisitor(defineVars);
            path.traverse(visitor, state);
          }
        }
      },

      ImportDeclaration(path, state) {
        const sourceValue = path.node.source.value;

        // Remove .wxs imports - WXS modules are referenced in WXML, not in JS
        if (sourceValue.endsWith('.wxs')) {
          path.remove();
          return;
        }

        if (t.isStringLiteral(path.node.source, { value: RSMAX_MODULE })) {
          state.hasRsmaxImport = true;
          state.usesHooks = true;

          path.node.specifiers.forEach(spec => {
            if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
              const importedName = spec.imported.name;
              const localName = spec.local.name;
              if (ALL_HOOKS.includes(importedName) || SETUP_FNS.includes(importedName) || RUNTIME_UTILS.includes(importedName)) {
                state.rsmaxImported.set(localName, importedName);
              }
            }
          });

          path.remove();
        } else if (t.isStringLiteral(path.node.source, { value: STORE_MODULE })) {
          // @rsmax/store → rewrite to local rsmax-store.js (only if storePath is provided)
          const fileOpts = state.opts || {};
          if (fileOpts.storePath) {
            state.usesStore = true;
            const sourceLit = t.stringLiteral(fileOpts.storePath);

            path.node.specifiers.forEach(spec => {
              if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
                state.storeImported.set(spec.local.name, spec.imported.name);
              } else if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
                state.storeImported.set(spec.local.name, '__default');
              }
            });

            const stmts = convertImportToRequire(path.node.specifiers, sourceLit);
            if (stmts.length === 1) path.replaceWith(stmts[0]);
            else path.replaceWithMultiple(stmts);
          }
        } else if (t.isStringLiteral(path.node.source, { value: STORE_MIDDLEWARE_MODULE })) {
          // @rsmax/store/middleware → rewrite to local rsmax-store-middleware.js (only if path provided)
          const fileOpts = state.opts || {};
          if (fileOpts.storeMiddlewarePath) {
            state.usesStoreMiddleware = true;
            const sourceLit = t.stringLiteral(fileOpts.storeMiddlewarePath);

            path.node.specifiers.forEach(spec => {
              if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
                state.storeMwImported.set(spec.local.name, spec.imported.name);
              } else if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
                state.storeMwImported.set(spec.local.name, '__default');
              }
            });

            const stmts = convertImportToRequire(path.node.specifiers, sourceLit);
            if (stmts.length === 1) path.replaceWith(stmts[0]);
            else path.replaceWithMultiple(stmts);
          }
        } else if (t.isStringLiteral(path.node.source, { value: I18N_MODULE })) {
          // @rsmax/i18n → rewrite to local rsmax-i18n.js (only if i18nPath is provided)
          const fileOpts = state.opts || {};
          if (fileOpts.i18nPath) {
            state.usesI18n = true;
            const sourceLit = t.stringLiteral(fileOpts.i18nPath);

            path.node.specifiers.forEach(spec => {
              if (t.isImportSpecifier(spec) && t.isIdentifier(spec.imported)) {
                state.i18nImported.set(spec.local.name, spec.imported.name);
              } else if (t.isImportDefaultSpecifier(spec) || t.isImportNamespaceSpecifier(spec)) {
                state.i18nImported.set(spec.local.name, '__default');
              }
            });

            const stmts = convertImportToRequire(path.node.specifiers, sourceLit);
            if (stmts.length === 1) path.replaceWith(stmts[0]);
            else path.replaceWithMultiple(stmts);
          }
        } else {
          // Convert non-rsmax imports to CommonJS require()
          const source = path.node.source;
          const specifiers = path.node.specifiers;
          const stmts = convertImportToRequire(specifiers, source);
          if (stmts.length === 1) path.replaceWith(stmts[0]);
          else if (stmts.length > 1) path.replaceWithMultiple(stmts);
          else path.remove();
        }
      },

      VariableDeclaration(path, state) {
        if (path.node.declarations.length === 1) {
          const decl = path.node.declarations[0];
          if (t.isCallExpression(decl.init) &&
              t.isIdentifier(decl.init.callee, { name: 'require' }) &&
              decl.init.arguments.length === 1 &&
              t.isStringLiteral(decl.init.arguments[0])) {
            const reqSource = decl.init.arguments[0].value;
            const fileOpts = state.opts || {};

            // Remove require('./xxx.wxs') - WXS modules are referenced in WXML, not in JS
            if (reqSource.endsWith('.wxs')) {
              path.remove();
              return;
            }

            if (reqSource === RSMAX_MODULE) {
              state.hasRsmaxImport = true;
              if (t.isObjectPattern(decl.id)) {
                decl.id.properties.forEach(prop => {
                  if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                    const keyName = prop.key.name;
                    const localName = t.isIdentifier(prop.value) ? prop.value.name : keyName;
                    if (ALL_HOOKS.includes(keyName) || SETUP_FNS.includes(keyName) || RUNTIME_UTILS.includes(keyName)) {
                      state.rsmaxImported.set(localName, keyName);
                    }
                  }
                });
              }
              path.remove();
              return;
            }

            if (reqSource === STORE_MODULE) {
              if (fileOpts.storePath) {
                state.usesStore = true;
                decl.init.arguments[0] = t.stringLiteral(fileOpts.storePath);
                if (t.isObjectPattern(decl.id)) {
                  decl.id.properties.forEach(prop => {
                    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                      const keyName = prop.key.name;
                      const localName = t.isIdentifier(prop.value) ? prop.value.name : keyName;
                      state.storeImported.set(localName, keyName);
                    }
                  });
                } else if (t.isIdentifier(decl.id)) {
                  state.storeImported.set(decl.id.name, '__default');
                }
              }
              return;
            }

            if (reqSource === STORE_MIDDLEWARE_MODULE) {
              if (fileOpts.storeMiddlewarePath) {
                state.usesStoreMiddleware = true;
                decl.init.arguments[0] = t.stringLiteral(fileOpts.storeMiddlewarePath);
                if (t.isObjectPattern(decl.id)) {
                  decl.id.properties.forEach(prop => {
                    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                      const keyName = prop.key.name;
                      const localName = t.isIdentifier(prop.value) ? prop.value.name : keyName;
                      state.storeMwImported.set(localName, keyName);
                    }
                  });
                } else if (t.isIdentifier(decl.id)) {
                  state.storeMwImported.set(decl.id.name, '__default');
                }
              }
              return;
            }

            if (reqSource === I18N_MODULE) {
              if (fileOpts.i18nPath) {
                state.usesI18n = true;
                decl.init.arguments[0] = t.stringLiteral(fileOpts.i18nPath);
                if (t.isObjectPattern(decl.id)) {
                  decl.id.properties.forEach(prop => {
                    if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                      const keyName = prop.key.name;
                      const localName = t.isIdentifier(prop.value) ? prop.value.name : keyName;
                      if (I18N_EXPORTS.includes(keyName)) {
                        state.i18nImported.set(localName, keyName);
                      }
                    }
                  });
                } else if (t.isIdentifier(decl.id)) {
                  state.i18nImported.set(decl.id.name, '__default');
                }
              }
              return;
            }
          }
        }
      },

      ExportDefaultDeclaration(path, state) {
        const declaration = path.node.declaration;
        let isComponent = false;
        let isApp = false;
        let isFunctional = false;

        const fileOpts = state.opts || {};
        const type = fileOpts.type || 'page';
        const runtimePath = fileOpts.runtimePath || './rsmax-runtime.js';

        if (type === 'app') isApp = true;
        else if (type === 'component') isComponent = true;

        if (t.isClassDeclaration(declaration)) {
          (declaration.decorators || []).forEach(dec => {
            if (t.isIdentifier(dec.expression, { name: 'Component' })) isComponent = true;
            if (t.isIdentifier(dec.expression, { name: 'App' })) isApp = true;
          });
          if (declaration.superClass) {
            if (t.isIdentifier(declaration.superClass, { name: 'Component' })) isComponent = true;
            if (t.isIdentifier(declaration.superClass, { name: 'App' })) isApp = true;
          }
        }

        if (t.isFunctionDeclaration(declaration) || t.isArrowFunctionExpression(declaration)) {
          isFunctional = true;
        }

        if (!isFunctional && !state.hasRsmaxImport) {
          let configObj = null;
          const addData = !isApp;

          if (t.isClassDeclaration(declaration)) {
            configObj = transformClassToConfig(declaration.body, addData);
          } else if (t.isObjectExpression(declaration)) {
            configObj = transformObjectToConfig(declaration, addData);
          }

          if (configObj) {
            const factoryFunc = isApp ? 'App' : (isComponent ? 'Component' : 'Page');
            const callExpr = t.callExpression(t.identifier(factoryFunc), [configObj]);
            path.replaceWith(callExpr);
          }
          return;
        }

        const addData = !isApp;

        if (isFunctional || state.hasRsmaxImport) {
          const program = path.findParent(p => p.isProgram());
          const runtimeId = program.scope.generateUid('rsmax');
          state.runtimeId = runtimeId;

          let fnBody;
          let fnParams;
          let fnAsync = false;

          if (isFunctional) {
            if (t.isFunctionDeclaration(declaration)) {
              fnBody = declaration.body;
              fnParams = declaration.params;
              fnAsync = declaration.async;
            } else if (t.isArrowFunctionExpression(declaration)) {
              fnParams = declaration.params;
              fnAsync = declaration.async;
              if (t.isBlockStatement(declaration.body)) {
                fnBody = declaration.body;
              } else {
                fnBody = t.blockStatement([t.returnStatement(declaration.body)]);
              }
            }
          } else {
            fnBody = t.blockStatement([]);
            fnParams = [];
          }

          if (!fnBody) return;

          const stateInitialValues = [];

          if (isFunctional) {
            for (const stmt of fnBody.body) {
              if (t.isVariableDeclaration(stmt)) {
                for (const decl of stmt.declarations) {
                  // useState: const [count, setCount] = useState(0)
                  if (t.isArrayPattern(decl.id) && t.isCallExpression(decl.init)) {
                    const callee = decl.init.callee;
                    let isUseState = false;
                    if (t.isIdentifier(callee)) {
                      const name = callee.name;
                      if (state.rsmaxImported.get(name) === 'useState') {
                        isUseState = true;
                      }
                    }
                    if (isUseState) {
                      const stateName = decl.id.elements[0] && t.isIdentifier(decl.id.elements[0]) ? decl.id.elements[0].name : null;
                      const initArg = decl.init.arguments[0] || t.identifier('undefined');
                      if (stateName) {
                        stateInitialValues.push(t.objectProperty(t.identifier(stateName), initArg));
                      }
                    }
                  }
                  // useStore initial value is set at runtime via setData, no need to add null here
                }
              }
            }
          }

          function getHookRuntimeName(node, state) {
            if (t.isIdentifier(node)) {
              const name = node.name;
              if (state.rsmaxImported.has(name)) {
                return state.rsmaxImported.get(name);
              }
            }
            return null;
          }

          function transformNode(node, state) {
            if (!node) return node;

            if (t.isCallExpression(node)) {
              const hookName = getHookRuntimeName(node.callee, state);
              if (hookName && (ALL_HOOKS.includes(hookName) || SETUP_FNS.includes(hookName) || RUNTIME_UTILS.includes(hookName))) {
                const newArgs = node.arguments.map(arg => transformNode(arg, state));
                return t.callExpression(
                  t.memberExpression(t.identifier(runtimeId), t.identifier(hookName)),
                  newArgs
                );
              }

              const newCallee = transformNode(node.callee, state);
              const newArgs = node.arguments.map(arg => transformNode(arg, state));
              return t.callExpression(newCallee, newArgs);
            }

            if (t.isReturnStatement(node)) {
              if (node.argument && (t.isJSXElement(node.argument) || t.isJSXFragment(node.argument))) {
                return null;
              }
              return t.returnStatement(node.argument ? transformNode(node.argument, state) : null);
            }

            if (t.isVariableDeclaration(node)) {
              const newDeclarators = [];
              const assignments = [];

              for (const decl of node.declarations) {
                let isState = false;

                if (t.isArrayPattern(decl.id) && t.isCallExpression(decl.init)) {
                  const hookName = getHookRuntimeName(decl.init.callee, state);
                  if (hookName === 'useState') {
                    isState = true;
                    const stateName = decl.id.elements[0] && t.isIdentifier(decl.id.elements[0]) ? decl.id.elements[0].name : 'state';
                    const args = decl.init.arguments.map(a => transformNode(a, state));
                    if (args.length < 2) {
                      args.push(t.stringLiteral(stateName));
                    }
                    const hookCall = t.callExpression(
                      t.memberExpression(t.identifier(runtimeId), t.identifier('useState')),
                      args
                    );
                    newDeclarators.push(t.variableDeclarator(t.cloneNode(decl.id, true, true), hookCall));
                  }
                } else if (t.isIdentifier(decl.id) && t.isCallExpression(decl.init)) {
                  // Check if this is a useStore call: const count = useStore(store, selector)
                  const hookName = getHookRuntimeName(decl.init.callee, state);
                  if (hookName === 'useStore') {
                    const stateName = decl.id.name;
                    const args = decl.init.arguments.map(a => transformNode(a, state));
                    // Inject key as third argument if not already provided
                    if (args.length < 3) {
                      args.push(t.stringLiteral(stateName));
                    }
                    const hookCall = t.callExpression(
                      t.memberExpression(t.identifier(runtimeId), t.identifier('useStore')),
                      args
                    );
                    newDeclarators.push(t.variableDeclarator(t.cloneNode(decl.id, true, true), hookCall));
                  } else if (t.isArrowFunctionExpression(decl.init) || t.isFunctionExpression(decl.init)) {
                    const name = decl.id.name;
                    const isHook = ALL_HOOKS.includes(name) || state.rsmaxImported.has(name);
                    if (!isHook && !name.startsWith('use')) {
                      const funcVal = transformNode(decl.init, state);
                      assignments.push(t.expressionStatement(
                        t.assignmentExpression(
                          '=',
                          t.memberExpression(t.thisExpression(), t.identifier(name)),
                          funcVal
                        )
                      ));
                      newDeclarators.push(t.variableDeclarator(
                        decl.id,
                        t.memberExpression(t.thisExpression(), t.identifier(name))
                      ));
                    } else {
                      newDeclarators.push(t.variableDeclarator(decl.id, decl.init ? transformNode(decl.init, state) : null));
                    }
                  } else {
                    newDeclarators.push(t.variableDeclarator(decl.id, decl.init ? transformNode(decl.init, state) : null));
                  }
                } else if (t.isIdentifier(decl.id) && (t.isArrowFunctionExpression(decl.init) || t.isFunctionExpression(decl.init))) {
                  const name = decl.id.name;
                  const isHook = ALL_HOOKS.includes(name) || state.rsmaxImported.has(name);
                  if (!isHook && !name.startsWith('use')) {
                    const funcVal = transformNode(decl.init, state);
                    assignments.push(t.expressionStatement(
                      t.assignmentExpression(
                        '=',
                        t.memberExpression(t.thisExpression(), t.identifier(name)),
                        funcVal
                      )
                    ));
                    newDeclarators.push(t.variableDeclarator(
                      decl.id,
                      t.memberExpression(t.thisExpression(), t.identifier(name))
                    ));
                  } else {
                    newDeclarators.push(t.variableDeclarator(decl.id, decl.init ? transformNode(decl.init, state) : null));
                  }
                } else {
                  newDeclarators.push(t.variableDeclarator(decl.id, decl.init ? transformNode(decl.init, state) : null));
                }
              }

              const result = [];
              result.push(...assignments);
              if (newDeclarators.length > 0) {
                result.push(t.variableDeclaration(node.kind, newDeclarators));
              }
              return result;
            }

            if (t.isFunctionDeclaration(node)) {
              const name = node.id && node.id.name;
              const isHook = ALL_HOOKS.includes(name) || state.rsmaxImported.has(name);
              if (name && !isHook && !name.startsWith('use')) {
                const funcExpr = t.functionExpression(
                  null,
                  node.params.map(p => transformNode(p, state)),
                  transformNode(node.body, state),
                  node.generator,
                  node.async
                );
                return [
                  t.expressionStatement(
                    t.assignmentExpression(
                      '=',
                      t.memberExpression(t.thisExpression(), t.identifier(name)),
                      funcExpr
                    )
                  )
                ];
              }
              return node;
            }

            if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
              const bodyIsBlock = t.isBlockStatement(node.body);
              let newBody;
              if (bodyIsBlock) {
                const newStmts = [];
                for (const stmt of node.body.body) {
                  const transformed = transformNode(stmt, state);
                  if (Array.isArray(transformed)) {
                    newStmts.push(...transformed);
                  } else if (transformed) {
                    newStmts.push(transformed);
                  }
                }
                newBody = t.blockStatement(newStmts);
              } else {
                newBody = transformNode(node.body, state);
              }

              if (t.isArrowFunctionExpression(node)) {
                return t.arrowFunctionExpression(node.params.map(p => transformNode(p, state)), newBody, node.async);
              }
              return t.functionExpression(node.id, node.params.map(p => transformNode(p, state)), newBody, node.generator, node.async);
            }

            if (t.isBlockStatement(node)) {
              const newStmts = [];
              for (const stmt of node.body) {
                const transformed = transformNode(stmt, state);
                if (Array.isArray(transformed)) {
                  newStmts.push(...transformed);
                } else if (transformed) {
                  newStmts.push(transformed);
                }
              }
              return t.blockStatement(newStmts);
            }

            if (t.isExpressionStatement(node)) {
              return t.expressionStatement(transformNode(node.expression, state));
            }

            if (t.isMemberExpression(node)) {
              return t.memberExpression(
                transformNode(node.object, state),
                node.computed ? transformNode(node.property, state) : node.property,
                node.computed
              );
            }

            if (t.isIdentifier(node)) {
              const hookName = state.rsmaxImported.get(node.name);
              if (hookName && (ALL_HOOKS.includes(hookName) || RUNTIME_UTILS.includes(hookName))) {
                return t.memberExpression(t.identifier(runtimeId), t.identifier(hookName));
              }
              return node;
            }

            if (t.isBinaryExpression(node)) {
              return t.binaryExpression(node.operator, transformNode(node.left, state), transformNode(node.right, state));
            }

            if (t.isConditionalExpression(node)) {
              return t.conditionalExpression(
                transformNode(node.test, state),
                transformNode(node.consequent, state),
                transformNode(node.alternate, state)
              );
            }

            if (t.isArrayExpression(node)) {
              return t.arrayExpression(node.elements.map(el => el ? transformNode(el, state) : el));
            }

            if (t.isObjectExpression(node)) {
              return t.objectExpression(node.properties.map(prop => {
                if (t.isObjectProperty(prop)) {
                  return t.objectProperty(prop.key, transformNode(prop.value, state), prop.computed, prop.shorthand);
                }
                return prop;
              }));
            }

            return node;
          }

          let transformedBody;
          let userFn;

          // Extract component properties from destructured function parameters
          const componentProps = [];
          if (isFunctional && isComponent && fnParams.length > 0) {
            const firstParam = fnParams[0];
            if (t.isObjectPattern(firstParam)) {
              for (const prop of firstParam.properties) {
                if (t.isObjectProperty(prop) && t.isIdentifier(prop.key)) {
                  const propName = prop.key.name;
                  let defaultValue = t.nullLiteral();
                  if (prop.value && t.isAssignmentPattern(prop.value) && prop.value.right) {
                    defaultValue = prop.value.right;
                  }
                  componentProps.push(t.objectProperty(
                    t.identifier(propName),
                    t.objectExpression([
                      t.objectProperty(t.identifier('type'), t.nullLiteral()),
                      t.objectProperty(t.identifier('value'), defaultValue)
                    ])
                  ));
                }
              }
            }
          }

          if (isFunctional) {
            transformedBody = transformNode(fnBody, state);
            userFn = t.functionExpression(null, fnParams, transformedBody, false, fnAsync);
          } else {
            transformedBody = t.blockStatement([]);
            userFn = t.functionExpression(null, [], transformedBody);
          }

          const configProps = [];
          if (stateInitialValues.length > 0) {
            configProps.push(t.objectProperty(t.identifier('data'), t.objectExpression(stateInitialValues)));
          }
          if (componentProps.length > 0) {
            configProps.push(t.objectProperty(t.identifier('properties'), t.objectExpression(componentProps)));
          }

          const configArgs = [userFn];
          if (configProps.length > 0) {
            configArgs.push(t.objectExpression(configProps));
          } else {
            configArgs.push(t.objectExpression([]));
          }

          let setupCall;
          let factoryName;

          if (isApp) {
            setupCall = t.callExpression(
              t.memberExpression(t.identifier(runtimeId), t.identifier('createApp')),
              isFunctional ? configArgs : [t.objectExpression([])]
            );
            factoryName = 'App';
          } else if (isComponent) {
            setupCall = t.callExpression(
              t.memberExpression(t.identifier(runtimeId), t.identifier('createComponent')),
              configArgs
            );
            factoryName = 'Component';
          } else {
            setupCall = t.callExpression(
              t.memberExpression(t.identifier(runtimeId), t.identifier('createPage')),
              configArgs
            );
            factoryName = 'Page';
          }

          const callExpr = t.callExpression(t.identifier(factoryName), [setupCall]);

          const stmts = [];
          stmts.push(t.variableDeclaration('var', [
            t.variableDeclarator(
              t.identifier(runtimeId),
              t.callExpression(t.identifier('require'), [t.stringLiteral(runtimePath)])
            )
          ]));

          stmts.push(t.expressionStatement(callExpr));

          path.replaceWithMultiple(stmts);
        }
      }
    }
  };
};

module.exports.transformJS = function(ast, code, options = {}) {
  const {
    type = 'page',
    runtimePath = './rsmax-runtime.js',
    storePath,
    storeMiddlewarePath,
    i18nPath,
    define
  } = options;
  const result = babel.transformFromAstSync(ast, code, {
    plugins: [[module.exports, { type, runtimePath, storePath, storeMiddlewarePath, i18nPath, define }]],
    configFile: false,
    babelrc: false,
    generatorOpts: { retainLines: false, compact: false, quotes: 'single' }
  });
  return result.code;
};

/**
 * Transform a plain ES module file (no component/page export) to CommonJS.
 * Used for store definition files, utility modules etc. that use import/export.
 */
function esmToCjsPlugin() {
  return {
    name: 'babel-plugin-esm-to-cjs',
    visitor: {
      Program: {
        enter(path, state) {
          state.storeImported = new Map();
          state.storeMwImported = new Map();
          state.i18nImported = new Map();
          state.usesStore = false;
          state.usesStoreMiddleware = false;
          state.usesI18n = false;
        },
        exit(path, state) {
          // Convert remaining export statements
        }
      },
      ImportDeclaration(path, state) {
        const fileOpts = state.opts || {};
        let sourceValue = path.node.source.value;

        // Remove .wxs imports - WXS modules are referenced in WXML, not in JS
        if (sourceValue.endsWith('.wxs')) {
          path.remove();
          return;
        }

        // Rewrite @rsmax paths only if explicit paths are provided
        if (sourceValue === STORE_MODULE && fileOpts.storePath) {
          state.usesStore = true;
          sourceValue = fileOpts.storePath;
        } else if (sourceValue === STORE_MIDDLEWARE_MODULE && fileOpts.storeMiddlewarePath) {
          state.usesStoreMiddleware = true;
          sourceValue = fileOpts.storeMiddlewarePath;
        } else if (sourceValue === I18N_MODULE && fileOpts.i18nPath) {
          state.usesI18n = true;
          sourceValue = fileOpts.i18nPath;
        }

        const sourceLit = t.stringLiteral(sourceValue);
        const stmts = convertImportToRequire(path.node.specifiers, sourceLit);
        if (stmts.length === 1) path.replaceWith(stmts[0]);
        else if (stmts.length > 1) path.replaceWithMultiple(stmts);
        else path.remove();
      },
      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration;
        const specifiers = path.node.specifiers;
        const stmts = [];

        if (declaration) {
          // export const foo = ... / export function foo() {}
          if (t.isVariableDeclaration(declaration)) {
            stmts.push(declaration);
            declaration.declarations.forEach(decl => {
              if (t.isIdentifier(decl.id)) {
                stmts.push(t.expressionStatement(
                  t.assignmentExpression('=',
                    t.memberExpression(t.identifier('exports'), t.identifier(decl.id.name)),
                    t.identifier(decl.id.name)
                  )
                ));
              }
            });
          } else if (t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
            stmts.push(declaration);
            if (declaration.id) {
              stmts.push(t.expressionStatement(
                t.assignmentExpression('=',
                  t.memberExpression(t.identifier('exports'), t.identifier(declaration.id.name)),
                  t.identifier(declaration.id.name)
                )
              ));
            }
          } else {
            stmts.push(declaration);
          }
        }

        if (specifiers && specifiers.length > 0) {
          // export { a, b } from 'c'; or export { a, b };
          const source = path.node.source;
          specifiers.forEach(spec => {
            if (t.isExportSpecifier(spec)) {
              const exported = t.isIdentifier(spec.exported) ? spec.exported.name : spec.exported.value;
              const local = t.isIdentifier(spec.local) ? spec.local.name : spec.local.value;
              if (source) {
                // Re-export: export { a } from 'mod'
                // -> const { a: _a } = require('mod'); exports.a = _a;
                const tempName = `__exp_${local}`;
                stmts.push(t.variableDeclaration('var', [
                  t.variableDeclarator(
                    t.objectPattern([
                      t.objectProperty(t.identifier(local), t.identifier(tempName), false, true)
                    ]),
                    t.callExpression(t.identifier('require'), [source])
                  )
                ]));
                stmts.push(t.expressionStatement(
                  t.assignmentExpression('=',
                    t.memberExpression(t.identifier('exports'), t.identifier(exported)),
                    t.identifier(tempName)
                  )
                ));
              } else {
                stmts.push(t.expressionStatement(
                  t.assignmentExpression('=',
                    t.memberExpression(t.identifier('exports'), t.identifier(exported)),
                    t.identifier(local)
                  )
                ));
              }
            }
          });
        }

        if (stmts.length === 1) path.replaceWith(stmts[0]);
        else if (stmts.length > 1) path.replaceWithMultiple(stmts);
        else path.remove();
      },
      ExportDefaultDeclaration(path) {
        const declaration = path.node.declaration;
        let expr;
        if (t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
          // export default function foo() {} -> function foo() {}; exports.default = foo;
          const stmts = [declaration];
          if (declaration.id) {
            stmts.push(t.expressionStatement(
              t.assignmentExpression('=',
                t.memberExpression(t.identifier('module'), t.identifier('exports')),
                t.identifier(declaration.id.name)
              )
            ));
          }
          path.replaceWithMultiple(stmts);
          return;
        } else {
          // export default expr -> module.exports = expr;
          expr = declaration;
        }
        path.replaceWith(t.expressionStatement(
          t.assignmentExpression('=',
            t.memberExpression(t.identifier('module'), t.identifier('exports')),
            expr
          )
        ));
      },
      ExportAllDeclaration(path) {
        // export * from 'mod'; -> Object.assign(exports, require('mod'));
        const source = path.node.source;
        path.replaceWith(t.expressionStatement(
          t.callExpression(
            t.memberExpression(t.identifier('Object'), t.identifier('assign')),
            [
              t.identifier('exports'),
              t.callExpression(t.identifier('require'), [source])
            ]
          )
        ));
      }
    }
  };
}

module.exports.transformModule = function(ast, code, options = {}) {
  const {
    storePath,
    storeMiddlewarePath,
    i18nPath,
    define
  } = options;
  // 先用 define 替换，再做 ESM->CJS
  const plugins = [];
  if (define && Object.keys(define).length > 0) {
    plugins.push([{
      name: 'babel-plugin-transform-define-inline',
      visitor: createDefineVisitor(define)
    }]);
  }
  plugins.push([esmToCjsPlugin, { storePath, storeMiddlewarePath, i18nPath }]);
  const result = babel.transformFromAstSync(ast, code, {
    plugins,
    configFile: false,
    babelrc: false,
    generatorOpts: { retainLines: false, compact: false, quotes: 'single' }
  });
  return result.code;
};
