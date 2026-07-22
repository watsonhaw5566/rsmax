/**
 * render-light - 为小程序优化的轻量级 React 渲染器
 *
 * 核心设计（参考 react-reconciler 的精简版）：
 *
 *   render(rootElement, container)
 *     │
 *     ├─ 深度优先递归遍历 element 树
 *     │    ├─ FunctionComponent: 调用组件函数，返回 childElement，递归渲染
 *     │    ├─ Fragment: 直接遍历 children
 *     │    ├─ HostComponent (view/text/image): 创建 VNode
 *     │    ├─ HostText: 创建文本 VNode
 *     │    └─ Portal: children 渲染到指定 container.root
 *     │
 *     ├─ VNode 树自底向上构建（子 VNode 先创建，再 appendChild 到父 VNode）
 *     │
 *     └─ container.applyUpdate() flush 到小程序
 *
 * 更新阶段（Update Phase）：
 *   通过比对 old/new child 列表，基于 key 匹配决定：
 *     - UPDATE: 复用 VNode，更新 props/text
 *     - INSERT: 新增 VNode，appendChild 或 insertBefore
 *     - DELETE: 删除 VNode，removeChild
 */

import { RuntimeOptions } from '@rsmax/framework-shared';
import * as React from 'react';
import Container from './Container';
import VNode from './VNode';
import { generate } from './instanceId';
import diffProperties from './hostConfig/diffProperties';
import { TYPE_TEXT } from './constants';
import {
  pushRenderContext,
  popRenderContext,
  flushLayoutEffects,
  flushPassiveEffects,
  setReRenderFn,
  batchedUpdates,
  cleanupEffectsForNode,
  useState as useLightState,
  useReducer as useLightReducer,
  useEffect as useLightEffect,
  useLayoutEffect as useLightLayoutEffect,
  useRef as useLightRef,
  useMemo as useLightMemo,
  useCallback as useLightCallback,
  useContext as useLightContext,
  useImperativeHandle as useLightImperativeHandle,
  useDebugValue as useLightDebugValue,
} from './hooks-light';

import type { Hook } from './hooks-light';

const ReactCurrentDispatcher =
  (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentDispatcher ?? null;

const lightDispatcher = {
  useState: useLightState,
  useReducer: useLightReducer,
  useEffect: useLightEffect,
  useLayoutEffect: useLightLayoutEffect,
  useRef: useLightRef,
  useMemo: useLightMemo,
  useCallback: useLightCallback,
  useContext: useLightContext,
  useImperativeHandle: useLightImperativeHandle,
  useDebugValue: useLightDebugValue,
};

// ============================================================
// 常量 & 工具函数
// ============================================================

const DOM_TAG_MAP: Record<string, string> = { span: 'text', div: 'view', img: 'image' };

const REACT_FRAGMENT_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.fragment')) || 0xeacb;

const REACT_FORWARD_REF_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.forward_ref')) || 0xead0;

const REACT_MEMO_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.memo')) || 0xead3;

const REACT_PROVIDER_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.provider')) || 0xeacd;

const REACT_CONTEXT_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.context')) || 0xeace;

const REACT_PORTAL_TYPE: symbol | number =
  (typeof Symbol === 'function' && (Symbol as any).for && (Symbol as any).for('react.portal')) || 0xeaca;

function mapHostTag(tag: string): string {
  return DOM_TAG_MAP[tag] || tag;
}

function isPortal(v: any): boolean {
  if (v == null || typeof v !== 'object') return false;
  const t = v.$$typeof;
  return typeof t === 'symbol' ? String(t) === String(REACT_PORTAL_TYPE) : t === REACT_PORTAL_TYPE;
}

function compareTypeSymbol(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a === 'symbol' && typeof b === 'symbol') return String(a) === String(b);
  if (typeof a === 'symbol') return String(a) === String(b);
  if (typeof b === 'symbol') return String(a) === String(b);
  return false;
}

function unwrapComponentType(type: any): any {
  if (type === null || type === undefined) return type;
  if (typeof type === 'function') return type;
  if (typeof type === 'object') {
    if (compareTypeSymbol(type.$$typeof, REACT_FORWARD_REF_TYPE)) return type.render;
    if (compareTypeSymbol(type.$$typeof, REACT_MEMO_TYPE)) return unwrapComponentType(type.type);
    if (typeof type.render === 'function') return type.render;
    if (type.type !== undefined && type.type !== null) return unwrapComponentType(type.type);
  }
  return type;
}

function hasForwardRef(type: any): boolean {
  if (typeof type === 'object' && type !== null) {
    if (compareTypeSymbol(type.$$typeof, REACT_FORWARD_REF_TYPE)) return true;
    if (compareTypeSymbol(type.$$typeof, REACT_MEMO_TYPE)) return hasForwardRef(type.type);
  }
  return false;
}

