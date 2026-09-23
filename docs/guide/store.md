# 状态管理（Store）

`@rsmax/store` 是一个类 Zustand 的轻量状态管理库，支持 selector 精确订阅与微信本地缓存持久化。

## 创建 Store

```js
// src/stores/counter.js
import { create } from '@rsmax/store';

export const counterStore = create((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
  reset: () => set({ count: 0 }),
  incrementBy: (n) => set({ count: get().count + n }),
}));
```

`set` 也支持函数式更新：

```js
increment: () => set(state => ({ count: state.count + 1 })),
```

## 在组件中使用

通过 `@rsmax/runtime` 的 `useStore` 订阅状态，**强烈建议传 selector**，只订阅需要的字段：

```jsx
import { useStore } from '@rsmax/runtime';
import { counterStore } from '../../stores/counter';

export default function CounterPage() {
  const count = useStore(counterStore, s => s.count);

  return (
    <view class="container">
      <text>Count: {count}</text>
      <button onClick={() => counterStore.getState().increment()}>+1</button>
      <button onClick={() => counterStore.getState().reset()}>重置</button>
    </view>
  );
}
```

selector 也支持字符串属性名，或省略（订阅整个 store）：

```jsx
const count = useStore(counterStore, 'count');
const state = useStore(counterStore);
```

修改状态时调用 action，或直接 `setState`：

```js
counterStore.getState().increment();
counterStore.setState({ count: 100 });
```

## 在组件外访问

Store 是普通 JS 对象，可以在任意模块中使用：

```js
import { counterStore } from './stores/counter';

// 获取状态
const currentCount = counterStore.getState().count;

// 直接更新
counterStore.setState({ count: 100 });

// 订阅变化，返回取消订阅函数
const unsub = counterStore.subscribe((state, prevState) => {
  console.log('count changed:', state.count);
});

unsub(); // 取消订阅
```

## Store API

| 方法 | 说明 |
|-----|------|
| `getState()` | 获取当前状态 |
| `setState(partial, replace?)` | 更新状态。对象为合并更新；函数接收当前状态返回新状态；`replace=true` 时整体替换 |
| `subscribe(listener)` | 订阅状态变化，返回取消订阅函数 |
| `destroy()` | 销毁 store，清空所有订阅 |

## 持久化（persist 中间件）

使用 `persist` 中间件把状态自动保存到微信本地缓存（`wx.setStorageSync`），重启后自动恢复：

```js
import { create } from '@rsmax/store';
import { persist } from '@rsmax/store/middleware';

export const counterStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: () => set({ count: get().count + 1 }),
      decrement: () => set({ count: get().count - 1 }),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'counter-storage', // 缓存键名（必填）
      // partialize: (state) => ({ count: state.count }), // 只持久化部分字段
      // version: 1,                                       // 版本号
      // migrate: (persistedState, version) => newState,   // 版本迁移
    }
  )
);
```

### persist 配置项

| 参数 | 类型 | 必填 | 说明 |
|-----|------|------|------|
| `name` | `string` | 是 | 本地缓存键名 |
| `partialize` | `(state) => Partial<State>` | 否 | 筛选需要持久化的字段，默认全部 |
| `version` | `number` | 否 | 版本号，配合 `migrate` 使用，默认 `0` |
| `migrate` | `(persistedState, version) => State` | 否 | 版本号不匹配时调用的迁移函数 |
| `storage` | `{ getItem, setItem, removeItem }` | 否 | 自定义存储，默认使用微信同步缓存 API |

恢复逻辑：启动时读取缓存并与初始 state 合并（缓存优先），随后每次状态变化都会写回缓存。

### 自定义存储

默认存储基于 `wx.getStorageSync` / `wx.setStorageSync` / `wx.removeStorageSync`。如需自定义（例如异步存储或加前缀），传入符合 `{ getItem, setItem, removeItem }` 接口的对象即可。

中间件还提供 `createJSONStorage` 适配器，用于把任意存储包装成 JSON 序列化形式：

```js
import { persist, createJSONStorage } from '@rsmax/store/middleware';

persist(config, {
  name: 'my-store',
  storage: createJSONStorage(() => myCustomStorage),
});
```
