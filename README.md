# Rsmax JSX

一个基于 Babel 的 JSX 微信小程序开发框架，让你用 React 风格的 JSX 语法和 Hooks API 编写微信小程序。

## 特性

- **JSX 语法** — 用熟悉的 JSX 编写 WXML 模板，支持条件渲染、列表渲染、事件绑定
- **Hooks API** — `useState`、`useEffect`、`useContext`、`usePageEvent`、`useAppEvent` 等 React 风格 Hooks
- **API Promise 化** — 内置 `promisify` 工具函数，将小程序回调 API 转换为 Promise，支持 async/await
- **两种编程范式** — 支持函数式组件（Hooks）和 Options API（传统小程序 Page/Component 配置）
- **CSS Modules** — `.module.less` / `.module.css` / `.module.scss` 自动局部作用域，class 名自动 hash
- **样式预处理** — 内置 Less/Sass 支持，px 自动转 rpx（1px → 1rpx，按 750rpx 设计稿）
- **第三方 UI 库** — 自动识别并注册 Vant Weapp、TDesign MiniProgram、Ant Design Mini 组件
- **npm 包支持** — ES6 `import` 自动转为 CommonJS `require()`
- **状态管理** — 类 Zustand 的轻量级状态管理 `@rsmax/store`，支持微信缓存持久化
- **国际化（i18n）** — 基于 JS 模块的多语言支持，编译器按需加载，JSX 中 `t('key')` 自动转为 WXML 数据绑定
- **WXS 模块支持** — 通过 `import` 引用外部 `.wxs` 文件，编译器自动注入 WXML 标签并复制文件
- **静态资源** — `public/` 目录下的文件直接复制到产物根目录，支持绝对路径引用
- **监听模式** — `rsmax dev` 监听文件变化，增量编译
- **miniprogram_npm 保护** — 构建时自动保留微信开发者工具生成的 `miniprogram_npm` 目录

## 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 10（本项目使用 pnpm workspace）
- 微信开发者工具

### 安装

```bash
pnpm add rsmax
```

### 项目结构

```
your-project/
├── src/                        # 源码目录
│   ├── app.js                  # App 入口
│   ├── app.json                # 小程序配置
│   ├── app.wxss                # 全局样式
│   ├── pages/
│   │   ├── index/
│   │   │   ├── index.jsx       # 页面逻辑 + JSX 模板
│   │   │   ├── index.less      # 页面样式（或 .wxss/.css/.scss）
│   │   │   ├── index.module.less  # CSS Modules 样式
│   │   │   └── index.json      # 页面配置（可选）
│   │   └── ...
│   └── components/             # 自定义组件
├── locales/                    # 多语言文件目录（可选）
│   ├── zh-CN.js                # 中文语言包
│   └── en.js                   # 英文语言包
├── public/                     # 静态资源目录（可选，与 src/ 同级）
│   ├── icon.png                # → dist/icon.png
│   └── images/
│       └── logo.png            # → dist/images/logo.png
├── project.config.json         # 微信开发者工具项目配置
├── package.json
└── rsmax.config.js             # rsmax 配置（可选）
```

### project.config.json 配置

关键配置项（确保 npm 构建正确）：

```json
{
  "miniprogramRoot": "dist/",
  "setting": {
    "es6": false,
    "postcss": false,
    "minified": false,
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./dist/"
      }
    ]
  }
}
```

## CLI 命令

### build — 构建项目

```bash
rsmax build <source> -o <output>
```

将源码编译输出到 dist 目录。编译前会清空输出目录，但保留 `miniprogram_npm`。

```bash
rsmax build src -o dist
```

### dev — 开发模式（监听）

```bash
rsmax dev <source> -o <output>
```

监听源文件变化，增量编译。

```bash
rsmax dev src -o dist
```

### clean — 清理输出目录

```bash
rsmax clean [output]
```

清理输出目录，保留 `miniprogram_npm`。

## 编写页面

### 函数式组件（Hooks）

```jsx
import { useState, useEffect } from '@rsmax/runtime';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('mounted, count:', count);
    return () => console.log('unmounted');
  }, [count]);

  const increment = () => setCount(count + 1);

  return (
    <view class="container">
      <text>Count: {count}</text>
      <button onClick={increment}>+1</button>
    </view>
  );
}
```

### Options API

```jsx
export default {
  data: {
    todos: []
  },

  addTodo() {
    this.setData({ todos: [...this.data.todos, 'New item'] });
  },

  render() {
    return (
      <view>
        {this.data.todos.map(item => (
          <text key={item}>{item}</text>
        ))}
        <button onClick={this.addTodo}>Add</button>
      </view>
    );
  }
};
```

