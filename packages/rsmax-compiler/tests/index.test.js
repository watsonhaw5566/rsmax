const { describe, test, expect } = require('@rstest/core');
const parser = require('@babel/parser');
const path = require('node:path');
const os = require('node:os');
const fs = require('fs-extra');
const {
  parseFile,
  extractWxml,
  transformJsCode,
  calculateRuntimePath,
  calculateStorePath,
  calculateStoreMiddlewarePath,
  calculateI18nPath,
  getFileType,
  isModuleFile,
  isStyleFile
} = require('../index');

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

describe('rsmax-compiler', () => {
  describe('path calculations', () => {
    test('calculateRuntimePath should return correct relative path', () => {
      expect(calculateRuntimePath('/project/dist', '/project/dist')).toBe('./rsmax-runtime.js');
      expect(calculateRuntimePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-runtime.js');
      expect(calculateRuntimePath('/project/dist/pages/home', '/project/dist')).toBe('../../rsmax-runtime.js');
    });

    test('calculateStorePath should return correct relative path', () => {
      expect(calculateStorePath('/project/dist', '/project/dist')).toBe('./rsmax-store.js');
      expect(calculateStorePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-store.js');
    });

    test('calculateStoreMiddlewarePath should return correct relative path', () => {
      expect(calculateStoreMiddlewarePath('/project/dist', '/project/dist')).toBe('./rsmax-store-middleware.js');
      expect(calculateStoreMiddlewarePath('/project/dist/pages', '/project/dist')).toBe('../rsmax-store-middleware.js');
    });

    test('calculateI18nPath should return correct relative path', () => {
      expect(calculateI18nPath('/project/dist', '/project/dist')).toBe('./rsmax-i18n.js');
      expect(calculateI18nPath('/project/dist/pages', '/project/dist')).toBe('../rsmax-i18n.js');
      expect(calculateI18nPath('/project/dist/pages/home', '/project/dist')).toBe('../../rsmax-i18n.js');
    });
  });

  describe('getFileType', () => {
    test('should detect app files', () => {
      expect(getFileType('/project/src/app.js')).toBe('app');
      expect(getFileType('/project/src/app.jsx')).toBe('app');
    });

    test('should detect component files in components directory', () => {
      expect(getFileType('/project/src/components/button/index.js')).toBe('component');
      expect(getFileType('/project/src/components/MyComponent.jsx')).toBe('component');
    });

    test('should detect page files', () => {
      expect(getFileType('/project/src/pages/index/index.js')).toBe('page');
      expect(getFileType('/project/src/home.jsx')).toBe('page');
    });
  });

  describe('isModuleFile and isStyleFile (re-exported)', () => {
    test('should identify module files', () => {
      expect(isModuleFile('styles.module.css')).toBe(true);
      expect(isModuleFile('styles.css')).toBe(false);
    });

    test('should identify style files', () => {
      expect(isStyleFile('styles.css')).toBe(true);
      expect(isStyleFile('app.wxss')).toBe(true);
      expect(isStyleFile('index.js')).toBe(false);
    });
  });

  describe('extractWxml', () => {
    test('should extract wxml from JSX code', () => {
      const code = 'export default { render() { return <view class="container"><text>Hello</text></view>; } }';
      const ast = parseCode(code);
      const result = extractWxml(ast, code);

      expect(result.wxml).toContain('<view');
      expect(result.wxml).toContain('class="container"');
      expect(result.wxml).toContain('<text>Hello</text>');
      expect(result.components).toBeDefined();
    });

    test('should handle functional component', () => {
      const code = 'export default () => <view>Functional</view>;';
      const ast = parseCode(code);
      const result = extractWxml(ast, code);

      expect(result.wxml).toContain('<view>Functional</view>');
    });
  });

  describe('transformJsCode', () => {
    test('should transform object component to Page call', () => {
      const code = 'export default { data: { count: 0 } };';
      const ast = parseCode(code);
      const result = transformJsCode(ast, code, 'page', { runtimePath: './rsmax-runtime.js' });

      expect(result).toContain('Page(');
      expect(result).toContain('data:');
    });

    test('should rewrite @rsmax/i18n imports when i18nPath is provided', () => {
      const code = [
        'import { useI18n, t } from "@rsmax/i18n";',
        'export default function Index() {',
        '  const { t: i18nT } = useI18n();',
        '  return <view>{t("hello")}</view>;',
        '}'
      ].join('\n');
      const ast = parseCode(code);
      const result = transformJsCode(ast, code, 'page', {
        runtimePath: './rsmax-runtime.js',
        i18nPath: './rsmax-i18n.js'
      });

      expect(result).toContain('./rsmax-i18n.js');
      expect(result).not.toContain('@rsmax/i18n');
    });
  });

  describe('parseFile', () => {
    test('should parse a JS file', async () => {
      const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rsmax-test-'));
      const tmpFile = path.join(tmpDir, 'test.js');
      await fs.writeFile(tmpFile, 'export default { data: { count: 0 } };', 'utf-8');

      try {
        const { ast, code } = await parseFile(tmpFile);
        expect(ast).toBeDefined();
        expect(code).toContain('export default');
      } finally {
        await fs.remove(tmpDir);
      }
    });
  });
});
