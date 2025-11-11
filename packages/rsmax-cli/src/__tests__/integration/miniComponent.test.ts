import { testBuildMiniComponent } from './helpers/runTest';

describe.skip('mini component build', function () {
  testBuildMiniComponent(
    'mini-component-basic',
    {
      greet: 'components/greet/index',
      greet2: 'components/greet2/index',
    },
    ['wechat']
  );
});
