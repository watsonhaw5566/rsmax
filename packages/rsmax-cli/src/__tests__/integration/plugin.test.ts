import { testBuildApp } from './helpers/runTest';

describe.skip('plugin hooks', () => {
  testBuildApp('hook-config-webpack');
  testBuildApp('hook-on-app-config');
  testBuildApp('hook-on-entries');
  testBuildApp('hook-on-page-config');
  testBuildApp('hook-on-page-template');
});
