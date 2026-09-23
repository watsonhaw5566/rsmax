# React

在使用 Rsmax 前你需要对 [React](https://reactjs.org/) 有基本的了解。

如果你有 React 的开发经验，那么也要注意 Rsmax 不同于 React DOM。Rsmax 使用小程序提供的组件来构建应用，而且你的代码是运行在小程序环境中。

你在 Rsmax 中使用 React 没有任何特殊限制，同时也支持 ES6 语法， ES Module，async/await 等等。

:::tip
Rsmax 已支持 React 18
:::


Remax 写法

```js
// remax 
import * as React from 'react'

export default ()  => (
  <View>
    Hello Remax
  </View>
)

```

Rsmax 写法 ,当不使用到 React 的时候无需引入 react

```js
// rsmax
export default ()  => (
  <View>
    Hello Rsmax
  </View>
)

```
