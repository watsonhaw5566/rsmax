import { testBuildApp } from './helpers/runTest';

describe.skip('hybrid', () => {
  testBuildApp('hybrid-app');
  // todo 待修复小程序混合组件
  // testBuildMiniPlugin('hybrid-mini-plugin');
});
