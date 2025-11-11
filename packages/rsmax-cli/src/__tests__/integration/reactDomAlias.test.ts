import { testBuildApp } from './helpers/runTest';

describe.skip('alias react-dom module to @rsmax/runtime', () => {
  testBuildApp('reactDomAlias');
});
