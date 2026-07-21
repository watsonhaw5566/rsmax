const { buildMini } = require('rsmax/build');

buildMini({
  cwd: process.cwd(),
  target: ['wechat', 'ali', 'toutiao'],
  output: 'dist',
  rootDir: './src',
  pxToRpx: true,
  minimize: false,
});
