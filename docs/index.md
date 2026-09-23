---
layout: home

hero:
  name: Rsmax
  tagline: 用 React 风格的 JSX 与 Hooks 编写微信小程序
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 功能简介
      link: /guide/introduction

features:
  - icon: ⚛️
    title: JSX + Hooks
    details: 用熟悉的 JSX 编写 WXML，支持 useState、useEffect、useContext、usePageEvent 等 React 风格 Hooks，同时兼容 Options API。
  - icon: 🎨
    title: 样式方案齐全
    details: 内置 Less/Sass，支持 CSS Modules 自动哈希局部作用域，px 自动转 rpx（按 750rpx 设计稿）。
  - icon: 🧩
    title: 第三方 UI 库
    details: 自动识别并注册 Vant Weapp、TDesign MiniProgram、Ant Design Mini 组件，也支持自定义组件与小程序插件映射。
  - icon: 🗃️
    title: 状态管理
    details: 内置类 Zustand 的轻量状态库 @rsmax/store，支持 selector 订阅与微信缓存持久化中间件。
  - icon: 🌍
    title: 国际化
    details: 基于 JS 模块的 @rsmax/i18n，语言包懒加载，JSX 中 t('key') 自动编译为 WXML 数据绑定。
  - icon: 🔧
    title: 编译时能力
    details: process.env 编译时静态替换（零运行时开销）、WXS import、npm 包转 CommonJS、分包与监听模式。
---
