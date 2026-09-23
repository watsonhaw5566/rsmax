# 组件

Rsmax 支持三种组件形态共存：**JSX 函数式组件**、**Options API 组件**、**原生小程序组件**。

## JSX 函数式组件

在 `src/components/` 下创建组件目录，一个组件包含 `.jsx` 入口和可选样式：

```
src/components/
└── header/
    ├── index.jsx
    └── index.module.less
```

组件通过函数参数解构接收 properties：

```jsx
// src/components/header/index.jsx
import styles from './index.module.less';

export default function DemoHeader({ title, subtitle }) {
  return (
    <view class={styles.header}>
      <text class={styles.title}>{title}</text>
      {subtitle ? <text class={styles.subtitle}>{subtitle}</text> : null}
    </view>
  );
}
```

编译器自动完成：

- 生成 `{ "component": true }` 的 JSON 配置；
- 从函数参数解构中提取 properties（如 `title`、`subtitle`），支持默认值；
- 生成 WXML 模板与 WXSS（含 CSS Modules 哈希类名）；
- 注入 Component 生命周期，支持全部 Hooks。

## 注册与使用

### 方式一：rsmax.config.js 前缀映射（推荐）

```js
// rsmax.config.js
module.exports = {
  components: {
    // <demo-xxx> → /components/xxx/index
    demo: {
      resolve(tagName) {
        const compName = tagName.replace(/^demo-/, '');
        return `/components/${compName}/index`;
      },
    },
    // 也支持精确映射单个标签
    'demo-header': '/components/header/index',
  },
};
```

页面中直接以标签形式使用：

```jsx
<demo-header title="Hello" subtitle="Welcome to Rsmax" />
```

### 方式二：页面 JSON 手动注册

```json
// src/pages/index/index.json
{
  "usingComponents": {
    "demo-header": "/components/header/index"
  }
}
```

::: tip
`createApp`、`createPage`、`createComponent` 是编译器内部函数，不要在代码中直接导入或调用，只需 `export default` 你的函数或对象即可。
:::

## Options API 组件

也支持与原生小程序 Component 一致的对象配置写法，`render()` 中返回 JSX：

```jsx
export default {
  properties: {
    title: String,
  },
  data: {
    count: 0,
  },
  methods: {
    increment() {
      this.setData({ count: this.data.count + 1 });
    },
  },
  render() {
    return (
      <view>
        <text>{this.data.title}: {this.data.count}</text>
        <button onClick={this.increment}>+1</button>
      </view>
    );
  },
};
```

函数式组件与 Options API 组件的编译输出等价，可在项目中长期共存。

## 原生小程序组件

`components/` 目录同样支持原生组件（WXML + WXSS + JS），与 JSX 组件共存。原生文件会被原样复制，编译器自动补上 `{ "component": true }`。

```
src/components/
└── badge/
    ├── index.js      # 原生 Component() 构造器
    ├── index.wxml
    └── index.wxss
```

```js
// src/components/badge/index.js
Component({
  properties: {
    value: { type: null, value: '' },
    type: { type: String, value: 'normal' },
  },
});
```

```xml
<!-- src/components/badge/index.wxml -->
<view class="badge {{type === 'dot' ? 'badge-dot' : ''}}">
  <text wx:if="{{type !== 'dot'}}" class="badge-text">{{value}}</text>
</view>
```

原生组件通过前缀映射在 JSX 页面中引用，体验与 JSX 组件一致：

```jsx
<demo-badge value="3" />
```

::: warning
原生组件的 `.js` 文件**不要**使用 `export default`（否则会被编译器当作函数式组件转换），直接调用 `Component({...})` 即可。
:::

## 自定义 TabBar

在 `src/custom-tab-bar/` 目录中编写 TabBar，其中的 JSX 会被自动编译为 `Component`：

```
src/
├── app.json
├── pages/
└── custom-tab-bar/
    └── index.jsx
```

在 `app.json` 中开启自定义 TabBar：

```json
{
  "tabBar": {
    "custom": true,
    "color": "#999999",
    "selectedColor": "#07c160",
    "backgroundColor": "#ffffff",
    "list": [
      { "pagePath": "pages/index/index", "text": "首页" },
      { "pagePath": "pages/my/index", "text": "我的" }
    ]
  }
}
```

```jsx
// src/custom-tab-bar/index.jsx
import { useState } from '@rsmax/runtime';

export default function CustomTabBar() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { pagePath: '/pages/index/index', text: '首页' },
    { pagePath: '/pages/my/index', text: '我的' },
  ];

  function switchTab(e) {
    const index = e.currentTarget.dataset.index;
    wx.switchTab({ url: tabs[index].pagePath });
    setSelected(index);
  }

  return (
    <view className="tab-bar">
      {tabs.map((tab, index) => (
        <view
          key={tab.pagePath}
          className={'tab-item' + (selected === index ? ' active' : '')}
          data-index={index}
          onClick={switchTab}
        >
          <text className="text">{tab.text}</text>
        </view>
      ))}
    </view>
  );
}
```

::: warning 注意
1. `custom-tab-bar/` 必须放在 `src/` 根目录下；
2. 切换 Tab 需使用 `wx.switchTab()`；
3. 选中态需在各页面 `onShow` 中通过 `getTabBar()` 主动更新，参考微信官方文档；
4. TabBar 中使用 `public/` 图片资源时用 `/` 开头的绝对路径。
:::
