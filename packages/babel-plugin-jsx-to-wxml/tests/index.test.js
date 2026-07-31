const { describe, test, expect } = require('@rstest/core');
const parser = require('@babel/parser');
const plugin = require('../index');
const { jsxElementToWxml, extractWxmlFromCode, isNativeTag, isCustomComponent, WX_NATIVE_TAGS, WX_VOID_TAGS, EVENT_MAP } = require('../utils');

function parseCode(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
}

function findJsxInExportDefault(ast) {
  let jsxNode = null;
  const traverse = require('@babel/traverse').default;
  const t = require('@babel/types');
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      const decl = path.node.declaration;
      if (t.isObjectExpression(decl)) {
        for (const prop of decl.properties) {
          if ((t.isObjectMethod(prop) || t.isObjectProperty(prop)) && t.isIdentifier(prop.key, { name: 'render' })) {
            if (t.isObjectMethod(prop)) {
              jsxNode = findJsx(prop);
            } else if (t.isObjectProperty(prop) && t.isArrowFunctionExpression(prop.value)) {
              jsxNode = findJsx(prop.value);
            }
            break;
          }
        }
      } else if (t.isFunctionDeclaration(decl) || t.isArrowFunctionExpression(decl)) {
        jsxNode = findJsx(decl);
      } else if (t.isClassDeclaration(decl)) {
        for (const member of decl.body.body) {
          if (t.isClassMethod(member) && t.isIdentifier(member.key, { name: 'render' })) {
            jsxNode = findJsx(member);
            break;
          }
        }
      }
    }
  });
  return jsxNode;
}

function findJsx(fn) {
  const t = require('@babel/types');
  let body = fn.body;
  if (t.isArrowFunctionExpression(fn)) {
    if (t.isJSXElement(body) || t.isJSXFragment(body)) return body;
  }
  if (t.isBlockStatement(body)) {
    for (const stmt of body.body) {
      if (t.isReturnStatement(stmt) && (t.isJSXElement(stmt.argument) || t.isJSXFragment(stmt.argument))) {
        return stmt.argument;
      }
    }
  }
  return null;
}

