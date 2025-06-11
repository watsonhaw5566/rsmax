import { testBuildApp } from './helpers/runTest';

// todo 代修复性能优化页面
describe.skip('turbo pages', () => {
  testBuildApp('turbo-pages-basic');
  testBuildApp('turbo-pages-fragment-root');
  testBuildApp('turbo-pages-picker-view');
  testBuildApp('turbo-pages-swiper');
});
