const { test, expect, describe } = require('@rstest/core');
const parser = require('@babel/parser');
const { jsxToWxml } = require('../index');
const { EVENT_MAP, WX_VOID_TAGS } = require('../utils');

function parse(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'classProperties']
  });
}

function getWxml(code) {
  const ast = parse(code);
  return jsxToWxml(ast, code);
}

describe('@rsmax/babel-plugin-jsx-to-wxml', () => {
  describe('basic elements', () => {
    test('should convert simple view element', () => {
      const code = `export default function() { return <view class="container">Hello</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('<view class="container">Hello</view>');
    });

    test('should convert text element inline', () => {
      const code = `export default function() { return <text>Hello World</text> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('<text>Hello World</text>');
    });

    test('should handle nested elements with indentation', () => {
      const code = `
export default function() {
  return (
    <view class="container">
      <view class="header">
        <text>Title</text>
      </view>
    </view>
  )
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('<view class="container">');
      expect(wxml).toContain('<view class="header">');
      expect(wxml).toContain('<text>Title</text>');
    });

    test('should handle self-closing void tags', () => {
      const code = `export default function() { return <input type="text" /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('<input');
      expect(wxml).toContain('/>');
    });
  });

  describe('class component render', () => {
    test('should find JSX in class render method', () => {
      const code = `
export default class Index {
  render() {
    return <view class="page">Page Content</view>
  }
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('<view class="page">Page Content</view>');
    });
  });

  describe('object config render', () => {
    test('should find JSX in object render method', () => {
      const code = `
export default {
  render() {
    return <view>Object Render</view>
  }
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('<view>Object Render</view>');
    });
  });

  describe('arrow function component', () => {
    test('should handle implicit return arrow function', () => {
      const code = `export default () => <view>Arrow</view>`;
      const wxml = getWxml(code);
      expect(wxml).toContain('<view>Arrow</view>');
    });
  });

  describe('event handling', () => {
    test('should convert onClick to bindtap', () => {
      const code = `export default function() { return <button onClick={this.handleClick}>Click</button> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('bindtap="handleClick"');
    });

    test('should convert onTap to bindtap', () => {
      const code = `export default function() { return <view onTap="tapHandler">Tap</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('bindtap="tapHandler"');
    });

    test('should convert onInput to bindinput', () => {
      const code = `export default function() { return <input onInput={this.onInput} /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('bindinput="onInput"');
    });

    test('should convert onChange to bindchange', () => {
      const code = `export default function() { return <input onChange={this.onChange} /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('bindchange="onChange"');
    });

    test('should convert onSubmit to bindsubmit', () => {
      const code = `export default function() { return <form onSubmit={this.handleSubmit}></form> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('bindsubmit="handleSubmit"');
    });

    test('should have correct event map', () => {
      expect(EVENT_MAP.onClick).toBe('bindtap');
      expect(EVENT_MAP.onInput).toBe('bindinput');
      expect(EVENT_MAP.onChange).toBe('bindchange');
      expect(EVENT_MAP.onBlur).toBe('bindblur');
      expect(EVENT_MAP.onFocus).toBe('bindfocus');
      expect(EVENT_MAP.onLongPress).toBe('bindlongpress');
    });
  });

  describe('className handling', () => {
    test('should convert className to class with string literal', () => {
      const code = `export default function() { return <view className="box">Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('class="box"');
    });

    test('should convert class attribute directly', () => {
      const code = `export default function() { return <view class="box">Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('class="box"');
    });

    test('should convert className to class with expression', () => {
      const code = `export default function() { return <view className={activeClass}>Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('class="{{activeClass}}"');
    });
  });

  describe('style handling', () => {
    test('should handle string style', () => {
      const code = `export default function() { return <view style="width:100rpx;">Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('style="width:100rpx;"');
    });

    test('should convert style object with number to px', () => {
      const code = `export default function() { return <view style={{ width: 100 }}>Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('style="width:100px"');
    });

    test('should convert camelCase to kebab-case in style object', () => {
      const code = `export default function() { return <view style={{ fontSize: '14px' }}>Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('font-size:14px');
    });

    test('should handle dynamic style expression', () => {
      const code = `export default function() { return <view style={dynamicStyle}>Box</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('style="{{dynamicStyle}}"');
    });
  });

  describe('conditional rendering', () => {
    test('should convert ternary with JSX to wx:if/wx:else blocks', () => {
      const code = `
export default function() {
  return (
    <view>
      {show ? <text>Visible</text> : <text>Hidden</text>}
    </view>
  )
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:if="{{show}}"');
      expect(wxml).toContain('wx:else');
    });

    test('should pass through wx:if directly', () => {
      const code = `export default function() { return <view wx:if={visible}>Content</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:if="{{visible}}"');
    });

    test('should pass through wx:else', () => {
      const code = `
export default function() {
  return (
    <view>
      <view wx:if={a}>A</view>
      <view wx:else>B</view>
    </view>
  )
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:else');
    });
  });

  describe('list rendering (map)', () => {
    test('should convert Array.map to wx:for', () => {
      const code = `
export default function() {
  return (
    <view>
      {list.map((item, index) => <text>{item.name}</text>)}
    </view>
  )
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:for="{{list}}"');
      expect(wxml).toContain('wx:for-item="item"');
      expect(wxml).toContain('wx:for-index="index"');
    });

    test('should use default item and index names', () => {
      const code = `
export default function() {
  return (
    <view>
      {items.map(function(item) { return <text>{item}</text> })}
    </view>
  )
}
      `;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:for="{{items}}"');
    });
  });

  describe('key / wx:key', () => {
    test('should convert key string to wx:key', () => {
      const code = `export default function() { return <view wx:for={items} key="id"><text>{item.name}</text></view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('wx:key="id"');
    });
  });

  describe('src attribute', () => {
    test('should handle src string literal', () => {
      const code = `export default function() { return <image src="/images/logo.png" /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('src="/images/logo.png"');
    });

    test('should handle src expression', () => {
      const code = `export default function() { return <image src={imgUrl} /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('src="{{imgUrl}}"');
    });
  });

  describe('data attributes', () => {
    test('should handle data-* with string literal', () => {
      const code = `export default function() { return <view data-id="123">Item</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('data-id="123"');
    });

    test('should handle data-* with expression', () => {
      const code = `export default function() { return <view data-type={type}>Item</view> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('data-type="{{type}}"');
    });
  });

  describe('boolean attributes', () => {
    test('should render boolean true attribute without value', () => {
      const code = `export default function() { return <swiper autoplay={true}></swiper> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain(' autoplay');
    });
  });

  describe('component (uppercase tags)', () => {
    test('should pass through uppercase component tags', () => {
      const code = `export default function() { return <MyComponent title="Hello" count={count} /> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('<MyComponent');
      expect(wxml).toContain('title="Hello"');
      expect(wxml).toContain('count="{{count}}"');
    });
  });

  describe('void tags', () => {
    test('should have correct void tags set', () => {
      expect(WX_VOID_TAGS.has('input')).toBe(true);
      expect(WX_VOID_TAGS.has('image')).toBe(true);
      expect(WX_VOID_TAGS.has('import')).toBe(true);
      expect(WX_VOID_TAGS.has('include')).toBe(true);
      expect(WX_VOID_TAGS.has('view')).toBe(false);
    });
  });

  describe('expression interpolation', () => {
    test('should interpolate string literal directly', () => {
      const code = `export default function() { return <text>{"Hello"}</text> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('Hello');
    });

    test('should interpolate number literal directly', () => {
      const code = `export default function() { return <text>{123}</text> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('123');
    });

    test('should wrap expressions in {{}}', () => {
      const code = `export default function() { return <text>{message}</text> }`;
      const wxml = getWxml(code);
      expect(wxml).toContain('{{message}}');
    });
  });
});
