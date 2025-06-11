import { testBuildApp } from './helpers/runTest';

describe.skip('customize babel config', () => {
  testBuildApp('babelrc');
  testBuildApp('babel-plugin-import');
});
