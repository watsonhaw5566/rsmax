const { describe, test, expect } = require('@rstest/core');
const { UI_LIBRARY_PRESETS, detectInstalledLibraries, buildResolver, resolveComponents } = require('../component-resolver');

describe('component-resolver', () => {
  describe('UI_LIBRARY_PRESETS', () => {
    test('should have vant preset', () => {
      expect(UI_LIBRARY_PRESETS.van).toBeDefined();
      expect(UI_LIBRARY_PRESETS.van.packageName).toBe('@vant/weapp');
      expect(UI_LIBRARY_PRESETS.van.resolve('van-button')).toBe('@vant/weapp/button/index');
    });

    test('should have tdesign preset', () => {
      expect(UI_LIBRARY_PRESETS.t).toBeDefined();
      expect(UI_LIBRARY_PRESETS.t.packageName).toBe('tdesign-miniprogram');
      expect(UI_LIBRARY_PRESETS.t.resolve('t-button')).toBe('tdesign-miniprogram/button/button');
    });

    test('should have antd-mini preset', () => {
      expect(UI_LIBRARY_PRESETS.ant).toBeDefined();
      expect(UI_LIBRARY_PRESETS.ant.packageName).toBe('antd-mini');
      expect(UI_LIBRARY_PRESETS.ant.resolve('ant-button')).toBe('antd-mini/Button/index');
    });
  });

  describe('detectInstalledLibraries', () => {
    test('should detect installed vant', () => {
      const pkg = { dependencies: { '@vant/weapp': '^1.0.0' } };
      const installed = detectInstalledLibraries(pkg);
      expect(installed.van).toBeDefined();
      expect(installed.t).toBeUndefined();
    });

    test('should detect multiple installed libraries', () => {
      const pkg = {
        dependencies: { '@vant/weapp': '^1.0.0' },
        devDependencies: { 'tdesign-miniprogram': '^1.0.0' }
      };
      const installed = detectInstalledLibraries(pkg);
      expect(installed.van).toBeDefined();
      expect(installed.t).toBeDefined();
    });

    test('should return empty object when no UI libraries installed', () => {
      const pkg = { dependencies: { 'react': '^18.0.0' } };
      const installed = detectInstalledLibraries(pkg);
      expect(Object.keys(installed)).toHaveLength(0);
    });
  });

  describe('buildResolver', () => {
    test('should resolve components with exact tag mapping', () => {
      const config = {
        components: {
          'my-button': './components/my-button/index'
        }
      };
      const resolver = buildResolver(config, {});
      expect(resolver('my-button')).toBe('./components/my-button/index');
    });

    test('should resolve components with prefix mapping (string package)', () => {
      const config = {
        components: {
          'my': 'my-ui-lib'
        }
      };
      const resolver = buildResolver(config, {});
      expect(resolver('my-button')).toBe('my-ui-lib/button/index');
      expect(resolver('my-card')).toBe('my-ui-lib/card/index');
    });

    test('should resolve components with custom preset object', () => {
      const config = {
        components: {
          'x': {
            packageName: 'my-x-lib',
            resolve(tagName) {
              return 'my-x-lib/' + tagName.slice(2) + '/index';
            }
          }
        }
      };
      const resolver = buildResolver(config, {});
      expect(resolver('x-foo')).toBe('my-x-lib/foo/index');
    });

    test('should use auto-detected presets', () => {
      const installed = {
        van: UI_LIBRARY_PRESETS.van
      };
      const resolver = buildResolver({}, installed);
      expect(resolver('van-button')).toBe('@vant/weapp/button/index');
    });

    test('should return null for unknown tags', () => {
      const resolver = buildResolver({}, {});
      expect(resolver('unknown-component')).toBeNull();
      expect(resolver('view')).toBeNull();
    });
  });

  describe('resolveComponents', () => {
    test('should resolve a set of tags to usingComponents map', () => {
      const resolver = buildResolver({
        components: {
          'van': '@vant/weapp'
        }
      }, {});
      const tags = new Set(['van-button', 'van-cell', 'view']);
      const result = resolveComponents(tags, resolver);

      expect(result['van-button']).toBeDefined();
      expect(result['van-cell']).toBeDefined();
      expect(result['view']).toBeUndefined();
    });

    test('should return empty object for empty set', () => {
      const resolver = buildResolver({}, {});
      const result = resolveComponents(new Set(), resolver);
      expect(Object.keys(result)).toHaveLength(0);
    });
  });
});
