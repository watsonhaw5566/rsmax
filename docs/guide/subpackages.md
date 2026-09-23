# 分包加载

Rsmax 完整支持微信小程序的[分包加载](https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html)，包括普通分包与独立分包。只需按微信标准在 `app.json` 中声明 `subPackages`（或 `subpackages`），编译器会自动处理：

- 分包内页面 / 组件的 JSX 编译；
- 运行时文件（`rsmax-runtime.js`、`rsmax-store.js`、`rsmax-i18n.js`）的相对路径；
- 普通分包复用主包运行时，不重复拷贝；
- 独立分包在分包根目录独立拷贝一份运行时。

## 配置

```json
{
  "pages": ["pages/index/index"],
  "subPackages": [
    {
      "root": "packageA",
      "pages": ["pages/detail/index", "pages/list/index"]
    },
    {
      "root": "packageB",
      "pages": ["pages/home/index"],
      "independent": true
    }
  ]
}
```

## 目录结构

```
src/
├── app.js
├── app.json
├── pages/
│   └── index/index.jsx        # 主包页面
├── packageA/                  # 普通分包
│   ├── pages/detail/index.jsx
│   └── components/badge/      # 分包内组件
└── packageB/                  # 独立分包
    └── pages/home/index.jsx
```

## 编写分包页面

与主包完全一致，直接使用 Hooks 或 Options API：

```jsx
// src/packageA/pages/detail/index.jsx
import { useState } from '@rsmax/runtime';

export default function Detail() {
  const [count, setCount] = useState(0);

  return (
    <view>
      <text>分包页面 count：{count}</text>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </view>
  );
}
```

## 独立分包注意事项

- 独立分包会在其根目录独立拷贝一份运行时文件，保证可独立运行；
- 独立分包中的页面 / 组件不应依赖主包资源（微信官方约束）；
- `@rsmax/runtime`、`@rsmax/store`、`@rsmax/i18n` 的 import 照常书写，编译器自动处理路径。

## 运行时路径规则

| 场景 | 运行时位置 | 引用方式 |
|------|-----------|----------|
| 主包页面 | 主包根目录 | 同级相对路径 |
| 普通分包页面 | 主包根目录（共享） | 回溯到主包的相对路径 |
| 独立分包页面 | 分包根目录（独立拷贝） | 回溯到分包根的相对路径 |
| 分包内组件 | 与同包页面一致 | 根据所在包自动计算 |
