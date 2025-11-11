import { testBuildApp } from './helpers/runTest';

describe('build mini app', () => {
  testBuildApp('ali');
  testBuildApp('toutiao', 'toutiao');
  testBuildApp('resolve-platform-ext');
  testBuildApp('component-recursion');
  testBuildApp('wechat-include', 'wechat');
});
