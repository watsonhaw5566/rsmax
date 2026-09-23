# 静态资源

`public/` 目录用于存放不需要编译处理的静态资源，文件会**直接复制到产物根目录**并保持目录结构。

## 放置位置

支持两种位置（与 `locales/` 一致）：

- **项目根目录**（推荐）：与 `src/` 同级，`public/icon.png` → `dist/icon.png`；
- **源码目录内**：`src/public/`，仅在根目录没有 `public/` 时生效。

根目录的 `public/` 优先级更高，两者同时存在时只使用根目录的。

```
public/
├── icon.png
├── logo.svg
├── sitemap.json
└── images/
    └── banner.jpg
```

构建后：

```
dist/
├── icon.png
├── logo.svg
├── sitemap.json
└── images/
    └── banner.jpg
```

## 引用方式

使用以 `/` 开头的绝对路径（相对于小程序根目录解析）：

```jsx
<image src="/icon.png" />
<image src="/images/banner.jpg" />
```

样式中同样支持：

```css
.header {
  background-image: url('/images/banner.jpg');
}
```

## 监听模式

`rsmax dev` 下 `public/` 目录的变化会自动同步：

- 新增 / 修改文件 → 自动复制更新到产物；
- 删除文件 → 自动从产物移除；
- 新增 / 删除子目录 → 自动同步；
- 根目录与 `src/public/` 两种位置均支持监听。