## 分包支持（subPackages）

rsmax 完整支持微信小程序的[分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)机制，包括**普通分包**和**独立分包**（independent subpackages）。你只需按照微信小程序的标准规范在 `app.json` 中声明 `subPackages`（或 `subpackages`），rsmax 编译器会自动处理：

- 分包内页面/组件的 JSX 编译
- 运行时文件（`rsmax-runtime.js`、`rsmax-store.js`、`rsmax-i18n.js`）的相对路径计算
- 普通分包复用主包运行时，不额外拷贝运行时文件
- 独立分包自动在分包根目录独立拷贝运行时文件

### 配置示例

在 `app.json` 中声明分包：

```json
{
  "pages": [
    "pages/index/index"
  ],
  "subPackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/detail/index",
        "pages/list/index"
      ]
    },
    {
      "root": "packageB",
      "pages": [
        "pages/home/index"
      ],
      "independent": true
    }
  ]
}
```

### 目录结构

```
src/
├── app.js
├── app.json
├── app.wxss
├── pages/
│   └── index/          # 主包页面
│       └── index.jsx
├── packageA/           # 普通分包
│   ├── pages/
│   │   ├── detail/
│   │   │   └── index.jsx
│   │   └── list/
│   │       └── index.jsx
│   └── components/     # 分包内自定义组件
│       └── badge/
│           └── index.jsx
└── packageB/           # 独立分包
    └── pages/
        └── home/
            └── index.jsx
```

### 分包内页面编写

分包页面和组件的写法与主包完全一致，直接使用 Hooks / Options API 即可，无需做任何额外改动：

```jsx
// src/packageA/pages/detail/index.jsx
import { useState, useEffect } from '@rsmax/runtime';

export default function Detail() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('subpackage page mounted');
  });

  return (
    <view className="container">
      <text>分包页面 count: {count}</text>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </view>
  );
}
```

### 独立分包注意事项

- 独立分包会在其分包根目录下自动独立拷贝一份 `rsmax-runtime.js`（以及 store/i18n 运行时文件），保证独立运行
- 独立分包中的组件/页面不应依赖主包资源（遵循微信小程序官方约束）
- `@rsmax/runtime`、`@rsmax/store`、`@rsmax/i18n` 的 import 仍然正常使用，编译器会自动处理路径

### 路径规则总结

| 场景 | 运行时位置 | 运行时引用路径 |
|------|-----------|----------------|
| 主包页面 | 主包根目录 | `./rsmax-runtime.js`（页面同根） |
| 普通分包页面 | 主包根目录（共享） | `../../../../rsmax-runtime.js`（从分包页面回溯到主包） |
| 独立分包页面 | 分包根目录（独立拷贝） | `../../rsmax-runtime.js`（回溯到分包根） |
| 分包内组件 | 与同包页面一致 | 根据所在包自动计算 |

## Hooks API

### useState

```jsx
const [count, setCount] = useState(0);
const [count, setCount] = useState(0, 'count'); // 指定 data key
```

### useEffect

```jsx
useEffect(() => {
  // 副作用
  return () => {
    // 清理函数（onUnload 时执行）
  };
}, [deps]); // 依赖数组，同 React
```

### useContext / createContext

```jsx
const ThemeContext = createContext('light');
const theme = useContext(ThemeContext);
```

### useQuery

获取页面 onLoad 时传入的参数：

```jsx
const query = useQuery(); // { id: '123', ... }
```

### usePageEvent

监听页面生命周期事件：

```jsx
usePageEvent('onShow', () => {
  console.log('page show');
});

usePageEvent('onReachBottom', () => {
  // 下拉加载更多
});
```

支持的页面事件：`onLoad`、`onShow`、`onReady`、`onHide`、`onUnload`、`onPullDownRefresh`、`onReachBottom`、`onShareAppMessage`、`onPageScroll` 等。

### useAppEvent

监听 App 全局事件：

```jsx
useAppEvent('onLaunch', () => {
  console.log('app launched');
});
```

### useComponentEvent

组件内监听 lifetimes 事件：

```jsx
useComponentEvent('attached', () => {});
useComponentEvent('detached', () => {});
```

## 工具函数

### promisify

将微信小程序风格的回调 API（`success`/`fail`）转换为 Promise，方便使用 `async/await` 语法。

