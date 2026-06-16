module.exports = {
  configRspack(ctx) {
    ctx.addCSSRule({
      name: 'scss',
      test: /\.scss(\?.*)?$/,
    });
  },
};