function isClassComponent(type: any): boolean {
  if (type == null || typeof type !== 'function') return false;
  return type.prototype && typeof type.prototype.render === 'function';
}

function flattenChildren(children: any, out: any[] = []): any[] {
  if (children == null || typeof children === 'boolean') return out;
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) flattenChildren(children[i], out);
    return out;
  }
  out.push(children);
  return out;
}

function debugRenderLight(...args: any[]): void {
  if (RuntimeOptions.get('debug')) {
    console.log('[render-light]', ...args);
  }
}

function getDebugTypeName(type: any): string {
  if (typeof type === 'string') return type;
  const resolved = unwrapComponentType(type);
  return resolved?.name || type?.name || 'Anonymous';
}

function getDebugVNodeName(vnode: VNode | null): string {
  return vnode ? `${vnode.type}#${vnode.id}` : 'null';
}

function getDebugElementName(element: any): string {
  if (element == null) return String(element);
  if (typeof element === 'string' || typeof element === 'number') return `text:${String(element)}`;
  if (element instanceof VNode) return `vnode:${getDebugVNodeName(element)}`;
  if (typeof element === 'object' && 'type' in element) {
    return getDebugTypeName((element as any).type);
  }
  return typeof element;
}

function isContextProviderType(type: any): boolean {
  return typeof type === 'object' && type !== null && compareTypeSymbol(type.$$typeof, REACT_PROVIDER_TYPE);
}

function isContextConsumerType(type: any): boolean {
  return typeof type === 'object' && type !== null && compareTypeSymbol(type.$$typeof, REACT_CONTEXT_TYPE);
}

function getContextObjectFromType(type: any): any {
  if (isContextProviderType(type)) {
    return (type as any)._context ?? null;
  }
  if (isContextConsumerType(type)) {
    return type;
  }
  return null;
}

function getContextCurrentValue(context: any): any {
  if (!context || typeof context !== 'object') return undefined;
  if ('_currentValue' in context) return context._currentValue;
  if ('_currentValue2' in context) return context._currentValue2;
  return undefined;
}

function setContextCurrentValue(context: any, value: any): void {
  if (!context || typeof context !== 'object') return;
  if ('_currentValue' in context) {
    context._currentValue = value;
  }
  if ('_currentValue2' in context) {
    context._currentValue2 = value;
  }
}

// ============================================================
// LightComponent - 函数组件的渲染记录
// 用于 hooks 状态存储和重新渲染调度
// ============================================================

interface LightComponent {
  // 组件类型（函数或类）
  type: any;
  componentName: string;
  // 容器引用
  container: Container;
  // Props
  props: any;
  // hooks 状态
  memoizedState: Hook[] | null;
  dirty: boolean;
  mounted: boolean;
  // 父组件引用（用于从父组件查找重新渲染路径）
  parent: LightComponent | null;
  // 子组件列表（用于清理和递归重新渲染）
  children: Set<LightComponent>;
  // 父 VNode（挂载位置）
  parentVNode: VNode | null;
  // 当前渲染产出的 VNode 列表
  outputVNodes: VNode[];
  // ref 处理
  ref?: any;
  // 是否为类组件
  isClass: boolean;
  // 类组件实例（仅类组件有值）
  classInstance: any;
  // 稳定协调信息
  key?: string;
  elementType?: any;
  didRender?: boolean;
}

const allComponents: Set<LightComponent> = new Set();
const pendingDidMount: Set<LightComponent> = new Set();
const pendingDidUpdate: Set<LightComponent> = new Set();

function createComponent(
  type: any,
  props: any,
  ref: any,
  container: Container,
  parent: LightComponent | null
): LightComponent {
  const resolvedType = unwrapComponentType(type);
  const isClass = isClassComponent(type) || isClassComponent(resolvedType);
  const comp: LightComponent = {
    type,
    componentName:
      (typeof type === 'function' && (type as any).name) ||
      (resolvedType && typeof resolvedType === 'function' && (resolvedType as any).name) ||
      'Component',
    container,
    props,
    memoizedState: null,
    dirty: false,
    mounted: true,
    parent,
    children: new Set(),
    parentVNode: null,
    outputVNodes: [],
    ref,
    isClass,
    classInstance: null,
    key: undefined,
    elementType: type,
    didRender: true,
  };
  allComponents.add(comp);
  if (parent) parent.children.add(comp);
  return comp;
}

function getRootComponents(parentVNode: VNode): Set<LightComponent> {
  const rootComponents = new Set<LightComponent>();
  allComponents.forEach(comp => {
    if (comp.parent === null && comp.parentVNode === parentVNode) {
      rootComponents.add(comp);
    }
  });
  return rootComponents;
}