```jsx
import { promisify } from '@rsmax/runtime';

export default function UserPage() {
  const [userInfo, setUserInfo] = useState(null);

  const handleGetUserInfo = async () => {
    try {
      // 将 wx.getUserInfo 转换为 Promise 风格
      const wxGetUserInfo = promisify(wx.getUserInfo);
      const res = await wxGetUserInfo();
      setUserInfo(res.userInfo);
    } catch (err) {
      console.error('获取用户信息失败:', err);
    }
  };

  const handleRequest = async () => {
    try {
      const wxRequest = promisify(wx.request);
      const res = await wxRequest({
        url: 'https://api.example.com/data',
        method: 'GET'
      });
      console.log('请求结果:', res.data);
    } catch (err) {
      console.error('请求失败:', err);
    }
  };

  return (
    <view class="container">
      {userInfo ? (
        <text>欢迎, {userInfo.nickName}</text>
      ) : null}
      <button onClick={handleGetUserInfo}>获取用户信息</button>
      <button onClick={handleRequest}>发起请求</button>
    </view>
  );
}
```

**特性**：
- 支持同时传入自定义的 `success`/`fail` 回调，它们会在 Promise resolve/reject 之前被调用
- 无参数调用时默认使用空对象 `{}`
- 保留其他选项参数（如 `url`、`method`、`data` 等）

```jsx
// 自定义回调与 Promise 共存
const wxGetStorage = promisify(wx.getStorage);
wxGetStorage({
  key: 'token',
  success: (res) => console.log('自定义回调:', res.data),
}).then(res => {
  console.log('Promise resolve:', res.data);
});
```

**常用可 promisify 的微信 API**：`wx.request`、`wx.login`、`wx.getUserInfo`、`wx.getStorage`、`wx.setStorage`、`wx.chooseImage`、`wx.navigateTo`、`wx.scanCode` 等。

## 状态管理（@rsmax/store）

框架内置了类似 Zustand 的轻量级状态管理库 `@rsmax/store`，支持通过微信小程序缓存（`wx.setStorageSync`/`wx.getStorageSync`）实现状态持久化。

### 基本使用

**1. 创建 Store**

```jsx
// src/stores/counter.js
import { create } from '@rsmax/store';

export const counterStore = create((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
  reset: () => set({ count: 0 }),
  incrementBy: (n) => set({ count: get().count + n }),
}));
```

**2. 在组件中使用**

使用 `useStore` hook 订阅状态，传入 selector 函数只订阅需要的字段，优化性能：

```jsx
// src/pages/counter/index.jsx
import { useStore } from '@rsmax/runtime';
import { counterStore } from '../../stores/counter';

export default function CounterPage() {
  const count = useStore(counterStore, (s) => s.count);

  return (
    <view class="container">
      <text>Count: {count}</text>
      <button onClick={() => counterStore.getState().increment()}>+1</button>
      <button onClick={() => counterStore.getState().decrement()}>-1</button>
      <button onClick={() => counterStore.getState().reset()}>重置</button>
    </view>
  );
}
```

**3. 在组件外访问/修改状态**

```js
// 任意 JS 文件中访问
import { counterStore } from './stores/counter';

// 获取状态
const currentCount = counterStore.getState().count;

// 直接更新状态
counterStore.setState({ count: 100 });

// 订阅状态变化
const unsub = counterStore.subscribe((state, prevState) => {
  console.log('count changed:', state.count);
});

// 取消订阅
unsub();
```

### 持久化（persist 中间件）

使用 `persist` 中间件将状态自动保存到微信小程序本地缓存，应用重启后自动恢复：

```jsx
// src/stores/counter.js
import { create } from '@rsmax/store';
import { persist } from '@rsmax/store/middleware';

export const counterStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
      decrement: () => set({ count: get().count - 1 }),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // 缓存键名（必填）
      // partialize: (state) => ({ count: state.count }), // 可选：只持久化部分字段
      // version: 1, // 可选：版本号，用于数据迁移
      // migrate: (persistedState, version) => { /* 迁移逻辑 */ }, // 可选：版本迁移函数
    }
  )
);
```

**persist 配置项**：

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `name` | `string` | 是 | 本地缓存键名 |
| `partialize` | `(state) => Partial<State>` | 否 | 筛选需要持久化的字段，默认持久化全部状态 |
| `version` | `number` | 否 | 版本号，配合 `migrate` 使用 |
| `migrate` | `(persistedState, version) => State` | 否 | 数据迁移函数，当版本号不匹配时调用 |
| `storage` | `{ getItem, setItem, removeItem }` | 否 | 自定义存储实现，默认使用 `wx.setStorageSync`/`wx.getStorageSync` |

### Store API

每个 store 实例提供以下方法：

| 方法 | 说明 |
|-----|------|
| `getState()` | 获取当前状态 |
| `setState(partial, replace?)` | 更新状态。`partial` 为对象时合并更新，为函数时接收当前状态返回新状态；`replace=true` 时替换整个状态 |
| `subscribe(listener)` | 订阅状态变化，返回取消订阅函数 |
| `destroy()` | 销毁 store，清除所有订阅 |

