const { describe, test, expect } = require('@rstest/core');
const { isModuleFile, isStyleFile, generateScopedName, MODULE_EXT_PATTERN, STYLE_EXT_PATTERN } = require('../css-modules');

describe('css-modules', () => {
  describe('isModuleFile', () => {
    test('should identify module CSS files', () => {
      expect(isModuleFile('styles.module.css')).toBe(true);
      expect(isModuleFile('button.module.less')).toBe(true);
      expect(isModuleFile('form.module.scss')).toBe(true);
      expect(isModuleFile('nav.module.sass')).toBe(true);
    });

    test('should return false for non-module style files', () => {
      expect(isModuleFile('styles.css')).toBe(false);
      expect(isModuleFile('app.wxss')).toBe(false);
      expect(isModuleFile('button.less')).toBe(false);
    });

    test('should return false for non-style files', () => {
      expect(isModuleFile('index.js')).toBe(false);
      expect(isModuleFile('config.json')).toBe(false);
    });
  });

  describe('isStyleFile', () => {
    test('should identify style files', () => {
      expect(isStyleFile('styles.css')).toBe(true);
      expect(isStyleFile('app.wxss')).toBe(true);
      expect(isStyleFile('button.less')).toBe(true);
      expect(isStyleFile('form.scss')).toBe(true);
      expect(isStyleFile('nav.sass')).toBe(true);
      expect(isStyleFile('styles.module.css')).toBe(true);
    });

    test('should return false for non-style files', () => {
      expect(isStyleFile('index.js')).toBe(false);
      expect(isStyleFile('config.json')).toBe(false);
      expect(isStyleFile('component.wxml')).toBe(false);
    });
  });

  describe('generateScopedName', () => {
    test('should generate scoped class name with hash', () => {
      const name = generateScopedName('container', '/path/to/styles.module.css');
      expect(name).toMatch(/^container__[a-zA-Z0-9]{5}$/);
    });

    test('should generate same name for same input', () => {
      const name1 = generateScopedName('container', '/path/to/styles.module.css');
      const name2 = generateScopedName('container', '/path/to/styles.module.css');
      expect(name1).toBe(name2);
    });

    test('should generate different names for different files', () => {
      const name1 = generateScopedName('container', '/path/to/file1.module.css');
      const name2 = generateScopedName('container', '/path/to/file2.module.css');
      expect(name1).not.toBe(name2);
    });

    test('should generate different names for different classes', () => {
      const name1 = generateScopedName('container', '/path/to/styles.module.css');
      const name2 = generateScopedName('button', '/path/to/styles.module.css');
      expect(name1).not.toBe(name2);
    });
  });

  describe('constants', () => {
    test('MODULE_EXT_PATTERN should match module files', () => {
      expect(MODULE_EXT_PATTERN.test('test.module.css')).toBe(true);
      expect(MODULE_EXT_PATTERN.test('test.module.less')).toBe(true);
      expect(MODULE_EXT_PATTERN.test('test.css')).toBe(false);
    });

    test('STYLE_EXT_PATTERN should match style files', () => {
      expect(STYLE_EXT_PATTERN.test('test.css')).toBe(true);
      expect(STYLE_EXT_PATTERN.test('test.less')).toBe(true);
      expect(STYLE_EXT_PATTERN.test('test.scss')).toBe(true);
      expect(STYLE_EXT_PATTERN.test('test.sass')).toBe(true);
      expect(STYLE_EXT_PATTERN.test('test.wxss')).toBe(true);
      expect(STYLE_EXT_PATTERN.test('test.js')).toBe(false);
    });
  });
});
