# JSX 语法

本页介绍 Rsmax 支持的 JSX 模板写法。所有模板最终都会编译为 WXML。

## 数据绑定

使用单大括号绑定数据，支持变量与模板字符串：

```jsx
<text>{message}</text>
<text>{`Hello, ${name}`}</text>
```

## 条件渲染

```jsx
{show ? <view>Visible</view> : null}
{show && <view>Visible</view>}
```

## 列表渲染

使用 `map` 渲染列表，务必提供 `key`：

```jsx
{items.map(item => (
  <view key={item.id}>{item.name}</view>
))}
```

## Fragment

使用空标签 `<>...</>` 返回多个根级元素，不产生额外包裹节点：

```jsx
export default function Index() {
  return (
    <>
      <page-meta page-style="background-color: #f5f5f5;">
        <navigation-bar title="首页" />
      </page-meta>
      <view className="container">
        <text>页面内容</text>
      </view>
    </>
  );
}
```

## page-meta 与 navigation-bar

原生支持微信小程序的 `page-meta` 和 `navigation-bar`，用于动态修改页面属性。微信要求 `page-meta` 必须是页面模板的第一个节点，编译器会自动处理 WXS 标签注入位置，保证其位于最前。

```jsx
import { useState } from '@rsmax/runtime';

export default function Page() {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [title, setTitle] = useState('首页');

  return (
    <>
      <page-meta page-style={`background-color: ${bgColor};`}>
        <navigation-bar title={title} />
      </page-meta>
      <view>
        <button onClick={() => setBgColor('#f0f0f0')}>切换背景</button>
      </view>
    </>
  );
}
```

`page-meta` 常用属性（kebab-case）：

| 属性 | 说明 |
|------|------|
| `page-style` | 页面根节点样式 |
| `root-font-size` | 页面根元素字体大小 |
| `background-text-style` | 下拉背景字体、loading 图的样式（dark/light） |
| `background-color` | 窗口背景色 |
| `background-color-top` | 顶部窗口背景色 |
| `background-color-bottom` | 底部窗口背景色 |
| `scroll-top` | 滚动位置 |

`navigation-bar` 常用属性：

| 属性 | 说明 |
|------|------|
| `title` | 导航栏标题 |
| `background-color` | 导航栏背景色 |
| `front-color` | 前景颜色，仅支持 #000000 / #ffffff |
| `loading` | 是否显示导航栏加载动画 |
| `title-image` | 导航栏图片地址（替代标题文字） |

事件：`page-meta` 支持 `onScroll`、`onResize`。

::: warning 注意
1. 必须用 Fragment 将 `page-meta` 与页面内容包裹，使其成为根级第一个节点；
2. 一个页面只能有一个 `page-meta`；
3. `navigation-bar` 必须是 `page-meta` 的直接子节点。
:::

## page-container

用于在页面内弹出全屏覆盖层（弹窗 / 抽屉），可放置在页面任意位置：

```jsx
<page-container
  show={showPopup}
  overlay={true}
  position="bottom"
  round={true}
  onAfterEnter={() => console.log('进入后')}
  onAfterLeave={() => setShowPopup(false)}
  onClickOverlay={() => setShowPopup(false)}
>
  <view className="popup-content">
    <text>这是一个底部弹出层</text>
  </view>
</page-container>
```

常用属性：`show`、`overlay`、`position`（top/bottom/right/center）、`round`、`close-on-slide-down`、`overlay-style`、`custom-style`、`duration`。

支持的事件：`onBeforeEnter`、`onEnter`、`onAfterEnter`、`onBeforeLeave`、`onLeave`、`onAfterLeave`、`onClickOverlay`。

## root-portal

将子组件渲染到页面根节点，类似 React 的 `createPortal`，适合实现全局 Toast、Modal、Popup：

```jsx
<root-portal>
  <view className="global-toast">
    <text>全局提示消息</text>
  </view>
</root-portal>
```

| 属性 | 说明 |
|------|------|
| `enable` | 是否启用 portal，默认 true |

## 事件绑定

常用事件会自动映射为小程序的 `bindxxx`：

| JSX 事件 | 小程序事件 |
|---------|-----------|
| `onClick` / `onTap` | `bindtap` |
| `onInput` | `bindinput` |
| `onChange` | `bindchange` |
| `onBlur` | `bindblur` |
| `onFocus` | `bindfocus` |
| `onConfirm` | `bindconfirm` |
| `onSubmit` | `bindsubmit` |
| `onLongPress` | `bindlongpress` |
| `onTouchStart` / `onTouchMove` / `onTouchEnd` | `bindtouchstart` / `bindtouchmove` / `bindtouchend` |
| `onScroll` | `bindscroll` |
| `onLoad` / `onError` | `bindload` / `binderror` |

自定义组件的事件可以直接写小程序原生形式透传：

```jsx
<view onClick={handleTap}>Click me</view>
<van-switch checked={on} bindchange={handleChange} />
```

## class 与 className

两者都支持，也支持动态拼接：

```jsx
<view class="container">...</view>
<view className={styles.wrapper}>...</view>
<view class={`item ${active ? 'active' : ''}`}>...</view>
```

## Boolean 属性

布尔属性支持 JSX 简写；属性名自动从 camelCase 转为 kebab-case：

```jsx
<van-button plain disabled>按钮</van-button>
<van-button plain={true}>朴素</van-button>
<van-cell border={false}>无边框</van-cell>
```

## data-* 属性

```jsx
<view data-id={item.id} onClick={handleClick}>...</view>
```

事件中通过 `e.currentTarget.dataset` 读取。

## WXS 模块

通过 ES Module `import` 引用外部 `.wxs` 文件，编译器会：

1. 将 `.wxs` 文件复制到产物目录；
2. 从 JS 中移除该 import（WXS 运行在渲染层）；
3. 在 WXML 头部自动注入 `<wxs src="..." module="..." />` 标签。

```jsx
import tools from './tools.wxs';

export default function Index() {
  const [price] = useState(99.9);
  return (
    <view>
      <text>{tools.formatPrice(price)}</text>
    </view>
  );
}
```

```javascript
// tools.wxs
function formatPrice(price) {
  return '¥' + price.toFixed(2);
}
module.exports = { formatPrice: formatPrice };
```

编译后：

```xml
<wxs module="tools" src="./tools.wxs" />
<view>
  <text>{{tools.formatPrice(price)}}</text>
</view>
```

支持 import 多个 WXS 模块，模板中直接用模块名调用即可。

## npm 包

ES6 `import` npm 包会被自动转换为 CommonJS `require()`：

```jsx
import dayjs from 'dayjs';     // → var dayjs = require('dayjs');
import { format } from 'lib';  // → var { format } = require('lib');
import 'polyfill';             // → require('polyfill');

const now = dayjs().format('YYYY-MM-DD');
```

使用 npm 包需在微信开发者工具中执行 **工具 → 构建 npm**，之后 `miniprogram_npm` 会被 rsmax 自动保留。