### 示例演示

完整示例可查看 e2e 项目中的 [store-demo 页面](file:///Users/wangjue/WebstormProjects/rsmax/rsmax-jsx/e2e/src/pages/store-demo/index.jsx)。

## 国际化（@rsmax/i18n）

框架内置了基于 JS 模块的轻量级国际化方案 `@rsmax/i18n`，支持多语言切换、变量插值、嵌套键值，且通过编译器实现**按需加载**——只有使用了 `@rsmax/i18n` 的页面/组件才会引入运行时和语言包文件。

### 目录结构

在项目根目录创建 `locales/` 文件夹（也支持放在 `src/locales/`），放置 JS 语言包文件，文件名即为语言代码：

```
locales/
├── zh-CN.js      # 简体中文
├── en.js         # 英文
└── ja.js         # 日文（可选）
```

### 创建语言包

每个语言包通过 `module.exports` 导出一个嵌套对象，支持点号路径访问，使用 `{name}` 语法标记变量插值位置：

```js
// locales/zh-CN.js
module.exports = {
  app: {
    name: '我的应用'
  },
  home: {
    title: '首页',
    greeting: '你好，{name}！',
    items: {
      count: '共 {count} 条记录'
    }
  },
  common: {
    confirm: '确定',
    cancel: '取消'
  }
};
```

```js
// locales/en.js
module.exports = {
  app: {
    name: 'My App'
  },
  home: {
    title: 'Home',
    greeting: 'Hello, {name}!',
    items: {
      count: '{count} items total'
    }
  },
  common: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  }
};
```

### 在 App 入口初始化

在 `app.js` 中初始化 i18n，设置默认语言：

```js
// src/app.js
import { initI18n } from '@rsmax/i18n';

initI18n({
  locale: 'zh-CN',        // 默认语言
  fallbackLocale: 'zh-CN' // 兜底语言（当翻译缺失时使用）
});

App({
  onLaunch() {
    console.log('App launched');
  }
});
```

### 在页面/组件中使用

使用 `useI18n()` Hook 获取翻译函数和语言控制方法，在 JSX 中直接调用 `t('key')`：

```jsx
// src/pages/index/index.jsx
import { useState } from '@rsmax/runtime';
import { useI18n, t, setLocale } from '@rsmax/i18n';

export default function HomePage() {
  const { locale } = useI18n(); // 初始化 i18n，自动注入 data.__i18n
  const [name] = useState('World');

  const switchToZh = () => setLocale('zh-CN');
  const switchToEn = () => setLocale('en');

  return (
    <view class="container">
      {/* 基础翻译 */}
      <text>{t('home.title')}</text>

      {/* 变量插值 — 在 JSX 中使用 state 变量展示插值结果 */}
      <text>{t('home.greeting', { name })}</text>
      <text>{t('home.items.count', { count: 10 })}</text>

      {/* 嵌套键访问 */}
      <text>{t('common.confirm')}</text>

      {/* 语言切换 */}
      <button onClick={switchToZh}>中文</button>
      <button onClick={switchToEn}>English</button>

      <text>当前语言: {locale}</text>
    </view>
  );
}
```

> **注意**：由于 WXML 模板中无法执行 JavaScript 函数调用，JSX 中的 `t('key')` 会在编译时被转换为 `{{__i18n['key']}}` 数据绑定，这意味着模板中 `t()` 的参数必须是**字符串字面量**，不能是变量或表达式。对于带变量插值的场景，可在 JS 逻辑中调用 `i18nT('key', params)` 计算结果后通过 `setState` 绑定到视图。

### 编译原理

编译器会自动处理以下工作：

1. **按需检测**：编译每个 JS/JSX 文件时，检测是否 `import`/`require` 了 `@rsmax/i18n`。只有使用了 i18n 的文件才会触发运行时复制。
2. **路径重写**：将源码中的 `import { t } from '@rsmax/i18n'` 自动重写为本地相对路径（如 `require('../../rsmax-i18n.js')`）。
3. **运行时复制**：首次检测到 i18n 使用时，将 `rsmax-i18n.js` 运行时复制到 dist 根目录。
4. **语言包处理**：扫描 `locales/` 目录，将所有 `.js` 语言包直接复制到 `dist/locales/`，并生成 `rsmax-i18n-locales.js` 模块。每个语言包用函数包裹实现**懒加载**——只有切换到对应语言时才会 `require` 对应的语言包文件。
5. **WXML 转换**：JSX 中的 `t('key')` 调用在编译阶段被转换为 WXML 的 `{{__i18n['key']}}` 数据绑定，模板中无需函数调用即可直接渲染翻译文本。

### API 参考

#### initI18n(options)

在 App 入口初始化全局 i18n 实例，返回 i18n 实例。

```js
initI18n({
  locale: 'zh-CN',         // 默认语言，默认 'zh-CN'
  fallbackLocale: 'en',    // 兜底语言，翻译缺失时回退到此语言
  messages: {              // 可选：内联消息（无需 locales 文件）
    'zh-CN': { hi: '你好' },
    'en': { hi: 'Hello' }
  }
});
```

#### useI18n()

在组件/页面的 setup 函数中调用，返回 `{ t, locale, setLocale, addMessages }`。调用后会：
- 自动将当前语言的扁平消息注入到 `data.__i18n` 中
- 订阅语言切换事件，语言变化时自动调用 `setData` 更新视图
- 页面卸载时自动取消订阅

```js
const { t, locale, setLocale, addMessages } = useI18n();
```

#### t(key, params?)

翻译函数，根据当前语言返回对应的文本。支持点号分隔的嵌套键名和 `{name}` 变量插值。

```js
t('home.title');                        // "首页"
t('home.greeting', { name: '张三' });    // "你好，张三！"
t('nonexistent.key');                   // key 不存在时返回 key 本身
```

> **注意**：在 JSX 模板中直接使用 `t('key')` 时，编译器会自动转换为数据绑定。在 JS 逻辑代码中（如事件处理函数、useEffect 中），`t()` 作为普通函数调用正常工作。

#### setLocale(locale)

切换当前语言。切换后所有已挂载的组件会自动更新翻译内容，返回 Promise。

```js
setLocale('en').then(() => {
  console.log('语言已切换');
});
```

#### getLocale()

获取当前语言代码。

```js
const current = getLocale(); // 'zh-CN'
```

#### addMessages(locale, messages)

动态添加翻译消息（适用于从后端加载语言包的场景）。添加后如果是当前语言，会立即触发视图更新。

```js
addMessages('fr', {
  home: { title: 'Accueil' }
});
```

#### getI18n()

获取全局 i18n 实例（主要用于非组件环境，如工具函数中）。

```js
const i18n = getI18n();
console.log(i18n.t('home.title'));
```

### 按需加载说明

编译器实现了精确的按需加载：

- **未使用 `@rsmax/i18n`** 的项目：不会复制任何 i18n 相关文件到 dist 目录
- **部分页面使用**：只有 import 了 `@rsmax/i18n` 的文件会被重写引用路径，但运行时和语言包只需复制一次（到 dist 根目录）
- **语言包懒加载**：运行时不会一次性加载所有语言包，只有调用 `setLocale()` 切换到某语言时，才会 `require` 对应的语言文件
- **watch 模式**：开发模式下 locales 目录新增/修改语言包文件会自动重新生成语言包模块

## 静态资源（public 目录）

`public/` 目录用于存放不需要编译处理的静态资源，这些文件会**直接复制到 dist 产物的根目录**，保持原有的目录结构。

`public/` 支持两种放置位置（与 `locales/` 目录一致）：
- **项目根目录**（与 `src/` 同级）：推荐方式，如 `public/icon.png` → `dist/icon.png`
- **源码目录内**：放在 `src/public/` 下，仅当项目根目录没有 `public/` 时生效

> **优先级**：项目根目录的 `public/` 优先于 `src/public/`，两者同时存在时只使用根目录的。

### 使用方式

将静态文件放入 `public/` 目录：

```
public/
├── icon.png
├── logo.svg
├── sitemap.json
└── images/
    └── banner.jpg
```

构建后会映射到：

```
dist/
├── icon.png
├── logo.svg
├── sitemap.json
└── images/
    └── banner.jpg
```

### 在代码中引用

使用绝对路径（以 `/` 开头）引用静态资源，符合小程序路径规范：

```jsx
// 引用 public/icon.png
<image src="/icon.png" />

// 引用 public/images/banner.jpg
<image src="/images/banner.jpg" />
```

在 wxss 中也可以使用绝对路径：

```css
.header {
  background-image: url('/images/banner.jpg');
}
```

### watch 模式支持

在 `rsmax dev` 监听模式下，public 目录中的文件变化会自动同步：
- 新增文件 → 自动复制到 dist
- 修改文件 → 自动更新
- 删除文件 → 自动从 dist 移除
- 新增/删除子目录 → 自动同步
- 项目根目录 public 和 src/public 均支持监听

## JSX 语法

### 数据绑定

```jsx
<text>{message}</text>
<text>{`Hello, ${name}`}</text>
```

### 条件渲染

```jsx
{show ? <view>Visible</view> : null}
{show && <view>Visible</view>}
```

### 列表渲染

```jsx
{items.map(item => (
  <view key={item.id}>{item.name}</view>
))}
```

### 事件绑定

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
| `onTouchStart` | `bindtouchstart` |
| `onTouchMove` | `bindtouchmove` |
| `onTouchEnd` | `bindtouchend` |
| `onScroll` | `bindscroll` |
| `onLoad` | `bindload` |
| `onError` | `binderror` |

自定义组件的事件：JSX 中写 `bindtap`、`catchtap`、`bind:change` 等可直接透传。

```jsx
<view onClick={handleTap}>Click me</view>
<van-switch checked={on} bindchange={handleChange} />
```

### class 和 className

`class` 和 `className` 均支持：

```jsx
<view class="container">...</view>
<view className={styles.wrapper}>...</view>
<view class={`item ${active ? 'active' : ''}`}>...</view>
```

### Boolean 属性

Vant 等 UI 库的 boolean 属性支持 JSX 简写：

```jsx
<van-button plain disabled>按钮</van-button>
<van-button plain={true}>朴素</van-button>
<van-cell border={false}>无边框</van-cell>
```

属性名自动从 camelCase 转为 kebab-case：`loadingText` → `loading-text`。

### data-* 属性

```jsx
<view data-id={item.id} onClick={handleClick}>...</view>
```

### WXS 模块

rsmax 支持通过 ES Module `import` 语法引用外部 `.wxs` 文件。编译器会自动：

1. 将 `.wxs` 文件复制到目标目录
2. 从 JS 中移除 `.wxs` 的 import 语句（WXS 运行在渲染层，不在 JS 逻辑层执行）
3. 在生成的 WXML 文件头部自动注入 `<wxs src="..." module="..." />` 标签

**使用方式：**

```jsx
// pages/index/index.jsx
import { useState } from '@rsmax/runtime';
import tools from './tools.wxs';

export default function Index() {
  const [price] = useState(99.9);

  return (
    <view>
      <text>{tools.formatPrice(price)}</text>
      <text>{tools.toUpperCase('hello')}</text>
    </view>
  );
}
```

对应的 WXS 文件（与页面放在同一目录）：

```javascript
// pages/index/tools.wxs
function formatPrice(price) {
  return '¥' + price.toFixed(2);
}

function toUpperCase(str) {
  return str.toUpperCase();
}

module.exports = {
  formatPrice: formatPrice,
  toUpperCase: toUpperCase
};
```

编译后的 WXML：

```xml
<wxs module="tools" src="./tools.wxs" />
<view>
  <text>{{tools.formatPrice(price)}}</text>
  <text>{{tools.toUpperCase('hello')}}</text>
</view>
```

**支持 import 多个 WXS 模块：**

```jsx
import math from './math.wxs';
import str from './str.wxs';

// 在模板中分别调用 math.double(num), str.toUpperCase(name) 等
```

> **注意**：WXS 函数在 WXML 表达式中调用时，直接使用 import 的模块名访问即可（如 `tools.formatPrice(price)`），编译器会自动去除 `this.data.` 前缀。

## 样式

### 普通样式文件

`.wxss`、`.css`、`.less`、`.scss` 文件直接编译为同名 `.wxss`，class 名保持全局。

### CSS Modules

文件名包含 `.module` 的样式文件启用 CSS Modules（如 `index.module.less`）：

```jsx
import styles from './index.module.less';

<view class={styles.container}>
  <text class={styles.title}>Hello</text>
</view>
```

kebab-case 的 class 名在 JS 中以 camelCase 访问：

```less
.section-title { font-size: 28px; }
```

```jsx
<text class={styles.sectionTitle}>Title</text>
```

### px 自动转 rpx

所有 px 单位自动转换为 rpx（1px → 1rpx，基于 750rpx 设计稿）。大写 `PX` 不转换。

```less
.title {
  font-size: 32px;   /* → font-size: 32rpx */
  border: 1PX solid; /* → border: 1px solid (不转换) */
}
```

## 第三方 UI 组件库

自动检测已安装的 UI 组件库，无需手动配置 `usingComponents`：

| 组件库 | npm 包名 | 标签前缀 |
|-------|---------|---------|
| Vant Weapp | `@vant/weapp` | `van-` |
| TDesign MiniProgram | `tdesign-miniprogram` | `t-` |
| Ant Design Mini | `antd-mini` | `ant-` |

只需在 `package.json` 中安装依赖即可使用：

```bash
pnpm add @vant/weapp
```

```jsx
<van-button type="primary" onClick={handleClick}>按钮</van-button>
<van-cell-group inset>
  <van-cell title="单元格" value="内容" />
</van-cell-group>
```

编译器会自动扫描 JSX 中使用的组件标签，生成对应的 `usingComponents` 配置。

### 自定义组件映射

在项目根目录创建 `rsmax.config.js` 可添加自定义组件映射：

```js
module.exports = {
  components: {
    // 前缀映射：标签前缀 → npm 包名
    'my': 'my-ui-lib',  // <my-button> → my-ui-lib/button/index

    // 自定义解析规则
    'x': {
      packageName: 'my-x-lib',
      resolve(tagName) {
        // x-image-upload → my-x-lib/image-upload/index
        return `my-x-lib/${tagName.slice(2)}/index`;
      }
    },

    // 精确映射：指定单个标签的组件路径
    'custom-header': '/components/header/index'
  }
};
```

### 使用小程序插件组件

在 `app.json` 声明插件后，可通过 `rsmax.config.js` 配置插件组件的便捷映射，**无需再手动写页面/组件 `.json` 的 `usingComponents`**。

**第一步：在 `app.json` 中声明插件**（微信小程序标准方式）：

```json
{
  "plugins": {
    "myPlugin": {
      "version": "1.0.0",
      "provider": "wxidxxxxxxxxxx"
    }
  }
}
```

**第二步：在 `rsmax.config.js` 中配置组件映射**，支持两种方式：

```js
// rsmax.config.js
module.exports = {
  components: {
    // 方式一：精确映射——标签名 → plugin:// 完整路径
    'hello-comp': 'plugin://myPlugin/hello-component',
    'city-select': 'plugin://cityPlugin/select',

    // 方式二：前缀映射（推荐，适合插件提供多个组件）
    // 使用 <mp-xxx /> 自动映射为 plugin://myPlugin/xxx
    'mp': { plugin: 'myPlugin' },

    // 方式三：前缀映射 + 自定义 resolve（插件命名非标准时使用）
    'txv': {
      plugin: 'tencentvideo',
      resolve(tagName) {
        // txv-videoview → plugin://tencentvideo/videoview
        return `plugin://tencentvideo/${tagName.slice(4)}`;
      }
    }
  }
};
```

**第三步：在 JSX 中直接使用插件组件标签**：

```jsx
// 精确映射用法
export default function Index() {
  return (
    <view>
      <hello-comp name="world" />
      <mp-hello />
      <mp-list data-source={list} />
    </view>
  );
}
```

编译后会自动在页面 `.json` 的 `usingComponents` 中生成：

```json
{
  "usingComponents": {
    "hello-comp": "plugin://myPlugin/hello-component",
    "mp-hello": "plugin://myPlugin/hello",
    "mp-list": "plugin://myPlugin/list"
  }
}
```

插件的 JS API（如 `requirePlugin`）按微信小程序官方方式直接调用即可，编译器不做拦截：

```js
const myPlugin = requirePlugin('myPlugin');
myPlugin.someMethod();
```

## npm 包使用

```jsx
import dayjs from 'dayjs';     // → var dayjs = require('dayjs');
import { format } from 'lib';  // → var { format } = require('lib');
import 'polyfill';             // → require('polyfill');

