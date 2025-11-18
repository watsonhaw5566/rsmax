import * as babel from '@babel/core';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import app from '../src/app';

function transform(code: string, options: Parameters<typeof app>[0] = { test: () => true }) {
  return new Promise((resolve, reject) => {
    babel.transform(
      code,
      {
        plugins: [
          '@babel/plugin-syntax-jsx',
          app(options),
        ],
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

describe('app', () => {
  beforeEach(() => {
    Store.reset();
  });

  it('collects lifecycle in class component', async () => {
    await transform(`
      import * as React from 'react';

      export default class App extends React.Component {
        onShareAppMessage() {
          return {};
        }

        render() {
          return this.props.children;
        }
      }
    `);

    expect(Store.appEvents.get(slash(__filename))).toEqual(new Set(['onShareAppMessage']));
  });

  it('collects another app lifecycle in class component', async () => {
    await transform(`
      import * as React from 'react';

      export default class App extends React.Component {
        onShareTimeline() {
          return {};
        }

        render() {
          return this.props.children;
        }
      }
    `);

    expect(Store.appEvents.get(slash(__filename))).toEqual(new Set(['onShareTimeline']));
  });

  it('collects lifecycle in functional component', async () => {
    await transform(`
      export default () => {
        useAppEvent('onShareAppMessage', () => {
          return {};
        });
        return this.props.children;
      }
    `);

    expect(Store.appEvents.get(slash(__filename))).toEqual(new Set(['onShareAppMessage']));
  });

  it('does not collect stray StringLiteral', async () => {
    await transform(`
      export default () => {
        const s = 'onShareAppMessage';
        return null;
      }
    `);

    expect(Store.appEvents.get(slash(__filename))).toBeUndefined();
  });

  it('collects Identifier when name equals event (useAppEvent)', async () => {
    await transform(`
      export default () => {
        const onShareAppMessage = 'x';
        useAppEvent(onShareAppMessage, () => {});
        return null;
      }
    `);

    expect(Store.appEvents.get(slash(__filename))).toEqual(new Set(['onShareAppMessage']));
  });

  it('supports custom events via options', async () => {
    await transform(
      `
      import * as React from 'react';
      export default class App extends React.Component {
        onThemeChange() {}
        render() { return null; }
      }
    `,
      { test: () => true, events: ['onThemeChange'] }
    );

    expect(Store.appEvents.get(slash(__filename))).toEqual(new Set(['onThemeChange']));
  });

  it('skips when options.test returns false', async () => {
    await transform(
      `
      export default () => {
        useAppEvent('onShareAppMessage', () => {});
        return null;
      }
    `,
      { test: () => false }
    );

    expect(Store.appEvents.get(slash(__filename))).toBeUndefined();
  });
});