function flushComponentLifecycles(): void {
  const mounted = Array.from(pendingDidMount);
  pendingDidMount.clear();
  for (const comp of mounted) {
    if (comp.isClass && comp.classInstance && comp.mounted) {
      if (typeof comp.classInstance.componentDidMount === 'function') {
        try {
          comp.classInstance.componentDidMount();
        } catch (e) {
          console.error('[render-light] Error in componentDidMount', comp.componentName, e);
        }
      }
    }
  }

  const updated = Array.from(pendingDidUpdate);
  pendingDidUpdate.clear();
  for (const comp of updated) {
    if (comp.isClass && comp.classInstance && comp.mounted && comp.didRender) {
      if (typeof comp.classInstance.componentDidUpdate === 'function') {
        try {
          comp.classInstance.componentDidUpdate();
        } catch (e) {
          console.error('[render-light] Error in componentDidUpdate', comp.componentName, e);
        }
      }
    }
  }
}

function isSameComponentType(prevType: any, nextType: any): boolean {
  if (prevType === nextType) return true;
  return unwrapComponentType(prevType) === unwrapComponentType(nextType);
}

function findReusableComponent(
  components: Iterable<LightComponent>,
  key: string,
  type: any,
  parentVNode: VNode | null
): LightComponent | null {
  for (const component of components) {
    if (
      component.key === key &&
      component.parentVNode === parentVNode &&
      isSameComponentType(component.elementType, type)
    ) {
      return component;
    }
  }
  return null;
}

function destroyComponent(comp: LightComponent): void {
  // 递归销毁子组件
  comp.children.forEach(child => destroyComponent(child));
  comp.children.clear();
  // 清理 effects
  if (comp.memoizedState && comp.memoizedState.length > 0) {
    cleanupEffectsForNode(comp as any);
  }
  // 调用类组件的 componentWillUnmount
  if (comp.isClass && comp.classInstance && typeof comp.classInstance.componentWillUnmount === 'function') {
    comp.classInstance.componentWillUnmount();
  }
  if (comp.parent) {
    comp.parent.children.delete(comp);
  }
  comp.mounted = false;
  allComponents.delete(comp);
}

// ============================================================
// VNode Props 处理
// ============================================================

function processVNodeProps(props: any, vnode: VNode): any {
  const result: any = {};
  const functionPropKeys = new Set<string>();
  for (const key of Object.keys(props)) {
    if (typeof props[key] === 'function') {
      functionPropKeys.add(key);
      result[key] = vnode.registerCallback(key, props[key]);
    } else if (key === 'style') {
      result[key] = props[key] || '';
    } else if (key !== 'children' && key !== 'ref') {
      result[key] = props[key];
    }
  }
  vnode.pruneCallbacks(functionPropKeys);
  return result;
}

function processPropsForDiff(props: any): any {
  if (!props || typeof props !== 'object') return props;
  const result: any = {};
  for (const key of Object.keys(props)) {
    if (key === 'children' || key === 'ref') continue;
    result[key] = props[key];
  }
  return result;
}

// ============================================================
// VNode 创建
// ============================================================

function createHostVNode(elementType: string, props: any, container: Container, key?: string): VNode {
  const id = generate();
  const vnode = new VNode({
    id,
    type: mapHostTag(elementType),
    props: {},
    container,
  });
  if (key !== undefined) {
    (vnode as any)._rsmaxKey = key;
  }
  vnode.props = processVNodeProps(props, vnode);
  return vnode;
}

function createTextVNode(text: string, container: Container, key?: string): VNode {
  const id = generate();
  const vnode = new VNode({
    id,
    type: TYPE_TEXT,
    props: null,
    container,
  });
  if (key !== undefined) {
    (vnode as any)._rsmaxKey = key;
  }
  vnode.text = text;
  return vnode;
}

// ============================================================
// 核心渲染逻辑 - 递归渲染 element 树
// 返回渲染产生的 VNode 列表（扁平数组，可能为空）
// ============================================================

interface RenderContext {
  container: Container;
  // 当前函数组件（用于 hooks 上下文）
  currentComponent: LightComponent | null;
  // 父 VNode（用于挂载新 VNode）
  parentVNode: VNode | null;
  // 是否为首次渲染
  isFirstRender: boolean;
  // 旧 VNode 列表（用于复用和对比）
  oldVNodes: VNode[];
  // 旧子组件列表
  oldComponents: Set<LightComponent>;
  // 本轮被复用/保留的直接子组件
  usedChildComponents: Set<LightComponent>;
}

// ============================================================
// Element Type 判定
// ============================================================

type ElementKind =
  | 'host'
  | 'component'
  | 'fragment'
  | 'portal'
  | 'provider'
  | 'consumer'
  | 'text'
  | 'vnode'
  | 'invalid';

