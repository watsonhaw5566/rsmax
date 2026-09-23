# 样式

Rsmax 支持 `.wxss`、`.css`、`.less`、`.scss`、`.sass` 样式文件，提供预处理、CSS Modules 与 px 转 rpx 能力。

## 普通样式文件

与页面 / 组件同名的样式文件会自动编译为同名 `.wxss`，class 名保持全局：

```
pages/index/
├── index.jsx
└── index.less    → index.wxss
```

也可以在 JSX 中显式导入：

```jsx
import './index.less';
```

## CSS Modules

文件名包含 `.module` 的样式文件自动启用 CSS Modules（局部作用域 + class 名哈希）：

```jsx
import styles from './index.module.less';

export default function Page() {
  return (
    <view class={styles.container}>
      <text class={styles.title}>Hello</text>
    </view>
  );
}
```

kebab-case 的 class 名在 JS 中以 camelCase 访问：

```less
.section-title {
  font-size: 28px;
}
```

```jsx
<text class={styles.sectionTitle}>Title</text>
```

支持的后缀：`.module.less`、`.module.css`、`.module.scss`。

## px 自动转 rpx

样式中的 `px` 单位会自动转换为 `rpx`，换算比例为 **1px → 1rpx**（即按 750rpx 宽度设计稿直接写 px 数值）：

```less
.title {
  font-size: 32px;   /* → font-size: 32rpx */
  border: 1PX solid; /* 大写 PX 不转换 → border: 1px solid */
}
```

需要保留真实 px 的场景（极少数）使用大写 `PX`。

## 样式隔离

Vant 等第三方 UI 组件默认启用样式隔离，页面样式无法穿透组件内部。如需控制布局，对组件宿主元素设置 `margin` / `display` 等即可。

## 全局样式

`src/app.wxss`（或 `app.less` / `app.scss`）为全局样式文件，与原生小程序一致，对所有页面生效。

## 在 WXSS 中引用静态资源

可使用 `/` 开头的绝对路径引用 `public/` 目录下的资源：

```css
.header {
  background-image: url('/images/banner.jpg');
}
```

详见 [静态资源](./assets)。
