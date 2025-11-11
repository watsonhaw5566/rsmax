import { testBuildApp } from './helpers/runTest';

describe.skip('runtime plugin', () => {
  testBuildApp('runtime-plugin');
  testBuildApp('runtime-plugin-with-jsx');
});
