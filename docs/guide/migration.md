# 渐进式迁移

Rsmax 天然支持渐进式使用：原生小程序文件与 JSX 文件可以在同一个项目中共存，编译器按文件类型自动选择处理方式，无需一次性重写整个项目。

## 文件处理规则

| 文件类型 | 处理方式 |
|---------|---------|
| `.jsx` | 总是编译为小程序页面 / 组件 |
| `.js` + 有 `export default` | 按 Page / Component 编译（函数式或 `render()`） |
| `.js` + 无 `export default` | 直接复制，ES6 import/export 转 CommonJS |
| `.wxml` / `.wxss` / `.wxs` / `.json` | 原样复制到产物 |
| 图片、字体等静态资源 | 原样复制 |
| `public/` 目录 | 复制到产物根目录 |

## 方案一：按页面迁移（推荐）

从最简单的页面开始，逐个迁移。

**迁移前：**

```
src/pages/legacy/
├── index.js
├── index.wxml
├── index.wxss
└── index.json
```

**迁移步骤：** 删除 `index.wxml`，把 `index.js` 改为 `index.jsx`（或保留 `.js` 后缀改用 `export default`），用 `render()` 重写模板，逻辑代码大部分可复用。

```jsx
export default {
  data: { list: [] },
  onLoad() {
    // 原有逻辑基本不动
  },
  render() {
    return (
      <view class="list">
        {this.data.list.map(item => (
          <view key={item.id} class="item">{item.title}</view>
        ))}
      </view>
    );
  },
};
```

`app.json` 中的页面路径无需修改。

## 方案二：按组件迁移

先迁移小组件。JSX 编译出的组件与原生组件完全兼容，可以被原生页面通过 `usingComponents` 正常引用；JSX 页面也能直接使用原生组件。

```
src/components/
├── old-card/      # 保持原生
│   ├── index.js
│   └── index.wxml
└── new-button/    # 新组件用 JSX
    └── index.jsx
```

## 方案三：先 Options API，再切 Hooks

不熟悉函数式组件时，可先用接近原生的 Options API 过渡，再逐步重构为 Hooks。两种写法编译输出等价，可长期共存。参见 [组件](./components) 与 [Hooks API](./hooks)。

## 方案四：按分包迁移

把新增功能的分包全部用 JSX 编写，旧分包保持原生。分包内写法与主包一致，运行时路径由编译器自动处理。参见 [分包加载](./subpackages)。

## 互通性

迁移期间两种写法无缝互通：

- 原生页面引用 JSX 编译的组件；
- JSX 页面引用原生组件；
- 样式文件（`.wxss` / `.less` / `.scss`）无需修改；
- 工具函数、Store 等 JS 模块完全共享；
- `app.js`、`app.json`、`app.wxss` 完全兼容原生写法。

## 注意事项

1. **同一页面二选一**：不要在页面目录下同时存在 `index.wxml` 与同名 `index.jsx`（会生成两份模板造成覆盖）；
2. **样式文件可复用**：同名样式文件会被自动识别编译为 `.wxss`，无需改名；
3. **`miniprogram_npm` 自动保护**：构建时不会清空该目录；
4. **`app.json` 路径不变**：无论原生还是 JSX，页面路径都写 `pages/xxx/index`；
5. **原生 `.wxs`**：可继续保留原生写法，或迁移为 `import tools from './tools.wxs'`。

## 推荐迁移顺序

```
① 工具函数 / 常量 → 直接复用
② 新增公共组件   → 全部用 JSX
③ 样式文件       → 直接复用
④ 简单展示页面   → 练手
⑤ 复杂表单页面   → 熟悉后迁移
⑥ 首页等核心页面 → 最后迁移
```

每个阶段都可独立验证，随时可回退（把 `.jsx` 改回 `.js` + `.wxml`）。
