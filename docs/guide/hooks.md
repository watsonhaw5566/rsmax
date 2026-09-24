# Hooks API

所有 Hooks 都从 `@rsmax/runtime` 显式导入：

```js
import { useState, useEffect } from '@rsmax/runtime';
```

Hooks 只能在函数式页面 / 组件的顶层调用，规则与 React 一致：不要在循环、条件或嵌套函数中调用。

## useState

返回 `[state, setState]`，用法与 React 一致。`setState` 支持直接传值或更新函数；同一轮事件中的多次 `setState` 会自动批处理为一次 `setData`。

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
setCount(c => c + 1); // 函数式更新
```

初始值按静态 / 动态分两条路径处理：

- **静态初值**（字面量、常量数组/对象）：编译器直接写入页面/组件注册期的 `data`，首屏第一帧即有值，无空帧；
- **动态初值**（引用 `useQuery()` 等函数体内变量，或函数惰性初始化）：在组件函数首次执行时求值，`onLoad`/`attached` 内一次性 `setData`。

```jsx
const [tab, setTab] = useState('created');     // 静态 → 首屏 data 即有值
const [list] = useState([1, 2]);               // 静态字面量同理

const query = useQuery();
const [id, setId] = useState(query.id || '');  // 动态 → 首跑时求值
const [rows] = useState(() => computeRows());  // 动态：函数惰性初始化（同 React）
```

> 动态初值物理上无法出现在注册期 `data` 中（值在 `onLoad` 时才存在）。若该值参与首屏关键 UI（如默认选中态），请使用静态初值 + 后续更新，例如 `useState('created')` 后在接口返回或参数解析后 `setTab(...)`。

第二个可选参数用于指定底层 data key（一般不需要，默认按 Hook 顺序自动生成）：

```jsx
const [count, setCount] = useState(0, 'count');
```

## useEffect

副作用 Hook，依赖数组语义同 React：

```jsx
useEffect(() => {
  console.log('count 变化：', count);
  return () => {
    // 清理函数，页面卸载 / 下次执行前调用
  };
}, [count]);
```

- 传入依赖数组：仅在依赖变化时执行；
- 不传或传 `null`：每次渲染后都执行；
- 返回函数：作为清理函数，在组件 / 页面卸载时执行。

## createContext / useContext

跨组件共享数据，无需逐层传参：

```jsx
import { createContext, useContext } from '@rsmax/runtime';

const ThemeContext = createContext('light');

function Child() {
  const theme = useContext(ThemeContext);
  return <text>{theme}</text>;
}
```

## useQuery

获取页面 `onLoad` 时传入的查询参数：

```jsx
const query = useQuery(); // { id: '123', ... }
```

## usePageEvent

监听页面生命周期事件，可多次注册，回调始终使用最新闭包：

```jsx
usePageEvent('onShow', () => {
  console.log('page show');
});

usePageEvent('onReachBottom', () => {
  // 触底加载更多
});
```

支持的页面事件包括：`onLoad`、`onShow`、`onReady`、`onHide`、`onUnload`、`onPullDownRefresh`、`onReachBottom`、`onShareAppMessage`、`onPageScroll` 等。

## useAppEvent

监听 App 全局事件（内部通过事件总线转发 `App` 生命周期）：

```jsx
useAppEvent('onLaunch', () => {
  console.log('app launched');
});
```

可监听的 App 事件：`onLaunch`、`onShow`、`onHide`、`onError`。

## useComponentEvent

在自定义组件中监听 lifetimes 事件：

```jsx
useComponentEvent('attached', () => {});
useComponentEvent('detached', () => {});
```

## useStore

订阅 [Store](./store) 状态。支持函数 selector（推荐，精确订阅）、字符串属性名、或不传（订阅整个 store）：

```jsx
import { useStore } from '@rsmax/runtime';
import { counterStore } from '../../stores/counter';

const count = useStore(counterStore, s => s.count);
const count2 = useStore(counterStore, 'count'); // 等价写法
```

组件卸载时会自动取消订阅。

## promisify

将微信小程序回调风格 API（`success` / `fail`）转换为 Promise：

```jsx
import { useState } from '@rsmax/runtime';
import { promisify } from '@rsmax/runtime';

const wxRequest = promisify(wx.request);

const res = await wxRequest({
  url: 'https://api.example.com/data',
  method: 'GET',
});
```

特点：

- 无参数调用时默认使用空对象 `{}`；
- 自定义 `success` / `fail` 回调仍会在 Promise resolve / reject 之前被调用；
- 其余选项参数原样保留。

```jsx
const wxGetStorage = promisify(wx.getStorage);
wxGetStorage({
  key: 'token',
  success: (res) => console.log('自定义回调：', res.data),
}).then(res => console.log('Promise：', res.data));
```

常用场景：`wx.request`、`wx.login`、`wx.getUserInfo`、`wx.getStorage`、`wx.setStorage`、`wx.chooseImage`、`wx.navigateTo`、`wx.scanCode` 等。

## Options API 写法

除 Hooks 外，也可以直接使用传统对象配置，详见 [组件 → Options API 组件](./components#options-api-组件)。