const now = dayjs().format('YYYY-MM-DD');
```

注意：使用 npm 包需在微信开发者工具中执行 **工具 → 构建 npm**。构建产物 `miniprogram_npm` 目录会被 rsmax 构建时自动保留，无需每次构建后重新执行。

## 自定义组件

推荐直接使用 JSX 编写自定义组件，编译器会自动处理组件注册、properties 声明和模板生成。

### 编写一个 JSX 组件

在 `src/components/` 目录下创建组件文件夹，每个组件包含 `.jsx` 入口和可选的样式文件：

```
src/components/
└── header/
    ├── index.jsx          # 组件逻辑 + JSX
    └── index.module.less  # CSS Modules 样式（可选）
```

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
- 生成 `{"component": true}` 的 JSON 配置
- 从函数参数解构中提取 properties（`title`、`subtitle`），支持默认值
- 生成 WXML 模板和 WXSS 样式（含 CSS Modules 哈希类名）
- 注入 Component 生命周期，支持所有 Hooks（useState/useEffect/useComponentEvent 等）

### 在页面中使用组件

**方式一：通过 rsmax.config.js 配置前缀映射（推荐）**

在项目根目录 `rsmax.config.js` 中配置标签前缀到组件路径的映射：

```js
// rsmax.config.js
module.exports = {
  components: {
    // <demo-xxx> 标签 → /components/xxx/index
    'demo': {
      resolve(tagName) {
        const compName = tagName.replace(/^demo-/, '');
        return `/components/${compName}/index`;
      }
    },
    // 也支持精确映射单个标签
    'demo-header': '/components/header/index'
  }
};
```

然后在页面 JSX 中直接使用标签：

```jsx
// src/pages/index/index.jsx
export default function Index() {
  return (
    <view>
      <demo-header title="Hello" subtitle="Welcome to Rsmax" />
    </view>
  );
}
```

**方式二：在页面 JSON 中手动注册**

创建页面同名的 `.json` 文件，手动声明 usingComponents：

```json
// src/pages/index/index.json
{
  "usingComponents": {
    "demo-header": "/components/header/index"
  }
}
```

> **注意**：`createApp`、`createPage`、`createComponent` 是编译器内部函数，不要在代码中直接调用或导入。只需 `export default` 你的函数或对象即可，编译器会自动完成包装。

### 原生小程序组件

`components/` 目录同时支持原生小程序组件（WXML + WXSS + JS 四件套），与 JSX 组件共存。原生组件的文件会被原样复制到 dist，编译器自动生成 `{"component": true}` 的 JSON 配置。

```
src/components/
└── badge/
    ├── index.js      # 使用原生 Component() 构造器
    ├── index.wxml    # WXML 模板
    └── index.wxss    # WXSS 样式（直接用 rpx 单位）
