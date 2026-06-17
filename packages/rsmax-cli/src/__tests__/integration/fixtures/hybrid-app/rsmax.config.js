const less = () => ({
  configRspack({ config, addCSSRule }) {
    addCSSRule({
      name: 'less',
      test: /\.less(\?.*)?$/,
      loader: require.resolve('less-loader'),
    });
  },
});

module.exports = {
  plugins: [less()],
};
