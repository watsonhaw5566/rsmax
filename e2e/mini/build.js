const { buildMini } = require('@rsmax/cli');

process.env.NODE_ENV = 'development';

buildMini({
  cwd: process.cwd(),
  target: ['wechat', 'ali', 'toutiao'],
  output: 'dist',
  rootDir: './src',
  pxToRpx: true,
  minimize: false,
  watch: true,
});
