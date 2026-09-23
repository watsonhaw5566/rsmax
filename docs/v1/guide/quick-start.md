# 快速上手

使用 `create-rsmax` 选择你要创建的小程序。

受支持的小程序列表：

- 阿里系小程序
- 微信小程序 (包括 QQ 小程序)
- 头条小程序
- 跨平台（支持以上所有）

> 注意
>
> rsmax 要求 Node.js 版本大于等于 18

## 创建项目

```bash
// JavaScript 模板
$ npx create-rsmax my-app
或者
// TypeScript 模板
$ npx create-rsmax my-app -t
```

## 运行项目

```bash
$ npm run dev # 非跨平台
or
$ npm run dev <platform> # 跨平台，如：要在阿里小程序环境运行，则 npm run dev ali
```

打开小程序开发者工具，选中项目下的 `dist` 目录，你将看到

<img src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*Ig_sQarBrgIAAAAAAAAAAABkARQnAQ" width="240" />

成功！

## 项目结构

现在我们来看一下 rsmax 应用的结构：

```bash
my-app/
┳ package.json
┣ dist/
┣ node_modules/
┣ public/
┣ src/
┗━┓ app.js
  ┣ app.css
  ┣ app.config.js
  ┣ pages/
  ┗━┓ index/
    ┗━┓
      ┣ index.js
      ┣ index.css
      ┣ index.config.js
```

`dist` 为编译后的文件目录。

`public` 为全局静态资源目录，具体可参考 [public 目录](/v1/guide/basic/public)。

`src` 为源文件目录。

`app.js` 入口文件，具体可参考 [指南 - 框架](/v1/guide/framework/app)。

`app.css` 样式。

`app.config.js` 为小程序全局配置文件，对应 `app.json`，具体可参考 [指南 - 配置](/v1/guide/config/rsmax)。

```js
module.exports = {
  pages: ['pages/index/index'],
  window: {
    defaultTitle: 'My Project',
  },
};
```

`pages` 存放项目页面。

```jsx
import { View, Text } from 'rsmax/ali';
import './index.css';

export default () => {
  return (
    <View>
      <Text>pages/index/index</Text>
    </View>
  );
};
```

默认导出的的 React 组件就是当前的页面，关于生命周期的使用方式参考《[生命周期](/v1/guide/framework/app#生命周期)》。

rsmax 针对不同平台提供了对应的组件和 API，如 `rsmax/ali`，`rsmax/wechat`，`rsmax/toutiao` 等等，你可以根据需要选择对应的平台。关于跨平台开发请参考《[跨平台开发](/v1/guide/one/)》。

`index.css` 页面样式文件，关于样式请参考《[样式](/v1/guide/framework/style)》。

`index.config.js` 页面配置文件，会自动转换成小程序页面配置文件 `index.json`，关于配置请参考《[配置](/v1/guide/config/rsmax)》。
