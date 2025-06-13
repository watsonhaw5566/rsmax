import { testBuildApp } from './helpers/runTest';
import path from 'node:path';

describe.skip('build rsmax web app', () => {
  testBuildApp('web', 'web');
});

describe.skip('build rsmax web app - multi page', () => {
  testBuildApp('web', 'web', path.resolve(__dirname, `./fixtures/web/expected-multi`), {}, { web: { mpa: true } });
});
