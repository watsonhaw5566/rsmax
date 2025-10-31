import { testBuildApp } from './helpers/runTest';

describe.skip('build rsmax web app', () => {
  testBuildApp('web', 'web');
});

describe.skip('build rsmax web app - multi page', () => {
  testBuildApp('web', 'web', {}, { web: { mpa: true } });
});