function getElementKind(element: any): ElementKind {
  if (element == null) return 'invalid';
  if (typeof element === 'string' || typeof element === 'number') return 'text';
  if (element instanceof VNode) return 'vnode';
  if (isPortal(element)) return 'portal';
  if (typeof element !== 'object') return 'invalid';

  const type = element.type;
  if (type == null) return 'invalid';
  if (type === REACT_FRAGMENT_TYPE || type === 'Fragment' || compareTypeSymbol(type, REACT_FRAGMENT_TYPE))
    return 'fragment';
  if (typeof type === 'string') return 'host';
  if (isContextProviderType(type)) return 'provider';
  if (isContextConsumerType(type)) return 'consumer';
  if (typeof type === 'function') return 'component';
  if (typeof type === 'object') {
    const resolved = unwrapComponentType(type);
    if (typeof resolved === 'function') return 'component';
  }
  return 'invalid';
}

function getElementKey(element: any, index: number): string {
  if (element == null || typeof element !== 'object') return String(index);
  return element.key != null ? String(element.key) : String(index);
}

// ============================================================
// 渲染单个 element
// 返回产出的 VNode 列表（扁平）
// ============================================================

function renderElement(
  element: any,
  ctx: RenderContext,
  index: number,
  keyedOldMap: Map<string, VNode>,
  keyedOldByIndex: VNode[],
  consumedOld: Set<VNode>
): VNode[] {
  const kind = getElementKind(element);
  debugRenderLight(
    'renderElement',
    `kind=${kind}`,
    `index=${index}`,
    `element=${getDebugElementName(element)}`,
    `parent=${getDebugVNodeName(ctx.parentVNode)}`
  );

  switch (kind) {
    case 'text': {
      const text = String(element);
      // 尝试复用 text VNode
      const key = String(index);
      const reuse = keyedOldMap.get(key);
      if (reuse && reuse.type === TYPE_TEXT) {
        (reuse as any)._rsmaxKey = key;
        consumedOld.add(reuse);
        if (reuse.text !== text) {
          reuse.text = text;
          reuse.update();
        }
        return [reuse];
      }
      const vnode = createTextVNode(text, ctx.container, key);
      debugRenderLight('create text vnode', `key=${key}`, `text=${text}`);
      return [vnode];
    }

    case 'host': {
      const elementType = element.type as string;
      const props = element.props || {};
      const ref = element.ref;
      const key = getElementKey(element, index);
      const mappedType = mapHostTag(elementType);

      // 尝试复用同 key + 同类型的 VNode
      const reuse = keyedOldMap.get(key);
      if (reuse && reuse.type === mappedType) {
        (reuse as any)._rsmaxKey = key;
        consumedOld.add(reuse);
        // diff props
        const diff = diffProperties(processPropsForDiff(reuse.props || {}), processPropsForDiff(props));
        reuse.props = processVNodeProps(props, reuse);
        if (diff) {
          reuse.update(diff);
        }
        // 更新 ref（如果有）
        if (ref) {
          if (typeof ref === 'function') {
            ref(reuse);
          } else if (typeof ref === 'object' && ref !== null) {
            (ref as any).current = reuse;
          }
        }
        // 递归渲染 children
        const children = flattenChildren(props.children);
        const childOldVNodes = getChildVNodes(reuse);
        renderChildrenInto(children, reuse, ctx.container, ctx.currentComponent, childOldVNodes);
        return [reuse];
      }

      // 新建 VNode
      const vnode = createHostVNode(elementType, props, ctx.container, key);
      debugRenderLight(
        'create host vnode',
        `type=${mappedType}`,
        `key=${key}`,
        `id=${vnode.id}`,
        `parent=${getDebugVNodeName(ctx.parentVNode)}`
      );
      // 设置 ref（如果有）
      if (ref) {
        if (typeof ref === 'function') {
          ref(vnode);
        } else if (typeof ref === 'object' && ref !== null) {
          (ref as any).current = vnode;
        }
      }
      // 递归渲染 children
      const children = flattenChildren(props.children);
      renderChildrenInto(children, vnode, ctx.container, ctx.currentComponent, []);
      return [vnode];
    }

    case 'fragment': {
      const children = flattenChildren((element.props || {}).children);
      return renderChildrenFlatten(children, ctx, index, keyedOldMap, keyedOldByIndex, consumedOld);
    }

    case 'portal': {
      // Portal: children 渲染到指定 container 的 root
      const portalContainer = element.containerInfo;
      const children = flattenChildren(element.children);
      if (portalContainer && portalContainer.root) {
        const rootVNode = portalContainer.root as VNode;
        debugRenderLight(
          'enter portal branch',
          `target=${getDebugVNodeName(rootVNode)}`,
          `children=${children.length}`
        );
        // Portal 相当于独立渲染到另一个 container
        const oldChildVNodes = getChildVNodes(rootVNode);
        renderChildrenInto(children, rootVNode, portalContainer, ctx.currentComponent, oldChildVNodes);
      }
      return []; // Portal 本身不产生 VNode
    }

    case 'provider': {
      const type = element.type;
      const props = element.props || {};
      const context = getContextObjectFromType(type);
      const prevValue = getContextCurrentValue(context);
      debugRenderLight(
        'enter provider branch',
        `type=${getDebugTypeName(type)}`,
        `parent=${getDebugVNodeName(ctx.parentVNode)}`
      );
      setContextCurrentValue(context, props.value);
      try {
        const children = flattenChildren(props.children);
        return renderChildrenFlatten(children, ctx, index, keyedOldMap, keyedOldByIndex, consumedOld);
      } finally {
        setContextCurrentValue(context, prevValue);
      }
    }

    case 'consumer': {
      const type = element.type;
      const props = element.props || {};
      const renderChild = props.children;
      if (typeof renderChild !== 'function') {
        debugRenderLight('consumer missing render fn', `type=${getDebugTypeName(type)}`);
        return [];
      }
      const context = getContextObjectFromType(type);
      const value = getContextCurrentValue(context);
      let childElement: any = null;
      try {
        childElement = renderChild(value);
      } catch (e) {
        console.error('[render-light] Error rendering context consumer', getDebugTypeName(type), e);
        return [];
      }
      debugRenderLight(
        'enter consumer branch',
        `type=${getDebugTypeName(type)}`,
        `child=${getDebugElementName(childElement)}`
      );
      return renderChildrenFlatten([childElement], ctx, index, keyedOldMap, keyedOldByIndex, consumedOld);
    }

    case 'component': {
      debugRenderLight('enter component branch', `type=${getDebugTypeName(element.type)}`, `index=${index}`);
      return renderFunctionComponent(element, ctx, index);
    }

    case 'vnode':
      return [element];

    case 'invalid':
    default:
      return [];
  }
}

