module.exports = (opts) => (root) => {
  checkOpts(opts);
  return {
    postcssPlugin: 'postcss-rsmax-tag-plugin',
    Once(root) {
      let warned = false;
      if (rule.selector === 'page') {
        if (!warned) {
          console.warn(
            '如果要兼容 web 应用，请不要在样式中使用 page 选择器，具体请参考 https://remaxjs.org/guide/one/web#样式',
          );

          warned = true;
        }
        rule.selector = '.remax-page';
      }
    },
  };
};
module.exports.postcss = true;
