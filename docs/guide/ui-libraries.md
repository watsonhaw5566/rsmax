# 第三方 UI 库与组件映射

## 内置 UI 库（自动识别）

编译器根据 `package.json` 的依赖自动识别已安装的 UI 库，扫描 JSX 中使用的标签并生成 `usingComponents`，**无需任何手动配置**：

| 组件库 | npm 包名 | 标签前缀 | 路径规则示例 |
|-------|---------|---------|-------------|
| Vant Weapp | `@vant/weapp` | `van-` | `van-button` → `@vant/weapp/button/index` |
| TDesign MiniProgram | `tdesign-miniprogram` | `t-` | `t-button` → `tdesign-miniprogram/button/button` |
| Ant Design Mini | `antd-mini` | `ant-` | `ant-button` → `antd-mini/Button/index` |

安装后直接使用（UI 组件库属于小程序运行时依赖，请安装到 `dependencies`，**不要加 `-D`**，否则「构建 npm」扫描不到）：

```bash
pnpm add @vant/weapp
```

```jsx
<van-button type="primary" onClick={handleClick}>按钮</van-button>
<van-cell-group inset>
  <van-cell title="单元格" value="内容" />
</van-cell-group>
```

> 首次安装后需在微信开发者工具中执行 **工具 → 构建 npm**。

## 自定义组件映射

在 `rsmax.config.js` 的 `components` 字段中配置标签到组件的映射，支持三种形式：

```js
module.exports = {
  components: {
    // 1. 前缀映射到 npm 包（使用默认解析：<my-button> → my-ui-lib/button/index）
    my: 'my-ui-lib',

    // 2. 前缀 + 自定义解析规则
    x: {
      packageName: 'my-x-lib',
      resolve(tagName) {
        // x-image-upload → my-x-lib/image-upload/index
        return `my-x-lib/${tagName.slice(2)}/index`;
      },
    },

    // 3. 精确映射单个标签
    'custom-header': '/components/header/index',
  },
};
```

## 小程序插件组件

在 `app.json` 声明插件后，通过 `rsmax.config.js` 配置映射，无需再手写各页面 JSON 的 `usingComponents`。

第一步，`app.json` 声明插件：

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

第二步，配置组件映射：

```js
module.exports = {
  components: {
    // 精确映射
    'hello-comp': 'plugin://myPlugin/hello-component',

    // 前缀映射：<mp-xxx /> → plugin://myPlugin/xxx
    mp: { plugin: 'myPlugin' },

    // 前缀映射 + 自定义 resolve（插件命名非标准时）
    txv: {
      plugin: 'tencentvideo',
      resolve(tagName) {
        return `plugin://tencentvideo/${tagName.slice(4)}`;
      },
    },
  },
};
```

第三步，在 JSX 中直接使用：

```jsx
<hello-comp name="world" />
<mp-hello />
<mp-list dataSource={list} />
```

插件的 JS API 按微信官方方式直接调用，编译器不拦截：

```js
const myPlugin = requirePlugin('myPlugin');
myPlugin.someMethod();
```

## 解析优先级

当一个标签同时命中多条规则时：

1. `config.components` 中的**精确标签匹配**（本地路径或 `plugin://` URL）；
2. `config.components` 中的**前缀匹配**（自定义预设或插件前缀）；
3. 自动检测到的**内置 UI 库预设**（van / t / ant）。
