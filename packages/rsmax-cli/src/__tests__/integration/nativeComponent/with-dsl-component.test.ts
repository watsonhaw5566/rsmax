import { testBuildApp } from '../helpers/runTest';

describe.skip('use native components in ali app', () => {
  testBuildApp('with-dsl-component', 'ali');
});
