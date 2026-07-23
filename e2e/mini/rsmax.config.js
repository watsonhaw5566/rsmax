// @ts-check
const { defineConfig } = require('rsmax');

module.exports = defineConfig({
  target: 'wechat',
  rootDir: 'src',
  output: 'dist',
  pxToRpx: true,
  progress: true,
  debug: false,
  renderer: 'classic',
  type: 'miniapp',
  plugins: [],
});
