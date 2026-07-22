/**
 * Fiber-like types for render-light
 * 参考 react-reconciler 的 Fiber 架构，为小程序优化的简化版本
 */

import type VNode from './VNode';
import type Container from './Container';
import type { Hook } from './hooks-light';

// ============================================================
// Work Tags - 节点类型（参考 ReactWorkTags.js）
// ============================================================

export const HostRoot = 3; // 根节点
export const HostComponent = 5; // 宿主组件 (view, text, image...)
export const HostText = 6; // 文本节点
export const Fragment = 7; // Fragment
export const FunctionComponent = 0; // 函数组件

export type WorkTag =
  | typeof HostRoot
  | typeof HostComponent
  | typeof HostText
  | typeof Fragment
  | typeof FunctionComponent;

// ============================================================
// Flags - 副作用标记（参考 ReactFiberFlags.js，使用位运算）
// ============================================================

export const NoFlags = 0b0000000;
export const Placement = 0b0000001; // 需要插入到父节点
export const Update = 0b0000010; // 需要更新 props/text
export const Deletion = 0b0000100; // 需要删除

export type Flags = number;

// ============================================================
// LightNode (Fiber-like)
// ============================================================

export interface LightNode {
  // 类型标记
  tag: WorkTag;
  key: string | null;
  elementType: any; // 组件函数 / 元素类型字符串 / Fragment 符号
  type?: any; // 兼容旧字段，值同 elementType

  // 双缓冲 - current <-> workInProgress 互相引用
  alternate: LightNode | null;

  // 树结构（链表式，替代 children 数组）
  return: LightNode | null; // 父节点
  child: LightNode | null; // 第一个子节点
  sibling: LightNode | null; // 下一个兄弟节点
  index: number; // 在兄弟中的位置（用于 VNode 挂载时的 insertBefore）

  // 宿主实例 - 对应 VNode 树
  stateNode: VNode | Container | null;

  // Props 状态
  pendingProps: any; // 本次渲染传入的新 props
  memoizedProps: any; // 上次渲染后的最终 props

  // Hooks 状态（仅 FunctionComponent 使用）
  memoizedState: Hook[] | null;

  // 副作用
  flags: Flags; // 当前节点的副作用
  subtreeFlags: Flags; // 子树聚合的副作用（加速 commit 阶段遍历）
  deletions: LightNode[] | null; // 子节点删除列表

  // 容器引用
  container: Container;

  // 调试信息（可选，便于开发时追踪）
  componentName?: string;
  _forwardRefType?: boolean;
  ref?: ((instance: any) => void) | { current: any };

  // 兼容旧 render-light 的字段（hooks-light 需要 dirty）
  dirty?: boolean;
  mounted?: boolean;

  // 文本节点内容
  text?: string;
}

// ============================================================
// React Element type detection constants
// ============================================================

export const REACT_ELEMENT_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.element')) || 0xeac7;

export const REACT_FRAGMENT_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.fragment')) || 0xeacb;

export const REACT_FORWARD_REF_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.forward_ref')) || 0xead0;

export const REACT_MEMO_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.memo')) || 0xead3;

export const REACT_PORTAL_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.portal')) || 0xeaca;

// 旧类型别名，保持向后兼容
export type LightNodeType = 'component' | 'host' | 'text' | 'fragment' | 'portal';
