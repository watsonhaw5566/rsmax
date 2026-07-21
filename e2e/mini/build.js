const { buildMini } = require('@rsmax/cli');

buildMini({
  cwd: process.cwd(),
  target: ['wechat', 'ali', 'toutiao'],
  output: 'dist',
  rootDir: './src',
  pxToRpx: true,
  minimize: false,
});