// ============================================================
// 获取一个 VNode 的子 VNode 列表
// ============================================================

function getChildVNodes(parent: VNode): VNode[] {
  const arr: VNode[] = [];
  let item = parent.firstChild;
  while (item) {
    arr.push(item);
    item = item.nextSibling;
  }
  return arr;
}

// ============================================================
// 渲染子组件（函数组件 + 类组件）
// ============================================================

function renderFunctionComponent(element: any, ctx: RenderContext, index: number): VNode[] {
  const type = element.type;
  const props = element.props || {};
  const ref = element.ref;
  const key = getElementKey(element, index);
  const Component = unwrapComponentType(type);

  if (Component == null || typeof Component !== 'function') {
    debugRenderLight(
      'skip non-callable component',
      `type=${getDebugTypeName(type)}`,
      `rawType=${typeof type}`,
      `resolved=${typeof Component}`
    );
    return [];
  }

  const reusableComponent = findReusableComponent(ctx.oldComponents, key, type, ctx.parentVNode);
  const comp = reusableComponent ?? createComponent(type, props, ref, ctx.container, ctx.currentComponent);
  const isMount = reusableComponent === null;
  debugRenderLight(
    `component ${isMount ? 'mount' : 'reuse'}`,
    `type=${getDebugTypeName(type)}`,
    `key=${key}`,
    `parent=${getDebugVNodeName(ctx.parentVNode)}`,
    `prevOutput=${comp.outputVNodes.length}`
  );
  comp.props = props;
  comp.ref = ref;
  comp.parentVNode = ctx.parentVNode;
  comp.key = key;
  comp.elementType = type;
  comp.didRender = true;
  ctx.usedChildComponents.add(comp);

  let childElement: any = null;

  if (comp.isClass) {
    // ==================== 类组件渲染 ====================
    try {
      const instance = comp.classInstance ?? new Component(props);
      comp.classInstance = instance;

      if (isMount) {
        if (ref) {
          if (typeof ref === 'function') {
            ref(instance);
          } else if (ref && typeof ref === 'object') {
            (ref as any).current = instance;
          }
        }

        if (typeof instance.componentWillMount === 'function') {
          instance.componentWillMount();
        }

        if (typeof (instance as any).UNSAFE_componentWillMount === 'function') {
          (instance as any).UNSAFE_componentWillMount();
        }
      } else {
        instance.props = props;

        if (typeof instance.componentWillReceiveProps === 'function') {
          instance.componentWillReceiveProps(props);
        }
        if (typeof (instance as any).UNSAFE_componentWillReceiveProps === 'function') {
          (instance as any).UNSAFE_componentWillReceiveProps(props);
        }

        let shouldUpdate = true;
        if (typeof instance.shouldComponentUpdate === 'function') {
          shouldUpdate = instance.shouldComponentUpdate(props, instance.state || null);
        }

        if (!shouldUpdate) {
          comp.didRender = false;
          debugRenderLight(`component skip update type=${comp.componentName} key=${key}`);
          return comp.outputVNodes.slice();
        }

        if (typeof instance.componentWillUpdate === 'function') {
          instance.componentWillUpdate(props, instance.state || null);
        }
        if (typeof (instance as any).UNSAFE_componentWillUpdate === 'function') {
          (instance as any).UNSAFE_componentWillUpdate(props, instance.state || null);
        }

        if (ref) {
          if (typeof ref === 'function') {
            ref(instance);
          } else if (ref && typeof ref === 'object') {
            (ref as any).current = instance;
          }
        }
      }

      instance.props = props;
      childElement = instance.render();
    } catch (e) {
      console.error('[render-light] Error rendering class component', comp.componentName, e);
      childElement = null;
    }
    // 注册为 pendingDidMount（挂载完成后调用 componentDidMount）
    if (isMount) {
      pendingDidMount.add(comp);
    }
  } else {
    // ==================== 函数组件渲染 ====================
    pushRenderContext(comp as any);
    const prevDispatcher = ReactCurrentDispatcher?.current;
    if (ReactCurrentDispatcher) {
      ReactCurrentDispatcher.current = lightDispatcher;
    }
    try {
      if (hasForwardRef(type)) {
        childElement = (Component as any)(props, ref);
      } else {
        childElement = (Component as any)(props);
      }
    } catch (e) {
      console.error('[render-light] Error rendering component', comp.componentName, e);
      childElement = null;
    } finally {
      if (ReactCurrentDispatcher) {
        ReactCurrentDispatcher.current = prevDispatcher;
      }
      popRenderContext();
    }
  }

  // 扁平化为 element 列表
  const children = childElement == null ? [] : flattenChildren([childElement]);
  debugRenderLight(
    'component output',
    `type=${comp.componentName}`,
    `key=${key}`,
    `childElement=${getDebugElementName(childElement)}`,
    `children=${children.length}`,
    `childKinds=${children.map(child => getElementKind(child)).join(',') || 'empty'}`
  );
  const oldChildComponents = new Set(comp.children);

  // 渲染子元素，产出的 VNode 列表
  // 注意：组件的产出 VNode 挂载到外层 parentVNode
  const previousOutput = comp.outputVNodes.slice();
  const oldByKey = new Map<string, VNode>();
  previousOutput.forEach((vnode, vnodeIndex) => {
    const vnodeKey = (vnode as any)._rsmaxKey != null ? String((vnode as any)._rsmaxKey) : String(vnodeIndex);
    oldByKey.set(vnodeKey, vnode);
  });

  const result: VNode[] = [];
  const childCtx: RenderContext = {
    container: ctx.container,
    currentComponent: comp,
    parentVNode: ctx.parentVNode,
    isFirstRender: previousOutput.length === 0,
    oldVNodes: previousOutput,
    oldComponents: oldChildComponents,
    usedChildComponents: new Set(),
  };

  const outputConsumed = new Set<VNode>();

  for (let i = 0; i < children.length; i++) {
    debugRenderLight(
      'render component child',
      `owner=${comp.componentName}`,
      `index=${i}`,
      `element=${getDebugElementName(children[i])}`
    );
    const vnodes = renderElement(children[i], childCtx, i, oldByKey, previousOutput, outputConsumed);
    for (const vnode of vnodes) {
      result.push(vnode);
    }
  }

  oldChildComponents.forEach(child => {
    if (!childCtx.usedChildComponents.has(child)) {
      destroyComponent(child);
    }
  });

  comp.outputVNodes = result.slice();
  if (!isMount && comp.isClass && comp.didRender) {
    pendingDidUpdate.add(comp);
  }
  return result;
}

