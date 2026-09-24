const { describe, test, expect } = require('@rstest/core');
const parser = require('@babel/parser');
const plugin = require('../index');
const { transformJS, transformModule } = plugin;

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

describe('@rsmax/babel-plugin-transform-js', () => {
  describe('transformJS - object component', () => {
    test('should transform plain object to Page() call', () => {
      const code = 'export default { data: { count: 0 } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('Page(');
      expect(result).toContain('data:');
      expect(result).toContain('count: 0');
    });

    test('should transform plain object to Component() call', () => {
      const code = 'export default { properties: {} };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'component', runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('Component(');
    });

    test('should transform plain object to App() call', () => {
      const code = 'export default { onLaunch() {} };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'app', runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('App(');
    });

    test('should add empty data if not present for pages', () => {
      const code = 'export default { onLoad() {} };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('data: {}');
    });

    test('should not add data for app type', () => {
      const code = 'export default { onLaunch() {} };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'app' });

      expect(result).not.toContain('data: {}');
    });

    test('should remove render method from object', () => {
      const code = 'export default { data: { count: 0 }, render() { return null; } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).not.toContain('render');
    });
  });

  describe('transformJS - class component', () => {
    test('should transform class to Page() config', () => {
      const code = 'export default class Index { data = { count: 0 }; onLoad() {} }';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('Page(');
      expect(result).toContain('data:');
      expect(result).toContain('count: 0');
    });

    test('should transform class methods to object methods', () => {
      const code = 'export default class Index { onLoad() { console.log("load"); } }';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('onLoad: function');
    });

    test('should remove render method from class', () => {
      const code = 'export default class Index { render() { return null; } }';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).not.toContain('render');
    });
  });

  describe('transformJS - functional component with hooks', () => {
    test('should transform functional component with createPage', () => {
      const code = [
        'import { useState } from "@rsmax/runtime";',
        'export default function Index() {',
        '  const [count, setCount] = useState(0);',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('Page(');
      expect(result).toContain('.useState(');
      expect(result).toContain('data:');
      expect(result).toContain('count: 0');
      expect(result).toContain('rsmax-runtime.js');
    });

    test('should transform arrow function component', () => {
      const code = [
        'import { useState } from "@rsmax/runtime";',
        'export default () => {',
        '  const [count] = useState(0);',
        '  return null;',
        '};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('Page(');
      expect(result).toContain('.useState(');
    });
  });

  describe('import transformation', () => {
    test('should convert non-rsmax imports to require', () => {
      const code = [
        'import utils from "./utils";',
        'import { helper } from "./helper";',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      // default import 走 interop：先 require 到临时变量，再按 __esModule 取 default
      expect(result).toContain('require("./utils")');
      expect(result).toContain('__esModule');
      expect(result).toContain('.default');
      expect(result).toContain('helper');
      expect(result).toContain('require("./helper")');
    });

    test('should remove @rsmax/runtime import', () => {
      const code = [
        'import { useState } from "@rsmax/runtime";',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).not.toContain('@rsmax/runtime');
    });

    test('should rewrite @rsmax/store import when storePath is provided', () => {
      const code = [
        'import { createStore } from "@rsmax/store";',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', storePath: './rsmax-store.js' });

      expect(result).toContain('./rsmax-store.js');
      expect(result).not.toContain('@rsmax/store');
    });

    test('should rewrite @rsmax/i18n import when i18nPath is provided', () => {
      const code = [
        'import { useI18n, t } from "@rsmax/i18n";',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', i18nPath: './rsmax-i18n.js' });

      expect(result).toContain('./rsmax-i18n.js');
      expect(result).not.toContain('@rsmax/i18n');
    });

    test('should rewrite @rsmax/i18n require() when i18nPath is provided', () => {
      const code = [
        'const { useI18n, t } = require("@rsmax/i18n");',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', i18nPath: './rsmax-i18n.js' });

      expect(result).toContain('./rsmax-i18n.js');
      expect(result).not.toContain('@rsmax/i18n');
    });

    test('should NOT rewrite @rsmax/i18n import when i18nPath is NOT provided', () => {
      const code = [
        'import { useI18n } from "@rsmax/i18n";',
        'export default {};'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('@rsmax/i18n');
      expect(result).not.toContain('./rsmax-i18n.js');
    });
  });

  // 执行 transformModule 产物，以桩 require 返回不同形态的模块，验证 default import 的运行时语义
  function evalDefaultImport(source, requiredValue) {
    const ast = parseCode(`${source}\nexport default _defaultImport;`);
    const code = transformModule(ast, source + '\nexport default _defaultImport;');
    const module = {exports: {}};
    // eslint-disable-next-line no-new-func
    new Function('module', 'exports', 'require', code)(
      module,
      module.exports,
      () => requiredValue
    );
    return module.exports;
  }

  describe('default import interop', () => {
    test('should emit __esModule guard for default imports (transformJS page)', () => {
      const code = 'import axios from "axios-miniprogram";\nexport default {};';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toMatch(/var _axios = require\("axios-miniprogram"\)/);
      expect(result).toContain('_axios.__esModule');
      expect(result).toContain('_axios.default');
    });

    test('should emit __esModule guard in plain modules (transformModule)', () => {
      const code = 'import axios from "axios-miniprogram";\nexport default axios;';
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).toMatch(/var _axios = require\("axios-miniprogram"\)/);
      expect(result).toContain('_axios.__esModule ? _axios.default : _axios');
    });

    test('namespace import should stay a bare require without interop', () => {
      const code = 'import * as ns from "./utils";\nexport default {};';
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toMatch(/var ns = require\("\.\/utils"\)/);
      expect(result).not.toContain('__esModule');
    });

    test('runtime: ESM-style package (__esModule + default) resolves to .default (axios-miniprogram)', () => {
      const axiosInstance = function request() {};
      const pkg = {__esModule: true, default: axiosInstance};
      expect(evalDefaultImport('import _defaultImport from "axios-miniprogram";', pkg)).toBe(axiosInstance);
    });

    test('runtime: plain CJS package (module.exports = fn) resolves to module itself', () => {
      const cjsMain = function () {};
      cjsMain.named = 1;
      expect(evalDefaultImport('import _defaultImport from "cjs-pkg";', cjsMain)).toBe(cjsMain);
    });

    test('runtime: rsmax-compiled module (module.exports = expr, no __esModule) resolves to expr', () => {
      const expr = {data: 1};
      expect(evalDefaultImport('import _defaultImport from "./compiled";', expr)).toBe(expr);
    });

    test('runtime: mixed default + named import both resolve correctly', () => {
      const instance = function request() {};
      const post = function post() {};
      const source = 'import _defaultImport, { post } from "axios-miniprogram";\nexport default { d: _defaultImport, post: post };';
      const ast = parseCode(source);
      const code = transformModule(ast, source);
      const module = {exports: {}};
      // eslint-disable-next-line no-new-func
      new Function('module', 'exports', 'require', code)(
        module,
        module.exports,
        () => ({__esModule: true, default: instance, post})
      );
      expect(module.exports.d).toBe(instance); // default 绑定
      expect(module.exports.post).toBe(post); // named 绑定
    });

    test('runtime: null/falsy require result does not throw and resolves as-is', () => {
      expect(evalDefaultImport('import _defaultImport from "maybe-missing";', null)).toBeNull();
    });
  });

  describe('transformModule', () => {
    test('should convert ES module exports to CommonJS', () => {
      const code = [
        'export const foo = "bar";',
        'export function helper() { return 1; }'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).toContain('exports.foo = foo');
      expect(result).toContain('exports.helper = helper');
    });

    test('should convert default export to module.exports', () => {
      const code = 'export default { count: 0 };';
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).toContain('module.exports =');
    });

    test('should handle export named declarations', () => {
      const code = [
        'const a = 1;',
        'const b = 2;',
        'export { a, b };'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).toContain('exports.a = a');
      expect(result).toContain('exports.b = b');
    });

    test('should handle export all', () => {
      const code = 'export * from "./utils";';
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).toContain('Object.assign(exports, require');
      expect(result).toContain('./utils');
    });
  });

  describe('WXS support', () => {
    test('should remove .wxs import declarations from ES modules', () => {
      const code = `import tools from './tools.wxs';
import { useState } from '@rsmax/runtime';
export default { data: { count: 0 } };`;
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page', runtimePath: './rsmax-runtime.js' });

      expect(result).not.toContain("import tools from './tools.wxs'");
      expect(result).toContain('Page(');
    });

    test('should remove const m = require("./xxx.wxs")', () => {
      const code = `const tools = require('./tools.wxs');
export default { data: { count: 0 } };`;
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).not.toContain("require('./tools.wxs')");
      expect(result).toContain('Page(');
    });

    test('should remove .wxs import in esmToCjs plugin', () => {
      const code = `import tools from './format.wxs';
import { t } from '@rsmax/i18n';
const msg = t('hello');
export default msg;`;
      const ast = parseCode(code);
      const result = transformModule(ast, code);

      expect(result).not.toContain("import tools from './format.wxs'");
      expect(result).not.toContain('./format.wxs');
      expect(result).toContain('module.exports');
    });
  });

  describe('plugin exports', () => {
    test('should export plugin function', () => {
      expect(typeof plugin).toBe('function');
      const instance = plugin();
      expect(instance.name).toBe('babel-plugin-transform-js');
      expect(instance.visitor).toBeDefined();
    });

    test('should export transformJS and transformModule', () => {
      expect(typeof transformJS).toBe('function');
      expect(typeof transformModule).toBe('function');
    });
  });
});
