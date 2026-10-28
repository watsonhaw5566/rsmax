# NPM 依赖与构建

rsmax 支持在小程序项目中使用 npm 包（如 `dayjs`、`@vant/weapp` 等）。与原生小程序一样，npm 包需要经过「构建 npm」生成 `miniprogram_npm` 后才能在运行时被解析。

rsmax 将这一步集成到了 `build` / `dev` 流程中，**默认自动完成**，无需再到微信开发者工具里手动点击「工具 → 构建 npm」。

## 工作原理

rsmax 内置了一套精简的「构建 npm」实现，将项目 `package.json` 中声明的 `dependencies` 构建为 `miniprogram_npm`，直接输出到产物目录（与 `app.json` 同级）。**无需安装任何额外工具**，`rsmax build` / `rsmax dev` 开箱即用。

构建规则与微信开发者工具的「工具 → 构建 npm」保持一致：

1. 从项目根目录的 `dependencies` 出发，按 Node 模块解析规则（`node_modules` 向上查找 + symlink realpath，兼容 npm / yarn / pnpm / monorepo）收集运行时可达的依赖包；
2. **小程序组件包**（`package.json` 含 `miniprogram` 字段或存在 `miniprogram_dist` 目录，如 `@vant/weapp`）：整目录拷贝到 `miniprogram_npm`；
3. **普通 JS 包**（如 `dayjs`）：打包为单文件 `index.js`，包内的相对 `require` 与 `import` 被就地改写合并，跨包依赖保留为原生 `require`，由微信运行时从 `miniprogram_npm` 解析；
4. `devDependencies` 不会被打包。

> rsmax 不再依赖 `miniprogram-ci`，避免了其约 20MB 的体积与传递依赖问题。构建产物与开发者工具「构建 npm」语义兼容，可直接在小程序中使用。

## 自动构建流程

`rsmax build src -o dist` 的完整流程：

1. 编译 JSX / JS / 样式等源文件 → 输出到 `dist/`
2. 读取项目根目录的 `package.json`，若存在 `dependencies` 则执行 npm 构建
3. 在 `dist/` 下生成 `miniprogram_npm/`
4. 输出构建结果摘要：`miniProgram` 包数量、`other` 包数量、警告列表

```
[rsmax] Compiling .../src -> .../dist
[rsmax] Environment mode: production (0 variables)
[rsmax] Building npm (miniprogram_npm)...
[rsmax] npm build complete (1.2s) miniProgram: 1, other: 2
success [rsmax] Compilation complete!
```

`rsmax dev` 同理：首次全量编译时会构建 npm；后续文件变更的增量编译**不会**重复构建 npm（npm 包在开发过程中不会变化）。

## 关闭自动构建

如果项目不使用任何 npm 包，或希望完全由微信开发者工具负责构建 npm，可以关闭自动构建。

### 方式一：CLI 参数

```bash
rsmax build src -o dist --no-npm
rsmax dev src -o dist --no-npm
```

### 方式二：配置文件

在 `rsmax.config.js` 中设置 `npm: false`：

```js
module.exports = {
  npm: false,
};
```

## 自定义忽略规则

通过 `npm.ignores` 指定构建 npm 时需要排除的包或文件模式（支持 `*`、`**`、`?` 通配符）：

```js
module.exports = {
  npm: {
    ignores: ['some-ignored-package/**/*'],
  },
};
```

- 匹配到的 `package.json` 所在包会被整体跳过；
- 对小程序组件包，匹配到的文件不会被拷贝。

## project.config.json 配置

为了让微信开发者工具识别 rsmax 生成的 `miniprogram_npm`，需在 `project.config.json` 中配置 `packNpmManually` 与 `packNpmRelationList`：

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

- `packageJsonPath`：声明 npm 依赖的 `package.json` 所在目录（项目根目录）；
- `miniprogramNpmDistDir`：`miniprogram_npm` 的输出目录（rsmax 产物目录）；
- rsmax 会保留已生成的 `miniprogram_npm`，不会在增量构建时清空。

## 使用 npm 包

### JS 工具库

直接 `import` / `require`，rsmax 会保留模块引用，运行时由 `miniprogram_npm` 解析：

```js
import dayjs from 'dayjs';

Page({
  data: {
    today: dayjs().format('YYYY-MM-DD'),
  },
});
```

### 小程序组件库

以 `@vant/weapp` 为例，在 `rsmax.config.js` 中配置组件前缀映射后，JSX 中直接使用 `<van-button />`：

```js
// rsmax.config.js
module.exports = {
  components: {
    van: '@vant/weapp',
  },
};
```

```jsx
// src/pages/index/index.jsx
export default function Home() {
  return <van-button type="primary">按钮</van-button>;
}
```

rsmax 会自动在页面 JSON 中注入 `usingComponents`，运行时从 `miniprogram_npm/@vant/weapp/...` 加载组件。详细用法见 [第三方 UI 库](./ui-libraries)。

## 常见问题

**Q: 需要安装 `miniprogram-ci` 吗？**

A: 不需要。rsmax 已内置 npm 构建能力，`rsmax build` / `rsmax dev` 会自动生成 `miniprogram_npm`。若项目不需要自动构建，可添加 `--no-npm` 或在配置中设置 `npm: false`。

**Q: 运行时报 `module not found`？**

A: 检查 `miniprogram_npm` 是否生成于产物目录，以及 `project.config.json` 的 `packNpmRelationList` 路径是否正确。rsmax 输出目录需与 `miniprogramNpmDistDir` 一致。

**Q: `miniprogram_npm` 没有被重新生成？**

A: 增量编译（`dev` 模式下的文件变更）不会触发 npm 构建。若修改了 `package.json` 的依赖，请重启 `dev` 或执行一次 `build`。

**Q: 同一个包存在多个版本时如何处理？**

A: rsmax 以首次解析到的版本为准（通常是 `node_modules` 顶层的版本），其余同名版本会被跳过并输出告警。小程序运行时不支持同名包多版本共存，这与微信开发者工具「构建 npm」行为一致。
