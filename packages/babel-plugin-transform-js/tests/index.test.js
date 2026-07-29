const { test, expect, describe } = require('@rstest/core');
const parser = require('@babel/parser');
const { transformJS } = require('../index');

function parse(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

function transform(code, type = 'page', runtimePath = './rsmax-runtime.js') {
  const ast = parse(code);
  return transformJS(ast, code, type, runtimePath);
}

describe('@rsmax/babel-plugin-transform-js', () => {
  describe('class component transformation', () => {
    test('should transform class to Page() call for page type', () => {
      const code = `
export default class Index {
  data = { message: 'Hello' }
  onLoad() {}
}
      `;
      const result = transform(code, 'page');
      expect(result).toContain('Page(');
      expect(result).toContain('data:');
      expect(result).toContain("message: 'Hello'");
      expect(result).toContain('onLoad: function');
    });

    test('should transform class to Component() call for component type', () => {
      const code = `
export default class MyComponent extends Component {
  properties = {}
  attached() {}
}
      `;
      const result = transform(code, 'component');
      expect(result).toContain('Component(');
    });

    test('should transform class to App() call for app type', () => {
      const code = `
export default class App extends App {
  onLaunch() {}
}
      `;
      const result = transform(code, 'app');
      expect(result).toContain('App(');
    });

    test('should transform class with methods', () => {
      const code = `
export default class Index {
  data = { count: 0 }
  handleTap() {
    this.setData({ count: this.data.count + 1 })
  }
}
      `;
      const result = transform(code);
      expect(result).toContain('handleTap: function');
    });

    test('should skip render method in class', () => {
      const code = `
export default class Index {
  render() { return <view>Hello</view> }
}
      `;
      const result = transform(code);
      expect(result).not.toContain('render:');
    });

    test('should add empty data if no data defined', () => {
      const code = `
export default class Index {
  onLoad() {}
}
      `;
      const result = transform(code);
      expect(result).toContain('data: {}');
    });
  });

  describe('object config transformation', () => {
    test('should transform object to Page() call', () => {
      const code = `
export default {
  data: { msg: 'Hi' },
  onLoad() {}
}
      `;
      const result = transform(code);
      expect(result).toContain('Page(');
      expect(result).toContain("msg: 'Hi'");
    });

    test('should skip render in object config', () => {
      const code = `
export default {
  data: {},
  render() { return <view/> }
}
      `;
      const result = transform(code);
      expect(result).not.toContain('render:');
    });

    test('should transform arrow function properties', () => {
      const code = `
export default {
  data: {},
  handleTap: () => { console.log('tap') }
}
      `;
      const result = transform(code);
      expect(result).toContain('handleTap: function');
    });
  });

  describe('functional component with hooks', () => {
    test('should require runtime', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function Index() {
  const [count, setCount] = useState(0);
  return <view>{count}</view>
}
      `;
      const result = transform(code);
      expect(result).toContain('require(');
      expect(result).toContain('./rsmax-runtime.js');
    });

    test('should wrap in Page() call', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function Index() {
  const [count, setCount] = useState(0);
  return <view>{count}</view>
}
      `;
      const result = transform(code);
      expect(result).toContain('Page(');
      expect(result).toContain('createPage');
    });

    test('should include initial state in data', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function Index() {
  const [count] = useState(0);
  return <view>{count}</view>
}
      `;
      const result = transform(code);
      expect(result).toContain('count: 0');
    });

    test('should transform useState calls to use runtime', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function() {
  const [count, setCount] = useState(0);
  return <view onClick={() => setCount(count + 1)}>{count}</view>
}
      `;
      const result = transform(code);
      expect(result).toContain('.useState');
      expect(result).toContain('"count"');
    });

    test('should transform functional component for Component type', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function MyComp() {
  const [val] = useState('');
  return <input value={val} />
}
      `;
      const result = transform(code, 'component');
      expect(result).toContain('Component(');
      expect(result).toContain('createComponent');
    });

    test('should transform functional component for App type', () => {
      const code = `
import { useAppEvent } from '@rsmax/runtime';
export default function App() {
  useAppEvent('onShow', () => {});
  return null;
}
      `;
      const result = transform(code, 'app');
      expect(result).toContain('App(');
      expect(result).toContain('createApp');
    });

    test('should remove JSX return statement', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function() {
  const [count] = useState(0);
  return <view>{count}</view>;
}
      `;
      const result = transform(code);
      expect(result).not.toContain('<view');
    });

    test('should use custom runtimePath', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default function() { return <view/> }
      `;
      const result = transform(code, 'page', '../../rsmax-runtime.js');
      expect(result).toContain('../../rsmax-runtime.js');
    });
  });

  describe('import handling', () => {
    test('should remove @rsmax/runtime import', () => {
      const code = `
import { useState, useEffect } from '@rsmax/runtime';
export default {}
      `;
      const result = transform(code);
      expect(result).not.toContain('@rsmax/runtime');
    });

    test('should handle require() of @rsmax/runtime', () => {
      const code = `
const { useState } = require('@rsmax/runtime');
export default {}
      `;
      const result = transform(code);
      expect(result).not.toContain("require('@rsmax/runtime')");
    });

    test('should convert default import from npm package to require()', () => {
      const code = `
import dayjs from 'dayjs';
export default function Index() {
  const now = dayjs().format('YYYY-MM-DD');
  return <text>{now}</text>;
}
      `;
      const result = transform(code);
      expect(result).toContain('var dayjs = require(');
      expect(result).toContain('dayjs');
      expect(result).toContain("require(\"dayjs\")");
    });

    test('should convert named imports from npm package to require()', () => {
      const code = `
import { format, parse } from 'some-lib';
export default {}
      `;
      const result = transform(code);
      expect(result).toContain('require(');
      expect(result).toContain('some-lib');
      expect(result).toContain('.format');
      expect(result).toContain('.parse');
    });

    test('should convert namespace import to require()', () => {
      const code = `
import * as lib from 'some-lib';
export default {}
      `;
      const result = transform(code);
      expect(result).toContain('var lib = require("some-lib")');
    });

    test('should convert side-effect import to require() call', () => {
      const code = `
import 'some-polyfill';
export default {}
      `;
      const result = transform(code);
      expect(result).toContain('require("some-polyfill")');
    });

    test('should convert mixed default and named imports', () => {
      const code = `
import dayjs, { isDayjs } from 'dayjs';
export default function Index() {
  return <text>{isDayjs(dayjs()) ? 'yes' : 'no'}</text>;
}
      `;
      const result = transform(code);
      expect(result).toContain('var dayjs = require("dayjs")');
      expect(result).toContain('.isDayjs');
    });
  });

  describe('arrow function component', () => {
    test('should transform arrow function component', () => {
      const code = `
import { useState } from '@rsmax/runtime';
export default () => {
  const [x] = useState(1);
  return <text>{x}</text>;
}
      `;
      const result = transform(code);
      expect(result).toContain('Page(');
      expect(result).toContain('x: 1');
    });
  });
});
