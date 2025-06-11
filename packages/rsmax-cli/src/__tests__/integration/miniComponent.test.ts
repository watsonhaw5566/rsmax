import { testBuildMiniComponent } from './helpers/runTest';

// todo 待修复小程序组件编译问题
describe.skip('mini component build', function () {
  testBuildMiniComponent(
    'mini-component-basic',
    {
      greet: 'components/greet/index',
      greet2: 'components/greet2/index',
    },
    ['ali', 'wechat']
  );
});
