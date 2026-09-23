# 简介

Rsmax 是一个基于 Babel 的 **JSX 微信小程序开发框架**，让你用 React 风格的 JSX 语法和 Hooks API 编写微信小程序。

编写一份 `.jsx` 文件，编译器会把它转换为小程序运行所需的 `.js` / `.wxml` / `.wxss` / `.json` 文件，无需手写模板与 `setData` 胶水代码。

```jsx
import { useState } from '@rsmax/runtime';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <view class="container">
      <text>{count}</text>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </view>
  );
}
```

## 特性

- **JSX 语法** — 用熟悉的 JSX 编写 WXML 模板，支持条件渲染、列表渲染、事件绑定、Fragment
- **Hooks API** — `useState`、`useEffect`、`useContext`、`usePageEvent`、`useAppEvent`、`useStore` 等 React 风格 Hooks
- **两种编程范式** — 支持函数式组件（Hooks）和 Options API（传统小程序 Page/Component 配置）
- **API Promise 化** — 内置 `promisify` 工具函数，将小程序回调 API 转换为 Promise，支持 async/await
- **环境变量注入** — 零依赖、无运行时开销；`.env` 文件、`RSMAX_*` 系统变量、`define` 配置三层来源，`process.env.XXX` 编译时替换为字面量
- **CSS Modules** — `.module.less` / `.module.css` / `.module.scss` 自动局部作用域，class 名自动 hash
- **样式预处理** — 内置 Less/Sass，px 自动转 rpx（1px → 1rpx，按 750rpx 设计稿）
- **第三方 UI 库** — 自动识别并注册 Vant Weapp、TDesign MiniProgram、Ant Design Mini 组件
- **状态管理** — 类 Zustand 的轻量状态库 `@rsmax/store`，支持微信缓存持久化
- **国际化** — 基于 JS 模块的 `@rsmax/i18n`，语言包懒加载，JSX 中 `t('key')` 自动转为 WXML 数据绑定
- **WXS 模块** — 通过 `import` 引用外部 `.wxs` 文件，编译器自动注入 WXML 标签
- **分包支持** — 完整支持普通分包与独立分包，自动处理运行时路径
- **渐进式迁移** — 原生文件与 JSX 文件可在同一项目中共存，按页面 / 组件 / 分包逐步迁移

## 包结构

Rsmax 采用多包（pnpm workspace）架构，各包职责单一：

| 包 | 说明 |
|----|------|
| `rsmax` | CLI 入口，提供 build / dev / clean 命令 |
| `@rsmax/compiler` | 编译器核心：JSX→WXML、JS 转换、样式编译、CSS Modules、组件解析、i18n 按需加载 |
| `@rsmax/runtime` | 运行时：Hooks 实现、Page/Component/App 包装器、`promisify` |
| `@rsmax/store` | 类 Zustand 状态管理库，支持微信缓存持久化中间件 |
| `@rsmax/i18n` | 国际化运行时：多语言、语言切换、变量插值、懒加载 |
| `@rsmax/babel-plugin-jsx-to-wxml` | Babel 插件：JSX AST → WXML 字符串 |
| `@rsmax/babel-plugin-transform-js` | Babel 插件：import 转换、运行时注入、CSS Modules、路径重写 |

日常开发中你只需要安装 `rsmax`，并从 `@rsmax/runtime`、`@rsmax/store`、`@rsmax/i18n` 引入能力即可。

## 下一步

- 跟随 [快速开始](./getting-started) 搭建第一个项目
- 查阅 [CLI 命令](./cli) 了解构建与监听
- 从 [JSX 语法](./jsx) 开始学习写法
