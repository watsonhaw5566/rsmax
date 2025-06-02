/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Plugin creator
  return {
    postcssPlugin: 'postcss-rsmax-tag',

    /**
     * Process all rules in the CSS file
     */
    Rule(rule) {
      // Check if the rule selector is 'page'
      if (rule.selector === 'page') {
        // Transform 'page' selector to '.remax-page'
        rule.selector = '.rsmax-page';

        // Show warning only once per file
        if (!rule.warn) {
          console.warn(
            '如果要兼容 web 应用，请不要在样式中使用 page 选择器，具体请参考 https://remaxjs.org/guide/one/web#样式'
          );
          rule.warn = true;
        }
      }
    }
  };
};

module.exports.postcss = true;
