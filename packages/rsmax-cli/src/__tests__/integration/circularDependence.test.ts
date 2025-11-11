import { testBuildApp } from './helpers/runTest';

describe.skip('build circular dependence app', () => {
  testBuildApp('circularDependence');
});