// ============================================================
// 渲染 children 列表到指定 parentVNode
// 这是核心的子节点协调逻辑
// ============================================================

function renderChildrenInto(
  children: any[],
  parentVNode: VNode,
  container: Container,
  parentComponent: LightComponent | null,
  oldChildVNodes: VNode[]
): void {
  debugRenderLight(
    'renderChildrenInto',
    `parent=${getDebugVNodeName(parentVNode)}`,
    `children=${children.length}`,
    `old=${oldChildVNodes.length}`,
    `component=${parentComponent?.componentName || 'root'}`
  );
  // 构建旧 VNode 的 key 映射（用于复用）
  const oldByKey = new Map<string, VNode>();
  const oldByIndex: VNode[] = [];
  oldChildVNodes.forEach((vnode, i) => {
    const key = (vnode as any)._rsmaxKey != null ? String((vnode as any)._rsmaxKey) : String(i);
    oldByKey.set(key, vnode);
    oldByIndex.push(vnode);
  });

  // 产出的新 VNode 列表
  const newChildVNodes: VNode[] = [];
  const consumedOld = new Set<VNode>();

  const ctx: RenderContext = {
    container,
    currentComponent: parentComponent,
    parentVNode,
    isFirstRender: oldChildVNodes.length === 0,
    oldVNodes: oldChildVNodes,
    oldComponents: parentComponent ? new Set(parentComponent.children) : getRootComponents(parentVNode),
    usedChildComponents: new Set(),
  };

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const vnodes = renderElement(child, ctx, i, oldByKey, oldByIndex, consumedOld);
    for (const vnode of vnodes) {
      newChildVNodes.push(vnode);
    }
  }

  // 处理未被复用的旧 VNode → 删除
  for (const oldVNode of oldChildVNodes) {
    if (!consumedOld.has(oldVNode) && !isVNodeInList(oldVNode, newChildVNodes)) {
      debugRenderLight(
        'remove old vnode',
        `parent=${getDebugVNodeName(parentVNode)}`,
        `child=${getDebugVNodeName(oldVNode)}`
      );
      parentVNode.removeChild(oldVNode);
    }
  }

  ctx.oldComponents.forEach(component => {
    if (!ctx.usedChildComponents.has(component)) {
      destroyComponent(component);
    }
  });

  // 将新 VNode 按正确顺序挂载到 parentVNode
  mountVNodesInOrder(parentVNode, newChildVNodes, oldChildVNodes);
}

