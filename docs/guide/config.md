# 配置参考

## rsmax.config.js

放在项目根目录（源目录的父目录），是可选的 CommonJS 配置文件：

```js
module.exports = {
  // 自定义组件 / UI 库 / 插件组件映射
  components: {},

  // 路径别名（默认内置 '@' -> 源码目录）
  alias: {},

  // 编译时注入的环境变量（优先级最高）
  define: {},
};
```

### components

配置 JSX 标签到组件路径的解析规则，支持三种形式：

```js
module.exports = {
  components: {
    // 1) 前缀 → npm 包名（默认解析：<my-button> → my-ui-lib/button/index）
    my: 'my-ui-lib',

    // 2) 前缀 → 自定义解析对象
    x: {
      packageName: 'my-x-lib',
      resolve(tagName) {
        return `my-x-lib/${tagName.slice(2)}/index`;
      },
    },

    // 插件前缀：<mp-xxx /> → plugin://myPlugin/xxx
    mp: { plugin: 'myPlugin' },

    // 3) 精确标签映射（本地路径或 plugin:// URL）
    'custom-header': '/components/header/index',
    'hello-comp': 'plugin://myPlugin/hello-component',
  },
};
```

解析优先级与更多示例见 [第三方 UI 库与组件映射](./ui-libraries)。

### alias

路径别名，用于缩短 `import` / `require` 的相对路径。内置默认别名 `@`，指向源码目录（CLI 传入的 `src`），无需任何配置即可使用：

```js
// src/pages/home/index.jsx
import { add } from '@/utils/helper'; // -> src/utils/helper
```

也可以在 `rsmax.config.js` 中覆盖 `@` 或新增别名；相对路径基于项目根目录（配置文件所在目录）解析：

```js
const path = require('node:path');

module.exports = {
  alias: {
    '@': path.resolve(__dirname, 'src'), // 默认值，可覆盖
    '@components': path.resolve(__dirname, 'src/components'),
    '@data': './src/data', // 也支持相对路径
  },
};
```

匹配规则：引用与别名完全相等、或以 `别名/` 开头时命中；多个别名同时命中取最长者。因此 `@` 不会影响 `@rsmax/runtime`、`@babel/core` 这类 npm 包名，`@components` 也不会误匹配 `@components-x/...`。

作用范围：JS/JSX 中的 `import`、`require()`、`export ... from`，以及通过 JS 引入的样式文件和 WXS 文件（`<wxs src>` 会同步改写）。编译后别名统一被改写为相对路径，无扩展名与目录索引（`index.js`）的解析规则与微信原生 `require` 保持一致。

> 注意：别名只负责路径改写，不改变小程序的分包引用限制——普通分包可以引用主包文件，独立分包不能引用主包文件，配置别名时需自行保证引用关系合法。

### define

编译时静态替换的变量，支持字符串、数字、布尔值、`null`、`undefined` 及可 JSON 序列化的对象 / 数组：

```js
module.exports = {
  define: {
    API_BASE: 'https://api.rsmax.dev',
    TIMEOUT: 10000,
    DEBUG: false,
    FEATURE_FLAGS: { enableDarkMode: false },
  },
};
```

`define` 的优先级高于 `.env` 文件与 `--mode` 注入。完整说明见 [环境变量](./env)。

## 环境文件

通过 CLI 的 `--mode` 参数决定加载的 `.env.<mode>` 文件：

| 文件 | 加载时机 |
|------|----------|
| `.env` | 始终 |
| `.env.local` | 始终（不提交 git） |
| `.env.<mode>` | mode 匹配时 |
| `.env.<mode>.local` | mode 匹配时（最高优先级） |

## CLI 参数

见 [CLI 命令](./cli)：

- `-o, --output`：产物目录，默认 `dist`；
- `-m, --mode`：环境模式，`dev` 默认 `development`，`build` 默认 `production`。

## project.config.json

微信开发者工具侧的关键配置：

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

- `miniprogramRoot` 指向 rsmax 的产物目录；
- 关闭工具自带的 ES6 转 ES5 与 postcss（rsmax 已处理）；
- 通过 `packNpmManually` 让「构建 npm」产物输出到 `dist/`，rsmax 会自动保留 `miniprogram_npm`。

## app.json

完全遵循微信小程序原生规范，无需额外字段：

- `pages`：页面路径（不带扩展名）；
- `subPackages` / `subpackages`：分包配置，支持 `independent: true`；
- `tabBar.custom: true`：开启后在 `src/custom-tab-bar/` 编写自定义 TabBar；
- `plugins`：声明小程序插件。

## package.json scripts 示例

```json
{
  "scripts": {
    "dev": "rsmax dev src -o dist",
    "build": "rsmax build src -o dist",
    "clean": "rsmax clean dist"
  }
}
```
