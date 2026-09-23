# 快速开始

## 环境要求

- Node.js >= 20
- pnpm >= 10
- 微信开发者工具

## 安装

在你的小程序项目中安装 `rsmax`：

```bash
pnpm add rsmax
```

## 项目结构

```
your-project/
├── src/                        # 源码目录
│   ├── app.js                  # App 入口
│   ├── app.json                # 小程序配置
│   ├── app.wxss                # 全局样式
│   ├── pages/
│   │   └── index/
│   │       ├── index.jsx       # 页面逻辑 + JSX 模板
│   │       ├── index.less      # 页面样式（或 .wxss/.css/.scss）
│   │       ├── index.module.less  # CSS Modules 样式
│   │       └── index.json      # 页面配置（可选）
│   └── components/             # 自定义组件
├── locales/                    # 多语言文件目录（可选）
│   ├── zh-CN.js
│   └── en.js
├── public/                     # 静态资源目录（可选，与 src/ 同级）
├── project.config.json         # 微信开发者工具项目配置
├── package.json
└── rsmax.config.js             # rsmax 配置（可选）
```

## project.config.json

关键配置项（确保 npm 构建与产物目录正确）：

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

## 编写第一个页面

一个页面就是一个默认导出函数的 `.jsx` 文件：

```jsx
// src/pages/index/index.jsx
import { useState } from '@rsmax/runtime';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <view class="container">
      <text>Count: {count}</text>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </view>
  );
}
```

在 `src/app.json` 中注册页面路径（不带扩展名，与原生小程序一致）：

```json
{
  "pages": ["pages/index/index"]
}
```

## 构建与预览

```bash
# 监听模式开发（默认 mode=development）
npx rsmax dev src -o dist

# 生产构建（默认 mode=production）
npx rsmax build src -o dist
```

然后在微信开发者工具中打开项目根目录，工具会加载 `dist/` 作为小程序根目录。

::: tip 建议
把命令写入 `package.json` 的 scripts 中，例如 `"dev": "rsmax dev src -o dist"`、`"build": "rsmax build src -o dist"`。
:::

## 使用 npm 包

首次使用第三方 npm 包后，需在微信开发者工具中执行 **工具 → 构建 npm**。构建产物 `miniprogram_npm` 目录会被 rsmax 自动保留，无需重复构建。详见 [CLI 命令](./cli)。
