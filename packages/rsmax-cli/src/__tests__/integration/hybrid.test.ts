import { testBuildApp, testBuildMiniPlugin } from './helpers/runTest';

describe.skip('hybrid', () => {
  testBuildApp('hybrid-app');
  testBuildMiniPlugin('hybrid-mini-plugin');
});
