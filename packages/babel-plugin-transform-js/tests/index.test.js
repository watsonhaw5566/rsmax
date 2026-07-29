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

      expect(result).toContain('var utils = require');
      expect(result).toContain('./utils');
      expect(result).toContain('helper');
      expect(result).toContain('./helper');
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
