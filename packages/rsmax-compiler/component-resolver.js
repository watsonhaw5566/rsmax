const fs = require('fs-extra');
const path = require('node:path');

// Helper: kebab-case to PascalCase (button -> Button, image-upload -> ImageUpload)
function toPascalCase(str) {
  return str.split('-').map(seg => seg.charAt(0).toUpperCase() + seg.slice(1)).join('');
}

// Built-in UI library presets: tag prefix -> { packageName, resolve(tagName) }
const UI_LIBRARY_PRESETS = {
  'van': {
    packageName: '@vant/weapp',
    resolve(tagName) {
      // van-button -> @vant/weapp/button/index
      const compName = tagName.replace(/^van-/, '');
      return `${this.packageName}/${compName}/index`;
    }
  },
  't': {
    packageName: 'tdesign-miniprogram',
    resolve(tagName) {
      // t-button -> tdesign-miniprogram/button/button
      const compName = tagName.replace(/^t-/, '');
      return `${this.packageName}/${compName}/${compName}`;
    }
  },
  'ant': {
    packageName: 'antd-mini',
    resolve(tagName) {
      // ant-button -> antd-mini/Button/index
      const compName = tagName.replace(/^ant-/, '');
      return `${this.packageName}/${toPascalCase(compName)}/index`;
    }
  }
};

/**
 * Parse rsmax.config.js from project root if it exists.
 * Supported config shape:
 *   module.exports = {
 *     components: {
 *       // map tag prefix to npm package name (uses default resolver)
 *       'my': 'my-ui-lib',
 *       // or provide a custom resolver function/object
 *       'x': {
 *         packageName: 'my-x-lib',
 *         resolve(tagName) { return `my-x-lib/${tagName.slice(2)}/index`; }
 *       },
 *       // map specific tag names directly
 *       'custom-tag': 'path/to/custom/tag/index'
 *     }
 *   }
 */
async function loadProjectConfig(projectRoot) {
  const configPath = path.join(projectRoot, 'rsmax.config.js');
  if (!await fs.pathExists(configPath)) {
    return {};
  }
  try {
    delete require.cache[require.resolve(configPath)];
    return require(configPath) || {};
  } catch (err) {
    console.warn('[rsmax] Failed to load rsmax.config.js:', err.message);
    return {};
  }
}

/**
 * Detect which UI library presets are actually installed
 * by checking package.json dependencies.
 */
function detectInstalledLibraries(packageJson) {
  const deps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };
  const installed = {};
  for (const [prefix, preset] of Object.entries(UI_LIBRARY_PRESETS)) {
    if (deps[preset.packageName]) {
      installed[prefix] = preset;
    }
  }
  return installed;
}

/**
 * Build a resolver function that maps tag names to component paths.
 * Priority:
 *   1. Exact tag match in config.components (direct path)
 *   2. Prefix match in config.components (custom preset)
 *   3. Auto-detected built-in presets (vant/tdesign)
 */
function buildResolver(config, installedPresets) {
  const customComponents = (config && config.components) || {};
  const prefixMap = {};
  const exactMap = {};

  for (const [key, value] of Object.entries(customComponents)) {
    if (key.includes('-')) {
      // Exact tag name mapping (e.g. 'custom-tag': 'path/to/component')
      exactMap[key] = value;
    } else {
      // Prefix mapping (e.g. 'my': 'my-lib' or 'my': { packageName, resolve })
      if (typeof value === 'string') {
        prefixMap[key] = {
          packageName: value,
          resolve(tagName) {
            const compName = tagName.slice(key.length + 1);
            return `${value}/${compName}/index`;
          }
        };
      } else if (value && typeof value === 'object') {
        prefixMap[key] = value;
      }
    }
  }

  // Merge auto-detected presets (lower priority than user config)
  const allPrefixes = { ...installedPresets, ...prefixMap };

  return function resolveComponent(tagName) {
    // 1. Exact match
    if (exactMap[tagName]) {
      return exactMap[tagName];
    }

    // 2. Prefix match
    const dashIdx = tagName.indexOf('-');
    if (dashIdx > 0) {
      const prefix = tagName.substring(0, dashIdx);
      const preset = allPrefixes[prefix];
      if (preset && typeof preset.resolve === 'function') {
        return preset.resolve(tagName);
      }
    }

    return null;
  };
}

/**
 * Resolve a Set of tag names to usingComponents map.
 * Returns { 'van-button': '@vant/weapp/button/index', ... }
 */
function resolveComponents(tagNames, resolver) {
  const usingComponents = {};
  for (const tag of tagNames) {
    const compPath = resolver(tag);
    if (compPath) {
      usingComponents[tag] = compPath;
    }
  }
  return usingComponents;
}

module.exports = {
  UI_LIBRARY_PRESETS,
  loadProjectConfig,
  detectInstalledLibraries,
  buildResolver,
  resolveComponents
};
