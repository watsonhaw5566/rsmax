const { slash } = require('@rsmax/shared');
const { default: InjectPlugin, ENTRY_ORDER } = require('webpack-inject-plugin');

module.exports = () => ({
  name: 'remax-plugin-devtools',
  configWebpack({ config, webpack }) {
    let globalName;
    switch (process.env.RSMAX_PLATFORM) {
      case 'ali':
        globalName = 'my';
        break;
      case 'toutiao':
        globalName = 'tt';
        break;
      case 'wechat':
        globalName = 'wx';
        break;
      default:
        break;
    }
    config.plugin('plugin-devtools-define-plugin').use(webpack.DefinePlugin, [
      {
        __REACT_DEVTOOLS_GLOBAL_HOOK__: `${globalName}.__REACT_DEVTOOLS_GLOBAL_HOOK__`,
      },
    ]);

    config.plugin('plugin-devtools-webpack-inject-plugin').use(InjectPlugin, [
      () => `import '${slash(require.resolve('@rsmax/react-devtools-core'))}';`,
      {
        entryName: 'app',
        entryOrder: ENTRY_ORDER.First,
      },
    ]);
  },
  registerRuntimePlugin() {
    return require.resolve('./lib/runtime');
  },
});
