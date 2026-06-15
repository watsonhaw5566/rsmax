import { testBuildApp } from './helpers/runTest';

describe('css modules', () => {
  testBuildApp('css-modules', 'ali');
});

describe('css modules in toutiao', () => {
  testBuildApp('css-modules', 'toutiao');
});

describe('css modules in wechat', () => {
  testBuildApp('css-modules', 'wechat');
});
