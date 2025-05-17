const path = require('path');
const less = require('@rsmax/plugin-less');

module.exports = {
  port: 3001,
  output: process.env.RSMAX_PLATFORM === 'web' ? 'dist/webng' : 'build/src',
  plugins: [less()],
  configWebpack({ config }) {
    if (process.env.RSMAX_PLATFORM === 'web') {
      config.output.publicPath('/');
    }
  },
  turboRenders: !!process.env.TURBO_RENDERS,
  web: {
    mpa: !!process.env.MPA,
  },
};
