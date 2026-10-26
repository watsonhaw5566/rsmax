# NPM 依赖与构建

rsmax 支持在小程序项目中使用 npm 包（如 `dayjs`、`@vant/weapp` 等）。与原生小程序一样，npm 包需要经过「构建 npm」生成 `miniprogram_npm` 后才能在运行时被解析。

rsmax 将这一步集成到了 `build` / `dev` 流程中，**默认自动完成**，无需再到微信开发者工具里手动点击「工具 → 构建 npm」。

## 工作原理

rsmax 内部调用 [`miniprogram-ci`](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html) 的 `packNpmManually` 接口，将项目 `package.json` 中声明的 `dependencies` 构建为 `miniprogram_npm`，直接输出到产物目录（与 `app.json` 同级）。

之所以使用 `packNpmManually` 而非 `packNpm`，是因为在 rsmax 项目中 `node_modules` 通常位于小程序产物目录之外（项目根目录或 monorepo 工作区根目录），需要显式指定 `package.json` 路径与 `miniprogram_npm` 输出目录。

## 安装 miniprogram-ci

`miniprogram-ci` 是 rsmax 的可选运行时依赖，**只需安装一次**：

```bash
pnpm add miniprogram-ci
# 或
npm install miniprogram-ci
```

安装后，`rsmax build` 和 `rsmax dev` 会自动在编译完成后执行 npm 构建。

> 如果未安装 `miniprogram-ci`，rsmax 会在构建时打印一行警告并跳过 npm 构建，不影响主流程。此时仍可在微信开发者工具中手动「构建 npm」。

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

通过 `npm.ignores` 指定构建 npm 时需要排除的文件 / 目录模式，透传给 `packNpmManually`：

```js
module.exports = {
  npm: {
    ignores: ['some-ignored-package/**/*'],
  },
};
```

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

**Q: 构建时报 `miniprogram-ci is not installed`？**

A: 在项目目录执行 `pnpm add miniprogram-ci` 安装即可。若不需要自动构建，添加 `--no-npm` 或在配置中设置 `npm: false`。

**Q: 运行时报 `module not found`？**

A: 检查 `miniprogram_npm` 是否生成于产物目录，以及 `project.config.json` 的 `packNpmRelationList` 路径是否正确。rsmax 输出目录需与 `miniprogramNpmDistDir` 一致。

**Q: `miniprogram_npm` 没有被重新生成？**

A: 增量编译（`dev` 模式下的文件变更）不会触发 npm 构建。若修改了 `package.json` 的依赖，请重启 `dev` 或执行一次 `build`。
