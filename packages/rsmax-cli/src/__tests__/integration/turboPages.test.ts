import { testBuildApp } from './helpers/runTest';

// todo 移除 turbo pages
describe.skip('turbo pages', () => {
  testBuildApp('turbo-pages-basic');
  testBuildApp('turbo-pages-fragment-root');
  testBuildApp('turbo-pages-picker-view');
  testBuildApp('turbo-pages-swiper');
});