describe('@rsmax/babel-plugin-jsx-to-wxml', () => {
  describe('utils', () => {
    describe('isNativeTag', () => {
      test('should identify native tags', () => {
        expect(isNativeTag('view')).toBe(true);
        expect(isNativeTag('text')).toBe(true);
        expect(isNativeTag('image')).toBe(true);
        expect(isNativeTag('button')).toBe(true);
        expect(isNativeTag('input')).toBe(true);
        expect(isNativeTag('scroll-view')).toBe(true);
      });

      test('should return false for non-native tags', () => {
        expect(isNativeTag('MyComponent')).toBe(false);
        expect(isNativeTag('van-button')).toBe(false);
        expect(isNativeTag('custom-element')).toBe(false);
      });
    });

    describe('isCustomComponent', () => {
      test('should identify kebab-case custom components', () => {
        expect(isCustomComponent('van-button')).toBe(true);
        expect(isCustomComponent('t-cell')).toBe(true);
        expect(isCustomComponent('my-component')).toBe(true);
      });

      test('should return false for native tags and PascalCase components', () => {
        expect(isCustomComponent('view')).toBe(false);
        expect(isCustomComponent('text')).toBe(false);
        expect(isCustomComponent('MyComponent')).toBe(false);
      });
    });

    describe('WX constants', () => {
      test('WX_NATIVE_TAGS should contain expected tags', () => {
        expect(WX_NATIVE_TAGS.has('view')).toBe(true);
        expect(WX_NATIVE_TAGS.has('text')).toBe(true);
        expect(WX_NATIVE_TAGS.has('block')).toBe(true);
        expect(WX_NATIVE_TAGS.has('slot')).toBe(true);
        expect(WX_NATIVE_TAGS.has('page-meta')).toBe(true);
        expect(WX_NATIVE_TAGS.has('navigation-bar')).toBe(true);
      });

      test('WX_VOID_TAGS should contain void elements', () => {
        expect(WX_VOID_TAGS.has('input')).toBe(true);
        expect(WX_VOID_TAGS.has('image')).toBe(true);
      });

      test('EVENT_MAP should map React events to wx events', () => {
        expect(EVENT_MAP.onClick).toBe('bindtap');
        expect(EVENT_MAP.onTap).toBe('bindtap');
        expect(EVENT_MAP.onInput).toBe('bindinput');
        expect(EVENT_MAP.onChange).toBe('bindchange');
      });
    });
  });

  describe('jsxElementToWxml', () => {
    test('should convert simple view element', () => {
      const code = 'export default { render() { return <view>Hello</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<view>');
      expect(result.wxml).toContain('Hello');
      expect(result.wxml).toContain('</view>');
    });

    test('should convert nested elements', () => {
      const code = 'export default { render() { return <view><text>Nested</text></view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<view>');
      expect(result.wxml).toContain('<text>Nested</text>');
      expect(result.wxml).toContain('</view>');
    });

    test('should convert className attribute', () => {
      const code = 'export default { render() { return <view className="container">Test</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('class="container"');
    });

    test('should convert className with expression', () => {
      const code = 'export default { render() { return <view className={cls}>Test</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('class="{{cls}}"');
    });

    test('should convert inline style string', () => {
      const code = 'export default { render() { return <view style="color: red;">Test</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('style="color: red;"');
    });

    test('should convert style object to CSS string', () => {
      const code = 'export default { render() { return <view style={{ color: "red", fontSize: 14 }}>Test</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('style="color:red;font-size:14px"');
    });

    test('should convert onClick event', () => {
      const code = 'export default { render() { return <button onClick={this.handleClick}>Click</button>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('bindtap="handleClick"');
    });

    test('should convert self-closing image tag', () => {
      const code = 'export default { render() { return <image src="/logo.png" />; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<image');
      expect(result.wxml).toContain('src="/logo.png"');
      expect(result.wxml).toContain(' />');
    });

    test('should convert wx:if conditional', () => {
      const code = 'export default { render() { return <view wx:if={show}>Conditional</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('wx:if="{{show}}"');
    });

    test('should collect custom components', () => {
      const code = 'export default { render() { return <view><van-button>Click</van-button></view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.components.has('van-button')).toBe(true);
    });

    test('should convert boolean attributes correctly', () => {
      const code = 'export default { render() { return <button disabled>Disabled</button>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('disabled');
    });

    test('should handle text interpolation', () => {
      const code = 'export default { render() { return <view>Hello {name}</view>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('Hello');
      expect(result.wxml).toContain('{{name}}');
    });

    test('should handle src attribute with expression', () => {
      const code = 'export default { render() { return <image src={imgUrl} />; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('src="{{imgUrl}}"');
    });

    test('should recognize page-meta as native tag', () => {
      const code = 'export default { render() { return <page-meta page-style="background: #fff;" />; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<page-meta');
      expect(result.wxml).toContain('page-style="background: #fff;"');
      expect(result.components.size).toBe(0);
    });

    test('should recognize navigation-bar as native tag', () => {
      const code = 'export default { render() { return <page-meta><navigation-bar title="首页" /></page-meta>; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<page-meta>');
      expect(result.wxml).toContain('<navigation-bar');
      expect(result.wxml).toContain('title="首页"');
      expect(result.components.size).toBe(0);
    });

    test('should expand JSX Fragment without wrapper element', () => {
      const code = `export default function() {
        return (
          <>
            <page-meta page-style="bg" />
            <view>Content</view>
          </>
        );
      }`;
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      // Should not contain any Fragment wrapper
      expect(result.wxml).not.toContain('Fragment');
      expect(result.wxml).not.toContain('<>');
      // Should contain both children at root level
      expect(result.wxml).toContain('<page-meta');
      expect(result.wxml).toContain('<view>Content</view>');
    });

    test('should expand JSX Fragment with page-meta and navigation-bar', () => {
      const code = `export default function() {
        return (
          <>
            <page-meta background-text-style="dark">
              <navigation-bar title="Test Page" background-color="#fff" />
            </page-meta>
            <view className="container">
              <text>Hello World</text>
            </view>
          </>
        );
      }`;
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('<page-meta');
      expect(result.wxml).toContain('background-text-style="dark"');
      expect(result.wxml).toContain('<navigation-bar');
      expect(result.wxml).toContain('title="Test Page"');
      expect(result.wxml).toContain('background-color="#fff"');
      expect(result.wxml).toContain('</page-meta>');
      expect(result.wxml).toContain('class="container"');
      expect(result.wxml).toContain('<text>Hello World</text>');
    });

    test('should handle kebab-case attributes on page-meta with expressions', () => {
      const code = 'export default { render() { return <page-meta page-style={pageStyle} root-font-size="16px" />; } }';
      const ast = parseCode(code);
      const jsxNode = findJsxInExportDefault(ast);
      const result = jsxElementToWxml(code, jsxNode);

      expect(result.wxml).toContain('page-style="{{pageStyle}}"');
      expect(result.wxml).toContain('root-font-size="16px"');
    });
  });

  describe('extractWxmlFromCode', () => {
    test('should extract wxml from object-style component', () => {
      const code = 'export default { render() { return <view class="page"><text>Hello</text></view>; } }';
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain('class="page"');
      expect(result.wxml).toContain('<text>Hello</text>');
      expect(result.components.size).toBe(0);
    });

    test('should extract wxml from functional component', () => {
      const code = 'export default function() { return <view>Functional Page</view>; }';
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain('<view>Functional Page</view>');
    });

    test('should extract wxml from class component render method', () => {
      const code = 'export default class Index { render() { return <view>Class Component</view>; } }';
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain('<view>Class Component</view>');
    });

    test('should convert t("key") call in JSX text to __i18n data binding', () => {
      const code = `import { t } from '@rsmax/i18n';
export default function Index() {
  return <view>{t('hello')}</view>;
}`;
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain("{{__i18n['hello']}}");
      expect(result.wxml).not.toContain("t('hello')");
    });

    test('should convert t("nested.key") call in JSX text to __i18n data binding', () => {
      const code = `import { t } from '@rsmax/i18n';
export default function Index() {
  return <text>{t('page.home.title')}</text>;
}`;
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain("{{__i18n['page.home.title']}}");
    });

    test('should NOT convert non-t() calls', () => {
      const code = `export default function Index() {
  return <view>{formatMessage('hello')}</view>;
}`;
      const ast = parseCode(code);
      const result = extractWxmlFromCode(ast, code);

      expect(result.wxml).toContain('formatMessage');
      expect(result.wxml).not.toContain('__i18n');
    });
  });

  describe('plugin exports', () => {
    test('should export plugin function', () => {
      expect(typeof plugin).toBe('function');
      const instance = plugin();
      expect(instance.name).toBe('babel-plugin-jsx-to-wxml');
      expect(instance.visitor).toBeDefined();
    });

    test('should export jsxToWxml function', () => {
      expect(typeof plugin.jsxToWxml).toBe('function');
    });

    test('should export utils', () => {
      expect(plugin.utils).toBeDefined();
      expect(plugin.findJsxInFunction).toBeDefined();
    });
  });
});
