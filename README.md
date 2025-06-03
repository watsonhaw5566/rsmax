## fork Remax 分支构建版本

Feature

 - 使用 rspack 构建，超快的构建速度

BugFix
 -  旧问题的处理会关联到之前 Remax 的 issues

#### 特别说明

由于 remax npm 包已经存在，为了避免之前项目正常运行，故重新更名为 rsmax 包, 感谢 Remax 原团队所有成员心辛勤付出。


#### 已知问题

由于支付宝小程序平台使用了新的 Component2 ，我个人的能力暂时无法适配, 所以当前只能支持 微信小程序、字节（抖音）小程序、Web 平台

### 快速开始

```js
npx create-rsmax my-app
```

<a href="https://remaxjs.wdchiphop.cn">
	<img src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*7BLVSL14gvoAAAAAAAAAAABkARQnAQ" width="882" />
</a>

<p align="center">
	<span>Learn once, write anywhere</span><br/>
	<strong>使用真正的 React 构建小程序</strong>
</p>

<p class="badges" align="center">
	<a href="https://juexin.coding.net/p/remax/ci/job">
		<img src="https://juexin.coding.net/badges/remax/job/2619776/master/build.svg" alt="CI build status" />
	</a>
	<a href="https://codecov.io/gh/remaxjs/remax">
		<img src="https://img.shields.io/codecov/c/github/remaxjs/remax/master.svg?style=flat-square" alt="Codecov" />
	</a>
	<a href="https://www.npmjs.com/package/remax">
		<img alt="npm" src="https://img.shields.io/npm/v/remax?style=flat-square" />
	</a>
	<a href="https://user-images.githubusercontent.com/465125/69033897-f095d480-0a1a-11ea-9d4e-f14e6839bc1d.JPG">
		<img alt="dingding" src="https://img.shields.io/badge/交流-钉钉群-brightgreen?style=flat-square" />
	</a>
</p>

[《使用 React 开发小程序》](https://www.yuque.com/seeconf/2020/qsytho)

Rsmax 将 React 运行在小程序环境中，让你可以使用完整的 React 进行小程序开发。

- **真正的 React** - 不同于静态编译的方案，在 Rsmax 中使用 React 没有任何限制，包括 React Hooks。你可以把 Rsmax 理解为针对小程序的 React Native。
- **多端支持** - 使用 Remax 把代码转换到多个小程序平台。
- **TypeScript** - 完整的 TypeScript 支持，给你满满的安全感。

## 文档

你可以从我们的[网站上](https://remaxjs.wdchiphop.cn)找到详细的文档。

也可以通过[快速开始指南](https://remaxjs.github.io/remax/guide/quick-start)来立即体验 Rsmax。

## 示例

https://github.com/remaxjs/examples

## 贡献者

查看[《贡献指南》](/CONTRIBUTING.md)

<a href="https://github.com/remaxjs/remax/graphs/contributors" target="_blank">
  <img src="https://contrib.rocks/image?repo=remaxjs/remax&columns=24">
</a>

## 协议

[MIT](LICENSE)