function isVNodeInList(target: VNode, list: VNode[]): boolean {
  for (const item of list) {
    if (item === target) return true;
    // 递归检查子节点（防止函数组件产出的嵌套 VNode）
    const children = getChildVNodes(item);
    if (isVNodeInList(target, children)) return true;
  }
  return false;
}

// ============================================================
// 将 VNode 按顺序挂载到父 VNode
// 这是关键的挂载逻辑：
//   - 复用的 VNode: 如果位置变化了需要 insertBefore
//   - 新增的 VNode: 直接 appendChild 或 insertBefore
// ============================================================

function mountVNodesInOrder(parent: VNode, newChildren: VNode[], oldChildren: VNode[]): void {
  debugRenderLight(
    'mountVNodesInOrder',
    `parent=${getDebugVNodeName(parent)}`,
    `new=${newChildren.length}`,
    `old=${oldChildren.length}`
  );
  if (newChildren.length === 0) {
    // 清空所有子节点
    const toRemove = getChildVNodes(parent);
    for (const child of toRemove) {
      parent.removeChild(child);
    }
    return;
  }

  // 为了简单和正确性，采用两步策略：
  // 1. 先从 parent 中移除所有旧的但不在新列表中的 VNode
  // 2. 按新顺序，把新 VNode 挂载到正确位置

  const newSet = new Set(newChildren);

  // 第一步：删除不再需要的旧 VNode
  for (const oldChild of oldChildren) {
    if (!newSet.has(oldChild)) {
      // 这个旧 VNode 不在新列表中 → 删除
      parent.removeChild(oldChild);
    }
  }

  // 第二步：按新顺序挂载
  // 策略：逐个检查当前 parent 的第一个子节点是否为期望的 VNode
  // 如果不是，则把期望的 VNode 用 insertBefore 或 appendChild 放到正确位置

  // 构建索引映射
  const newIndex = new Map<VNode, number>();
  newChildren.forEach((vnode, idx) => newIndex.set(vnode, idx));

  // 简化方案：重新按顺序挂载
  // 先把所有新 VNode 从 parent 中临时移除（如果已存在）
  // 然后按顺序 append / insert

  // 但 VNode.removeChild 后，firstChild 会更新
  // 更简单的方法：按顺序遍历，确保每个新 VNode 在正确位置

  // 获取挂载前的 children 状态
  let mountedChildren = getChildVNodes(parent);
  const mountedSet = new Set(mountedChildren);

  // 检查是否已有正确顺序
  let needsReorder = false;
  if (mountedChildren.length === newChildren.length) {
    for (let i = 0; i < newChildren.length; i++) {
      if (mountedChildren[i] !== newChildren[i]) {
        needsReorder = true;
        break;
      }
    }
  } else {
    needsReorder = true;
  }

  if (!needsReorder) return;

  // 重新挂载：按新列表顺序处理
  // 先收集所有已挂载但位置不对的 VNode，将它们从 parent 中"解绑"再按新顺序挂载
  // 由于 VNode 是链表结构，我们需要特殊处理

  // 最简单且正确的方案：
  //   - 对每个新 VNode，如果已在正确位置则跳过
  //   - 否则 insertBefore 到正确位置

  // 先确保所有 newChildren 都已挂载在 parent 下（新增的可能还没挂载）
  // 然后按顺序重新排列

  // 第一遍：把未挂载的 VNode 追加到末尾
  for (const vnode of newChildren) {
    if (!mountedSet.has(vnode)) {
      debugRenderLight('append new vnode', `parent=${getDebugVNodeName(parent)}`, `child=${getDebugVNodeName(vnode)}`);
      parent.appendChild(vnode);
      mountedSet.add(vnode);
    }
  }

  // 重新获取 children（可能已变化）
  let currentList = getChildVNodes(parent);

  // 第二遍：按新顺序用 insertBefore 调整位置
  // 从后往前处理：让每个 VNode 出现在正确的位置
  for (let targetIdx = newChildren.length - 1; targetIdx >= 0; targetIdx--) {
    const target = newChildren[targetIdx];
    // 获取当前 target 的位置
    const currentIdx = currentList.indexOf(target);

    if (currentIdx === targetIdx) continue; // 位置正确

    // 需要把 target 移到 targetIdx 位置
    // 先移除再插入
    parent.removeChild(target);

    // 重新获取列表（removeChild 会改变链表）
    currentList = getChildVNodes(parent);

    // 找到目标位置的"下一个兄弟节点"（用于 insertBefore）
    const nextSibling = currentList[targetIdx] || null;

    if (nextSibling) {
      debugRenderLight(
        'reorder vnode',
        `parent=${getDebugVNodeName(parent)}`,
        `child=${getDebugVNodeName(target)}`,
        `before=${getDebugVNodeName(nextSibling)}`
      );
      parent.insertBefore(target, nextSibling);
    } else {
      debugRenderLight(
        'move vnode to tail',
        `parent=${getDebugVNodeName(parent)}`,
        `child=${getDebugVNodeName(target)}`
      );
      parent.appendChild(target);
    }

    // 更新 currentList
    currentList = getChildVNodes(parent);
  }
}

