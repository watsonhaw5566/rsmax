const { buildMini } = require('@rsmax/cli');
const API = require('@rsmax/cli/lib/API').default;

const api = new API();

process.env.NODE_ENV = 'development';

buildMini(api, {
  cwd: process.cwd(),
  target: 'wechat',
  output: 'dist',
  rootDir: './src',
  pxToRpx: true,
});
