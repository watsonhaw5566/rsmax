const { describe, test, expect } = require('@rstest/core');
const parser = require('@babel/parser');
const { transformJS, transformModule } = require('../index');

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

describe('@rsmax/babel-plugin-transform-js - define/process.env replacement', () => {
  describe('transformJS with define - process.env.XXX property access', () => {
    test('should replace process.env.STRING with string literal', () => {
      const code = 'export default { onLoad() { console.log(process.env.API_BASE); } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { API_BASE: 'https://dev.example.com' }
      });
      expect(result).toContain('https://dev.example.com');
      expect(result).not.toContain('process.env.API_BASE');
    });

    test('should replace process.env.NUMBER with numeric literal', () => {
      const code = 'export default { data: { timeout: process.env.TIMEOUT } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { TIMEOUT: 5000 }
      });
      expect(result).toContain('timeout: 5000');
      expect(result).not.toContain('process.env.TIMEOUT');
    });

    test('should replace process.env.BOOLEAN with boolean literal', () => {
      const code = 'export default { onLoad() { if (process.env.DEBUG) console.log("debug"); } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { DEBUG: true }
      });
      expect(result).toContain('if (true)');
      expect(result).not.toContain('process.env.DEBUG');
    });

    test('should replace process.env.NULL with null literal', () => {
      const code = 'export default { data: { val: process.env.NULL_VAL } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { NULL_VAL: null }
      });
      expect(result).toContain('val: null');
    });

    test('should replace process.env.UNDEFINED with undefined identifier', () => {
      const code = 'export default { data: { val: process.env.UNDEFINED_VAL } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { UNDEFINED_VAL: undefined }
      });
      expect(result).toContain('val: undefined');
    });

    test('should replace process.env.OBJECT with JSON.parse() call', () => {
      const code = 'export default { onLoad() { const cfg = process.env.FEATURES; } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { FEATURES: { enableNewUI: true, beta: false } }
      });
      expect(result).toContain('JSON.parse');
      expect(result).toContain('enableNewUI');
      expect(result).not.toContain('process.env.FEATURES');
    });

    test('should replace process.env["KEY"] bracket access with string key', () => {
      const code = "export default { onLoad() { const url = process.env['API_BASE']; } };";
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { API_BASE: 'https://example.com' }
      });
      expect(result).toContain('https://example.com');
      expect(result).not.toContain('process.env');
    });

    test('should replace NODE_ENV and MODE built-ins', () => {
      const code = 'export default { onLoad() { if (process.env.NODE_ENV === "production") return; const mode = process.env.MODE; } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { NODE_ENV: 'production', MODE: 'staging' }
      });
      expect(result).toContain('production');
      expect(result).toContain('staging');
      expect(result).not.toContain('process.env.NODE_ENV');
      expect(result).not.toContain('process.env.MODE');
    });
  });

  describe('transformJS with define - destructuring const { X } = process.env', () => {
    test('should handle destructuring from process.env', () => {
      const code = 'export default { onLoad() { const { API_BASE, DEBUG, TIMEOUT } = process.env; console.log(API_BASE, DEBUG, TIMEOUT); } };';
      const ast = parseCode(code);
      const result = transformJS(ast, code, {
        type: 'page',
        define: { API_BASE: 'https://a.com', DEBUG: true, TIMEOUT: 3000 }
      });
      expect(result).toContain('https://a.com');
      expect(result).toContain('DEBUG: true');
      expect(result).toContain('TIMEOUT: 3000');
    });
  });

  describe('transformModule (ESM->CJS) with define', () => {
    test('should replace process.env in plain ES modules', () => {
      const code = 'import { create } from "@rsmax/store";\nconst BASE = process.env.API_BASE;\nexport const counterStore = create(() => ({ base: BASE }));';
      const ast = parseCode(code);
      const result = transformModule(ast, code, {
        define: { API_BASE: 'https://store.example.com' }
      });
      expect(result).toContain('https://store.example.com');
      expect(result).not.toContain('process.env.API_BASE');
    });

    test('should replace process.env in export statements', () => {
      const code = 'export const apiBase = process.env.API_BASE;\nexport const debug = process.env.DEBUG;';
      const ast = parseCode(code);
      const result = transformModule(ast, code, {
        define: { API_BASE: 'http://x.com', DEBUG: false }
      });
      expect(result).toContain('http://x.com');
      expect(result).toContain('debug = false');
      expect(result).not.toContain('process.env.API_BASE');
      expect(result).not.toContain('process.env.DEBUG');
    });
  });
});
