# Rsmax JSX [![npm version](https://shields.io/npm/v/rsmax.svg)](https://npmjs.com/package/rsmax)

一个基于 Babel 的 **JSX 微信小程序开发框架**，让你用 React 风格的 JSX 语法和 Hooks API 编写微信小程序。编写一份 `.jsx`，编译器自动产出 `.js` / `.wxml` / `.wxss` / `.json`。

```jsx
import { useState } from '@rsmax/runtime';

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <view>
      <text>{count}</text>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </view>
  );
}
```

## 特性

- **JSX + Hooks** — JSX 编写 WXML，支持 `useState`、`useEffect`、`usePageEvent` 等 Hooks，同时兼容 Options API
- **样式** — 内置 Less/Sass、CSS Modules 局部作用域、px 自动转 rpx
- **生态** — 自动识别 Vant Weapp、TDesign、Ant Design Mini，支持自定义组件与小程序插件映射
- **状态管理** — 类 Zustand 的 `@rsmax/store`，支持微信缓存持久化
- **国际化** — `@rsmax/i18n` 语言包懒加载，JSX 中 `t('key')` 自动编译为数据绑定
- **工程能力** — `process.env` 编译时注入、WXS import、npm 包转 CommonJS、分包、监听模式
- **渐进式迁移** — 原生小程序文件与 JSX 文件可在同一项目共存

## 快速开始

```bash
pnpm add -D rsmax
rsmax dev src -o dist
```

## 文档

[完整文档请访问](rsmax.watsonhaw.top)

```bash
pnpm docs:dev      # 本地预览
pnpm docs:build    # 构建文档
```

## License

MIT
