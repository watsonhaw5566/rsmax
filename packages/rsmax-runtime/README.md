# Rsmax Runtime

`@rsmax/runtime` 是 Rsmax 的运行时子包，负责把 React 组件树渲染成小程序可消费的节点数据，并通过 `Container` / `VNode` 下发到各平台运行时。

当前 runtime 同时提供两套渲染器：

- `classic`: 基于 `react-reconciler` 的标准渲染器
- `light`: 面向小程序场景裁剪的轻量渲染器

本文重点介绍 `light` 轻量渲染器的设计目标、实现方式与当前能力边界。

## 轻量渲染器定位

轻量渲染器的入口位于 [render-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light.ts)，用于在不依赖完整 Fiber 协调器的前提下，为 Rsmax 提供一套可运行的小程序渲染语义。

它的核心目标是：

- 为小程序场景提供更轻量、更直接的渲染路径
- 复用现有 `VNode` / `Container` 提交链路
- 在保留 React 常用开发体验的前提下，降低运行时复杂度
- 为 `classic` 渲染器之外提供一套可控、可调试、可逐步演进的实现

## 渲染器切换

渲染器选择入口位于 [renderer.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/renderer.ts)。

```ts
export function getRenderer(): Renderer {
  const renderer = RuntimeOptions.get('renderer');
  return renderer === 'light' ? lightRenderer : classicRenderer;
}
```

其中：

- `classicRenderer.render` 指向 [render.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render.ts)
- `lightRenderer.render` 指向 [render-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light.ts)

## 核心架构

轻量渲染器不依赖 `react-reconciler` 的 Fiber 树，而是采用一套手写的深度优先协调流程：

1. 从根节点开始递归遍历 React element 树
2. 根据 element 类型分支处理：
   - host 节点
   - text 节点
   - function / class component
   - fragment
   - portal
   - context provider / consumer
3. 生成或复用 `VNode`
4. 将 `VNode` 按顺序挂载到父节点
5. 最终通过 `Container.applyUpdate()` 下发到小程序

关键数据结构包括：

- [VNode.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/VNode.ts)
  - 运行时宿主节点表示
  - 负责 `appendChild`、`insertBefore`、`removeChild`、`update`
- [Container.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/Container.ts)
  - 收集更新队列
  - 最终触发 `setData` / `spliceData`
- [hooks-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hooks-light.ts)
  - 轻量 hooks 实现
  - 管理当前渲染组件、hook 状态、effect 队列与重渲染调度
  - 在 `light` 模式下为 runtime hooks 和 React 基础 hooks 提供执行上下文

## 轻量渲染流程

`render-light.ts` 当前的主链路可以概括为：

```txt
render()
  -> renderChildrenInto()
    -> renderElement()
      -> renderFunctionComponent()
      -> createHostVNode() / createTextVNode()
    -> mountVNodesInOrder()
  -> flushLayoutEffects()
  -> container.applyUpdate()
  -> flushPassiveEffects()
```

其中几个关键函数分别负责：

- `renderElement`
  - 识别当前 element 属于 `host`、`component`、`fragment`、`portal`、`provider`、`consumer` 还是 `text`
- `renderFunctionComponent`
  - 执行函数组件或类组件渲染
  - 复用组件实例与 hook 状态
- `renderChildrenInto`
  - 对比新旧子节点
  - 产出新的子 `VNode` 列表
- `mountVNodesInOrder`
  - 负责插入、删除、复用和重排

## 当前已支持能力

轻量渲染器当前已经覆盖 Rsmax 页面渲染所需的核心能力：

- 基础宿主节点渲染
  - `view`
  - `text`
  - `image`
  - 以及通过 `DOM_TAG_MAP` 映射的 `div/span/img`
- 文本节点创建与更新
- 函数组件渲染
- 类组件渲染
- 根节点组件复用
- 基于 `key + type + parentVNode` 的组件复用
- `Fragment`
- `Portal`
- `forwardRef`
- `memo`
- `Context.Provider`
- `Context.Consumer`
- `useState`
- `useReducer`
- `useEffect`
- `useLayoutEffect`
- `useRef`
- `useMemo`
- `useCallback`
- `useContext`
- `useImperativeHandle`
- `useDebugValue`
- 从 `react` 导入的基础 hooks：
  - `React.useState`
  - `React.useReducer`
  - `React.useEffect`
  - `React.useLayoutEffect`
  - `React.useRef`
  - `React.useMemo`
  - `React.useCallback`
  - `React.useContext`
  - `React.useImperativeHandle`