// ============================================================
// 渲染扁平 children 列表
// ============================================================

function renderChildrenFlatten(
  children: any[],
  ctx: RenderContext,
  startIndex: number,
  keyedOldMap: Map<string, VNode>,
  keyedOldByIndex: VNode[],
  consumedOld: Set<VNode>
): VNode[] {
  const result: VNode[] = [];
  for (let i = 0; i < children.length; i++) {
    const vnodes = renderElement(children[i], ctx, startIndex + i, keyedOldMap, keyedOldByIndex, consumedOld);
    for (const vnode of vnodes) {
      result.push(vnode);
    }
  }
  return result;
}

// ============================================================
// 公共 API - render 入口
// ============================================================

export default function render(rootElement: any, container: Container): any {
  // 根元素扁平为列表
  const rootChildren = rootElement == null ? [] : flattenChildren([rootElement]);
  debugRenderLight('render start', `rootChildren=${rootChildren.length}`, `root=${getDebugVNodeName(container.root)}`);

  // 获取 root 的当前子 VNode 列表（用于更新时复用）
  const oldChildVNodes = getChildVNodes(container.root);

  // 核心渲染：把 rootChildren 渲染到 container.root
  renderChildrenInto(rootChildren, container.root, container, null, oldChildVNodes);

  // flush VNode 更新到小程序
  container.applyUpdate();
  flushComponentLifecycles();

  // layout effects 同步执行
  flushLayoutEffects();

  // passive effects 异步调度
  flushPassiveEffects();

  return container.root;
}

// ============================================================
// 组件重新渲染
// ============================================================

function reRenderComponent(component: LightComponent): void {
  if (!component.mounted) return;

  debugRenderLight(
    'reRender start',
    `component=${component.componentName}`,
    `key=${component.key ?? 'null'}`,
    `output=${component.outputVNodes.length}`
  );
  component.dirty = false;
  const mountParent = findMountParentVNode(component);
  if (!mountParent) return;

  const oldOutput = component.outputVNodes.slice();
  const mountedChildren = getChildVNodes(mountParent);
  const oldOutputSet = new Set(oldOutput);
  let insertIndex = mountedChildren.findIndex(child => oldOutputSet.has(child));
  if (insertIndex === -1) {
    insertIndex = mountedChildren.length;
  }

  const newVNodes = renderFunctionComponent(
    {
      type: component.type,
      props: component.props,
      ref: component.ref,
      key: component.key,
    },
    {
      container: component.container,
      currentComponent: component.parent,
      parentVNode: mountParent,
      isFirstRender: false,
      oldVNodes: oldOutput,
      oldComponents: component.parent ? new Set(component.parent.children) : getRootComponents(mountParent),
      usedChildComponents: new Set(),
    },
    insertIndex
  );

  const nextChildren = mountedChildren.filter(child => !oldOutputSet.has(child));
  nextChildren.splice(insertIndex, 0, ...newVNodes);
  mountVNodesInOrder(mountParent, nextChildren, mountedChildren);

  // flush 到小程序
  component.container.applyUpdate();
  flushComponentLifecycles();
  flushLayoutEffects();
  flushPassiveEffects();
}

function findMountParentVNode(comp: LightComponent): VNode | null {
  // 向上找最近的有 parentVNode 的祖先
  let current: LightComponent | null = comp;
  while (current) {
    if (current.parentVNode) return current.parentVNode;
    current = current.parent;
  }
  // fallback: 直接挂到 container.root
  return comp.container.root;
}

// ============================================================
// 设置 reRender 回调
// ============================================================

setReRenderFn(reRenderComponent as any);

export { batchedUpdates, batchedUpdates as unstable_batchedUpdates };
