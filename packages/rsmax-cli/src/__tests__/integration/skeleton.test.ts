import { buildApp, JEST_BUILD_TIMEOUT } from './helpers/build';
import Store from '@rsmax/build-store';

describe('wechat skeleton integration', () => {
  it(
    'injects skeleton import and merges skeleton css',
    async () => {
      Store.reset();
      const output = await buildApp('wechat-skeleton', 'wechat');
      const wxml = output.find(f => /pages\/index\.wxml$/.test(f.fileName))!;
      const wxss = output.find(f => /pages\/index\.wxss$/.test(f.fileName));

      const wxmlText = wxml.code.toString();
      const wxssText = wxss?.code.toString();

      expect(wxmlText).toContain('<import src="./page.skeleton.wxml" />');
      expect(wxmlText).toContain('<template is="skeleton" wx:if="{{root.children.length === 0}}" />');
      if (wxssText) {
        expect(wxssText).toContain('/* skeleton */');
        expect(wxssText).toContain('.sk { background: #eee; height: 100rpx; }');
      }
    },
    JEST_BUILD_TIMEOUT
  );
});