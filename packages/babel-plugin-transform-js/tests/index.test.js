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
      expect(result).toContain('rsmax-runtime.js');
      // 纯字面量初值外提到注册期 data，保证首屏第一帧即有值
      expect(result).toMatch(/useState\(0, ['"]count['"]\)/);
      expect(result).toContain('data:');
      expect(result).toContain('count: 0');
    });

    test('should keep dynamic useState initializer inside component function scope', () => {
      const code = [
        'import { useState, useQuery } from "@rsmax/runtime";',
        'export default function Detail() {',
        '  const query = useQuery();',
        '  const [id] = useState(query.id || "");',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      // 动态表达式原样保留在函数体内，且不出现在 createPage 的静态 data 中
      expect(result).toContain('useState(query.id || "", "id")');
      expect(result).not.toContain('data: {');
    });

    test('should keep lazy useState initializer function untouched', () => {
      const code = [
        'import { useState } from "@rsmax/runtime";',
        'export default function Detail() {',
        '  const [rows] = useState(() => computeRows());',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('useState(() => computeRows(), "rows")');
      expect(result).not.toContain('data: {');
    });

    test('should hoist static array/object literals but not dynamic ones', () => {
      const code = [
        'import { useState } from "@rsmax/runtime";',
        'export default function Detail() {',
        '  const [tabs] = useState(["created", "joined"]);',
        '  const [filters] = useState({ page: 1, size: 20 });',
        '  const [rows] = useState(awaitData());',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      // 静态数组/对象外提
      expect(result).toContain('tabs: ["created", "joined"]');
      expect(result).toContain('filters:');
      expect(result).toContain('page: 1');
      // 函数调用是动态的，不出现在 data 中
      expect(result).not.toMatch(/data\s*:\s*\{[\s\S]*rows/);
      expect(result).toContain('useState(awaitData(), "rows")');
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

  describe('@rsmax/runtime references in nested syntax contexts', () => {
    // 匹配「裸调用」：名字前不是点号/单词字符（即不是 _rsmax.promisify 这类成员访问）
    const bareCall = name => new RegExp(`(?<![\\w.])${name}\\s*\\(`);

    test('should rewrite promisify inside await + try/catch of async handler (login regression)', () => {
      const code = [
        'import { useState, useQuery, promisify } from "@rsmax/runtime";',
        'export default function Login() {',
        '  const query = useQuery();',
        '  const [loading] = useState(false);',
        '  const onWxLogin = async () => {',
        '    try {',
        '      const { code } = await promisify(wx.login)();',
        '      return code;',
        '    } catch (err) {',
        '      wx.showToast({ title: "登录失败，请重试" });',
        '    }',
        '  };',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('.promisify(wx.login)');
      expect(result).toContain('.useQuery(');
      expect(result).toContain('.useState(');
      expect(result).toContain('catch');
      // import 已被移除，裸 promisify 会在运行时 ReferenceError
      expect(result).not.toMatch(bareCall('promisify'));
      expect(result).not.toContain('@rsmax/runtime');
    });

    test('should rewrite promisify inside plain await without try/catch', () => {
      const code = [
        'import { promisify } from "@rsmax/runtime";',
        'export default function Scan() {',
        '  const scan = async () => {',
        '    const res = await promisify(wx.scanCode)();',
        '    return res;',
        '  };',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('.promisify(wx.scanCode)');
      expect(result).not.toMatch(bareCall('promisify'));
    });

    test('should rewrite runtime imports across control-flow, logical, new and template contexts', () => {
      const code = [
        'import { promisify } from "@rsmax/runtime";',
        'export default function Page() {',
        '  const run = () => {',
        '    if (flag) { promisify(wx.a)(); }',
        '    while (flag) { promisify(wx.b)(); }',
        '    const c = flag && promisify(wx.c);',
        '    const d = flag ? promisify(wx.d) : null;',
        '    const e = new Foo(promisify(wx.e));',
        '    const g = `${promisify(wx.g)}`;',
        '    return [c, d, e, g];',
        '  };',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      ['wx.a', 'wx.b', 'wx.c', 'wx.d', 'wx.e', 'wx.g'].forEach(api => {
        expect(result).toContain(`.promisify(${api})`);
      });
      expect(result).not.toMatch(bareCall('promisify'));
    });

    test('should not rewrite non-computed member/property names that look like runtime exports', () => {
      const code = [
        'import { promisify } from "@rsmax/runtime";',
        'export default function Page() {',
        '  const run = async () => {',
        '    const api = { promisify: wx.login };',
        '    return await api.promisify();',
        '  };',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('promisify: wx.login');
      expect(result).toContain('api.promisify()');
      expect(result).not.toContain('_rsmax.promisify');
    });

    test('should treat destructured parameters as bindings but rewrite default values', () => {
      const code = [
        'import { promisify } from "@rsmax/runtime";',
        'export default function Page() {',
        '  const run = ({ promisify: renamed }, [x], z = promisify(wx.getSetting)) => renamed || x || z;',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      // 解构中的 promisify 是局部绑定名，不能改写为命名空间成员（生成器可能跨行排版）
      expect(result).toMatch(/\{\s*promisify:\s*renamed\s*\}/);
      expect(result).toContain('renamed || x || z');
      // 默认值是表达式位置，必须改写
      expect(result).toContain('.promisify(wx.getSetting)');
    });

    test('should rewrite aliased require() runtime imports in nested context', () => {
      const code = [
        'const { promisify: pf } = require("@rsmax/runtime");',
        'export default function Page() {',
        '  const run = async () => await pf(wx.login)();',
        '  return null;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJS(ast, code, { type: 'page' });

      expect(result).toContain('.promisify(wx.login)');
      expect(result).not.toMatch(/\bpf\s*\(/);
      expect(result).not.toContain('@rsmax/runtime');
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