```

```js
// src/components/badge/index.js
Component({
  properties: {
    value: { type: null, value: '' },
    type: { type: String, value: 'normal' }
  }
});
```

```xml
<!-- src/components/badge/index.wxml -->
<view class="badge {{type === 'dot' ? 'badge-dot' : ''}}">
  <text class="badge-text" wx:if="{{type !== 'dot'}}">{{value}}</text>
</view>
```

原生组件在 JSX 页面中通过 `rsmax.config.js` 前缀映射引用，与 JSX 组件使用方式完全一致：

```jsx
<demo-badge value="3"/>
<demo-badge value="99+"/>
<demo-badge type="dot"/>
```

> 原生组件的 `.js` 文件**不要**使用 `export default`（否则会被编译器当作函数式组件转换），直接调用 `Component({...})` 即可。

### Options API 组件

也支持传统的对象配置写法，与原生小程序 Component 一致：

```jsx
export default {
  properties: {
    title: String
  },
  data: {
    count: 0
  },
  methods: {
    increment() {
      this.setData({ count: this.data.count + 1 });
    }
  },
  render() {
    return (
      <view>
        <text>{this.data.title}: {this.data.count}</text>
        <button onClick={this.increment}>+1</button>
      </view>
    );
  }
};
```

## 注意事项

1. **构建 npm**：首次使用第三方 npm 包或 UI 库后，需在微信开发者工具中执行「工具 → 构建 npm」。后续 rsmax build/dev 会自动保留 `miniprogram_npm`，无需重复构建。

2. **px 单位**：代码中写 `px` 会被自动转为 `rpx`（1:1，基于 750rpx 宽度设计稿）。大写 `PX` 不转换。

3. **样式隔离**：Vant 等第三方 UI 组件默认启用样式隔离，页面样式无法穿透组件内部。如需控制布局，对组件宿主元素设置 margin/display 即可。

4. **小程序 API**：`wx` 对象全局可用，如 `wx.navigateTo`、`wx.request` 等。

## Packages

| 包 | 说明 |
|----|------|
| `rsmax` | CLI 入口，提供 build/dev/clean 命令 |
| `@rsmax/compiler` | 编译器核心：JSX→WXML、JS 转换、样式编译、CSS Modules、组件解析、i18n 按需加载 |
| `@rsmax/runtime` | 运行时：Hooks 实现（useState/useEffect/useContext/useStore 等）、Page/Component/App 包装器、promisify 工具函数 |
| `@rsmax/store` | 类 Zustand 状态管理库，支持微信缓存持久化中间件 |
| `@rsmax/i18n` | 国际化运行时：基于 JS 模块的多语言支持，含 useI18n Hook、语言切换、变量插值、懒加载 |
| `@rsmax/babel-plugin-jsx-to-wxml` | Babel 插件：JSX AST → WXML 字符串转换（含 t() → __i18n 数据绑定转换） |
| `@rsmax/babel-plugin-transform-js` | Babel 插件：转换 ES6 import、注入 rsmax runtime、处理 CSS Modules、store 和 i18n 路径重写 |
| `@rsmax/postcss-px2units` | PostCSS 插件：px → rpx 单位转换 |

## License

MIT
