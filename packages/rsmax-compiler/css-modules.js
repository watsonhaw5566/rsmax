const crypto = require('node:crypto');
const postcss = require('postcss');

const MODULE_EXT_PATTERN = /\.module\.(css|less|scss|sass)$/;
const STYLE_EXT_PATTERN = /\.(css|less|scss|sass|wxss)$/;

function isModuleFile(filePath) {
  return MODULE_EXT_PATTERN.test(filePath);
}

function isStyleFile(filePath) {
  return STYLE_EXT_PATTERN.test(filePath);
}

function generateScopedName(localName, filePath) {
  const hash = crypto.createHash('md5')
    .update(filePath + ':' + localName)
    .digest('base64')
    .replace(/[^a-zA-Z0-9]/g, '')
    .substring(0, 5);
  return `${localName}__${hash}`;
}

function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function cssModulesPlugin(classNamesMap, filePath) {
  return {
    postcssPlugin: 'rsmax-css-modules',
    Rule(rule) {
      if (!rule.selector) return;
      if (rule.parent && rule.parent.type === 'atrule' && /keyframes/.test(rule.parent.name)) return;

      rule.selector = rule.selector.replace(/\.([a-zA-Z_][\w-]*)/g, (match, className) => {
        if (!Object.prototype.hasOwnProperty.call(classNamesMap, className)) {
          const scoped = generateScopedName(className, filePath);
          classNamesMap[className] = scoped;
          // Also expose camelCase version for kebab-case class names
          const camelName = toCamelCase(className);
          if (camelName !== className) {
            classNamesMap[camelName] = scoped;
          }
        }
        return '.' + classNamesMap[className];
      });
    }
  };
}

cssModulesPlugin.postcss = true;

async function processStyle(sourcePath, sourceCode, options = {}) {
  const fs = require('fs-extra');
  const path = require('path');
  const ext = options.ext || (sourcePath ? sourcePath.substring(sourcePath.lastIndexOf('.')) : '.css');
  const useModules = options.modules || (sourcePath ? isModuleFile(sourcePath) : false);

  let css = sourceCode;
  if (css === undefined && sourcePath) {
    css = await fs.readFile(sourcePath, 'utf-8');
  }

  if (ext === '.less') {
    const less = require('less');
    const result = await less.render(css, {
      filename: sourcePath,
      javascriptEnabled: true
    });
    css = result.css;
  } else if (ext === '.scss' || ext === '.sass') {
    const sass = require('sass');
    if (sourcePath) {
      const result = sass.compile(sourcePath, {
        indentedSyntax: ext === '.sass',
        loadPaths: [path.dirname(sourcePath)]
      });
      css = result.css;
    }
  }

  const postcssPlugins = [];
  const classNames = {};

  if (useModules) {
    postcssPlugins.push(cssModulesPlugin(classNames, sourcePath || 'inline'));
  }

  const px2units = require('@rsmax/postcss-px2units');
  postcssPlugins.push(px2units({
    multiple: 1,
    divisor: 1,
    decimalPlaces: 2,
    targetUnits: 'rpx'
  }));

  const result = await postcss(postcssPlugins).process(css, { from: sourcePath });

  return {
    css: result.css,
    classNames: useModules ? classNames : null
  };
}

module.exports = {
  isModuleFile,
  isStyleFile,
  generateScopedName,
  processStyle,
  cssModulesPlugin,
  MODULE_EXT_PATTERN,
  STYLE_EXT_PATTERN
};
