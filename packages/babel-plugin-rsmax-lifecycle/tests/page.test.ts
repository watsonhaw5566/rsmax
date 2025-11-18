import * as babel from '@babel/core';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import page from '../src/page';

function transform(code: string, options: Parameters<typeof page>[0] = { test: () => true }) {
  return new Promise((resolve, reject) => {
    babel.transform(
      code,
      {
        plugins: [page(options)],
        filename: __filename,
      },
      function (err, result) {
        if (result) {
          return resolve(result.code);
        }
        reject(err);
      }
    );
  });
}

describe('page', () => {
  beforeEach(() => {
    Store.reset();
  });

  it('collects lifecycle in class component', async () => {
    await transform(`
      import * as React from 'react';

      export default class Page extends React.Component {
        onShareAppMessage() {
          return {};
        }

        onPageScroll() {

        }

        render() {
          return this.props.children;
        }
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onPageScroll', 'onShareAppMessage']));
  });

  it('collects another page lifecycle in class component', async () => {
    await transform(`
      import * as React from 'react';

      export default class Page extends React.Component {
        onShareTimeline() {}
        render() { return null; }
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onShareTimeline']));
  });

  it('collects lifecycle in functional component', async () => {
    await transform(`
      export default () => {
        useAppEvent('onShareAppMessage', () => {
          return {};
        });

        useAppEvent('onPageScroll', () => {
          return {};
        });

        return this.props.children;
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onPageScroll', 'onShareAppMessage']));
  });

  it('collects lifecycle via usePageEvent', async () => {
    await transform(`
      export default () => {
        usePageEvent('onPageScroll', () => {});
        usePageEvent('onShareAppMessage', () => {});
        return null;
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onPageScroll', 'onShareAppMessage']));
  });

  it('does not collect stray StringLiteral', async () => {
    await transform(`
      export default () => {
        const s = 'onPageScroll';
        return null;
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toBeUndefined();
  });

  it('collects Identifier when name equals event (usePageEvent)', async () => {
    await transform(`
      export default () => {
        const onPageScroll = 'x';
        usePageEvent(onPageScroll, () => {});
        return null;
      }
    `);

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onPageScroll']));
  });

  it('supports custom events via options', async () => {
    await transform(
      `
      import * as React from 'react';
      export default class Page extends React.Component {
        onShow() {}
        render() { return null; }
      }
    `,
      { test: () => true, events: ['onShow'] }
    );

    expect(Store.pageEvents.get(slash(__filename))).toEqual(new Set(['onShow']));
  });

  it('skips when options.test returns false', async () => {
    await transform(
      `
      export default () => {
        usePageEvent('onPageScroll', () => {});
        return null;
      }
    `,
    { test: () => false }
    );

    expect(Store.pageEvents.get(slash(__filename))).toBeUndefined();
  });
});