- runtime hooks：
  - `usePageEvent`
  - `useAppEvent`
  - `usePageInstance`
  - `useComponentInstance`
  - `useQuery`
- 类组件基础生命周期：
  - `componentDidMount`
  - `componentDidUpdate`
  - 基础的 `componentWillUnmount` 清理链路

相关测试位于 [render-light.test.tsx](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/__tests__/render-light.test.tsx)。

## 和 classic 渲染器的关系

`classic` 渲染器基于 [render.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render.ts) 和 [hostConfig/index.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hostConfig/index.ts)，由 `react-reconciler` 负责协调过程。

相比之下，`light` 的特点是：

- 优势
  - 实现更直接
  - 调试路径更清晰
  - 更容易针对小程序场景定制优化
- 代价
  - 需要手工补齐 React 运行时语义
  - 边界场景需要额外测试和维护
  - 在复杂更新、调度和兼容性方面仍弱于 `react-reconciler`

可以把它们理解为：

- `classic` 更标准、更完整
- `light` 更轻、更可控、更适合按场景裁剪

## 和 react-reconciler 的差异清单

下表从当前 Rsmax runtime 的实现视角，对比 `react-reconciler` 驱动的 `classic` 渲染器和 `light` 轻量渲染器：

| 维度               | `classic` / `react-reconciler`                                                                                                                  | `light` 轻量渲染器                                                                                                                              |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 协调核心           | 由 React Fiber 和 [hostConfig/index.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hostConfig/index.ts) 驱动 | 由 [render-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light.ts) 手写递归协调                |
| 节点模型           | Fiber 树 + host instance                                                                                                                        | `LightComponent` + `VNode`                                                                                                                      |
| 渲染入口           | [render.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render.ts) 中 `createContainer` / `updateContainer`   | `render-light.ts` 中 `render()` 直接递归展开 element 树                                                                                         |
| 调度能力           | 具备 React 内部调度模型和批处理语义                                                                                                             | 基于 [hooks-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hooks-light.ts) 的轻量 dirty queue 与批处理 |
| React 语义来源     | 由 React 内部实现保证                                                                                                                           | 需要 runtime 手工识别和补齐                                                                                                                     |
| 支持对象型节点     | React 内部天然处理 `memo`、`forwardRef`、`provider`、`consumer` 等                                                                              | 需要在 `render-light.ts` 中显式识别并展开                                                                                                       |
| 组件复用           | 由 Fiber identity 与 reconciliation 规则保证                                                                                                    | 依赖 `key + type + parentVNode` 匹配复用                                                                                                        |
| hooks 状态管理     | React 内部 hooks 机制                                                                                                                           | 由 `hooks-light.ts` 基于当前组件手工维护                                                                                                        |
| React 基础 hooks   | 由 React dispatcher 原生提供                                                                                                                    | 在 `render-light.ts` 中临时接管 `ReactCurrentDispatcher`，转发到 `hooks-light.ts`                                                               |
| runtime hooks      | 可直接复用 React hooks 上下文                                                                                                                   | 需要在 `hooks/index.ts` 中按 `renderer` 显式分流到 light 实现                                                                                   |
| 类组件生命周期     | 更接近完整 React 语义                                                                                                                           | 当前为基础实现，覆盖常见 mount / update / unmount 场景                                                                                          |
| 提交阶段           | `prepareUpdate` / `commitUpdate` / `resetAfterCommit` 边界清晰                                                                                  | 协调、挂载、提交流程集中在一套递归逻辑中                                                                                                        |
| 更新粒度           | 标准 React 协调粒度                                                                                                                             | 已支持局部更新，但仍偏向场景化最小实现                                                                                                          |
| 错误边界与复杂语义 | 语义更完整                                                                                                                                      | 仍需继续补齐与验证                                                                                                                              |
| DevTools 支持      | 已在 [render.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render.ts) 中注入                                | 当前没有等价的 DevTools 集成                                                                                                                    |
| 调试体验           | 更接近 React 黑盒                                                                                                                               | 日志路径更直接，便于逐步定位 element 到 VNode 的展开链路                                                                                        |
| 适用场景           | 追求 React 兼容性和完整语义                                                                                                                     | 追求小程序场景下更轻、更可控的渲染路径                                                                                                          |

一个简化结论是：

- 当目标是“尽量遵循 React 标准语义”时，优先选择 `classic`
- 当目标是“面向 Rsmax 小程序场景做轻量化和可控调试”时，`light` 更有演进空间

## 设计约束

轻量渲染器目前遵循以下实现约束：

- 宿主节点层继续复用 `VNode` / `Container` 体系
- 更新尽量走局部协调，而不是整棵树重建
- hooks 状态必须稳定绑定到组件实例
- 组件身份复用依赖 `key`、`type` 与挂载父节点
- effect、类组件生命周期和宿主提交保持明确阶段顺序

## 当前边界

虽然轻量渲染器已经可以支撑核心页面渲染，但它和 `react-reconciler` 相比仍存在明显边界：

- 调度模型更简单，不具备完整 Fiber 优先级语义
- React 对象型节点仍需要手工识别和支持
- React 基础 hooks 虽已可用，但当前依赖 runtime 在函数组件渲染时临时接管 dispatcher
- 类组件更新语义仍是最小实现，不等同于完整 React 行为
- 异常恢复、错误边界、复杂嵌套更新等场景仍需继续完善
- 行为一致性主要依赖回归测试，而不是 React 内部协议保证

## 调试方式

当 `RuntimeOptions.get('debug')` 为真时，轻量渲染器会输出以 `[render-light]` 为前缀的调试日志。

这些日志可用于观察：

- element 类型分支命中
- 组件 mount / reuse
- context provider / consumer 展开
- host/text vnode 创建
- 子树协调与旧节点删除
- 节点重排与提交

这套调试输出对定位“页面组件为何没有继续展开为宿主节点”这类问题尤其有效。

## Hooks 兼容说明

当前 `light` 渲染器下的 hooks 可以分成两类：

- runtime hooks
  - 例如 `usePageEvent`、`useAppEvent`、`usePageInstance`、`useComponentInstance`、`useQuery`
  - 这些 hooks 会在 [hooks/index.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hooks/index.ts) 中根据 `RuntimeOptions.get('renderer')` 分流
  - 当 `renderer === 'light'` 时，内部改用 [hooks-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hooks-light.ts)
- React 基础 hooks
  - 例如 `useEffect`、`useState`、`useContext`
  - 页面代码即使直接从 `react` 导入，在 `render-light` 执行函数组件时也会被转发到 light dispatcher

这意味着在 `light` 模式下，下面两种写法都可以工作：

```ts
import { usePageEvent } from 'rsmax/macro';
import { useEffect, useContext } from 'react';
```

但需要注意：

- 当前兼容策略仍是 runtime 主动接管 dispatcher 的实现，不等同于完整 React Fiber hooks 语义
- 行为正确性主要通过 [render-light.test.tsx](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/__tests__/render-light.test.tsx) 这类回归测试持续保证

## 适用场景

轻量渲染器适合以下场景：

- 希望降低 runtime 协调层复杂度
- 需要更可控的调试与问题定位链路
- 目标运行环境主要是 Rsmax 小程序页面，而不是完整 React 通用场景
- 希望在 `react-reconciler` 之外逐步积累自定义渲染能力

## 开发建议

如果后续继续演进轻量渲染器，建议优先补齐以下方向：

- 更完整的 React 节点类型支持
- 更严格的类组件更新与提交语义
- 更细致的删除列表与子树清理策略
- 更强的回归测试覆盖，尤其是 context、memo、forwardRef、portal、重排和嵌套更新
- 将 [render-light-types.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light-types.ts) 中的 Fiber-like 结构进一步落到实际实现中

## 相关文件

- [render-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light.ts)
- [hooks-light.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hooks-light.ts)
- [render-light-types.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render-light-types.ts)
- [render.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/render.ts)
- [hostConfig/index.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/hostConfig/index.ts)
- [renderer.ts](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/renderer.ts)
- [render-light.test.tsx](file:///Users/wangjue/WebstormProjects/rsmax/rsmax/packages/rsmax-runtime/src/__tests__/render-light.test.tsx)
