/**
 * Lightweight React Hooks implementation
 * 轻量级 React Hooks 实现
 *
 * Designed to work with render-light.ts
 * Hook state is stored on the LightNode of the currently rendering component.
 *
 * Design principles:
 * 1. No priority scheduling - synchronous + queueMicrotask for deferred work
 * 2. No time-slicing - render completes in one pass
 * 3. Simple batching - multiple setState calls in one event batch
 */

import scheduler from './scheduler';
import type { LightNode } from './render-light-types';

// ============================================================
// Rendering Context
// ============================================================

/** The component currently being rendered (set by render-light.ts) */
export let currentComponent: LightNode | null = null;

/** Index into the current component's hooks array */
let currentHookIndex = 0;

/** Stack for nested render calls (useMemo callbacks that render, etc.) */
interface RenderContext {
  component: LightNode | null;
  hookIndex: number;
}

const renderStack: RenderContext[] = [];

export function pushRenderContext(node: LightNode): void {
  renderStack.push({ component: currentComponent, hookIndex: currentHookIndex });
  currentComponent = node;
  currentHookIndex = 0;
  if (!node.memoizedState) node.memoizedState = [];
}

export function popRenderContext(): void {
  const ctx = renderStack.pop();
  if (ctx) {
    currentComponent = ctx.component;
    currentHookIndex = ctx.hookIndex;
  }
}

// ============================================================
// Hook Data Structures
// ============================================================

export type HookType = 'state' | 'effect' | 'layout' | 'ref' | 'memo' | 'context';

export interface Hook {
  type: HookType;
  state: any;
  queue?: Array<(prev: any) => any>;
  effect?: {
    create: () => void | (() => void);
    destroy?: () => void;
    deps?: any[];
  };
  memo?: {
    value: any;
    deps: any[];
  };
}

// ============================================================
// Effect Queue
// ============================================================

interface PendingEffect {
  node: LightNode;
  hook: Hook;
}

/** Effects scheduled via useEffect - run after paint */
const passiveEffects: PendingEffect[] = [];

/** Effects scheduled via useLayoutEffect - run before paint */
const layoutEffects: PendingEffect[] = [];

// ============================================================
// Dirty Component Tracking
// ============================================================

const dirtyComponents: Set<LightNode> = new Set();
let updateScheduled = false;

export function scheduleComponentUpdate(node: LightNode): void {
  dirtyComponents.add(node);
  if (!updateScheduled) {
    updateScheduled = true;
    // Schedule the update using queueMicrotask
    scheduler.unstable_scheduleCallback(() => {
      updateScheduled = false;
      flushDirtyComponents();
    });
  }
}

function flushDirtyComponents(): void {
  const dirty = Array.from(dirtyComponents);
  dirtyComponents.clear();

  for (const node of dirty) {
    if (!node.dirty) continue; // Might have been updated by a parent
    reRenderComponent(node);
  }
}

// ============================================================
// Batching
// ============================================================

let batchDepth = 0;
const pendingBatched: LightNode[] = [];

export function batchedUpdates<T>(fn: () => T): T {
  batchDepth++;
  try {
    return fn();
  } finally {
    batchDepth--;
    if (batchDepth === 0 && pendingBatched.length > 0) {
      const toUpdate = pendingBatched.splice(0);
      for (const node of toUpdate) {
        scheduleComponentUpdate(node);
      }
    }
  }
}

// ============================================================
// Core Hook Helpers
// ============================================================

function getOrCreateHook(type: HookType): Hook {
  if (!currentComponent) {
    throw new Error('Hooks can only be called inside function components');
  }

  const hooks = currentComponent.memoizedState!;
  let hook = hooks[currentHookIndex];

  if (!hook) {
    hook = { type, state: undefined };
    hooks.push(hook);
  } else if (hook.type !== type) {
    // Type mismatch - warn but continue (in production, just overwrite)
    hook.type = type;
  }

  currentHookIndex++;
  return hook;
}

function depsChanged(prevDeps: any[] | undefined, nextDeps: any[] | undefined): boolean {
  if (!prevDeps || !nextDeps) return true;
  if (prevDeps.length !== nextDeps.length) return true;
  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) return true;
  }
  return false;
}

// ============================================================
// useState
// ============================================================

export function useState<T>(initialValue: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void] {
  const hook = getOrCreateHook('state');
  const component = currentComponent;

  if (hook.state === undefined && !hook.queue) {
    hook.state = typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  }

  // Process pending updates
  if (hook.queue && hook.queue.length > 0) {
    let state = hook.state;
    for (const update of hook.queue) {
      state = typeof update === 'function' ? update(state) : update;
    }
    hook.queue = [];
    hook.state = state;
  }

  const setState = (value: T | ((prev: T) => T)) => {
    const newState = typeof value === 'function' ? (value as (prev: T) => T)(hook.state) : value;

    if (Object.is(hook.state, newState) || !component) return;

    hook.state = newState;
    component.dirty = true;
    if (batchDepth > 0) {
      if (pendingBatched.indexOf(component) === -1) {
        pendingBatched.push(component);
      }
    } else {
      scheduleComponentUpdate(component);
    }
  };

  return [hook.state, setState];
}

// ============================================================
// useReducer
// ============================================================

export function useReducer<S, A>(
  reducer: (state: S, action: A) => S,
  initialArg: S,
  init?: (arg: S) => S
): [S, (action: A) => void] {
  const hook = getOrCreateHook('state');
  const component = currentComponent;

  if (hook.state === undefined && !hook.queue) {
    hook.state = init ? init(initialArg) : initialArg;
  }

  if (hook.queue && hook.queue.length > 0) {
    let state = hook.state;
    for (const action of hook.queue as any[]) {
      state = reducer(state, action as A);
    }
    hook.queue = [];
    hook.state = state;
  }

  const dispatch = (action: A) => {
    const newState = reducer(hook.state, action);
    if (Object.is(hook.state, newState) || !component) return;

    hook.state = newState;
    component.dirty = true;
    if (batchDepth > 0) {
      if (pendingBatched.indexOf(component) === -1) {
        pendingBatched.push(component);
      }
    } else {
      scheduleComponentUpdate(component);
    }
  };

  return [hook.state, dispatch];
}

// ============================================================
// useEffect
// ============================================================

export function useEffect(create: () => void | (() => void), deps?: any[]): void {
  const hook = getOrCreateHook('effect');
  const prevEffect = hook.effect;

  if (depsChanged(prevEffect?.deps, deps)) {
    hook.effect = { create, deps };
    passiveEffects.push({ node: currentComponent!, hook });
  }
}

// ============================================================
// useLayoutEffect
// ============================================================

export function useLayoutEffect(create: () => void | (() => void), deps?: any[]): void {
  const hook = getOrCreateHook('layout');
  const prevEffect = hook.effect;

  if (depsChanged(prevEffect?.deps, deps)) {
    hook.effect = { create, deps };
    layoutEffects.push({ node: currentComponent!, hook });
  }
}

// ============================================================
// useRef
// ============================================================

export function useRef<T>(initialValue: T): { current: T } {
  const hook = getOrCreateHook('ref');
  if (hook.state === undefined) {
    hook.state = { current: initialValue };
  }
  return hook.state;
}

// ============================================================
// useMemo
// ============================================================

export function useMemo<T>(factory: () => T, deps?: any[]): T {
  const hook = getOrCreateHook('memo');

  if (!hook.memo || depsChanged(hook.memo.deps, deps)) {
    hook.memo = {
      value: factory(),
      deps: deps || [],
    };
  }

  return hook.memo.value;
}

// ============================================================
// useCallback
// ============================================================

export function useCallback<T extends Function>(callback: T, deps?: any[]): T {
  return useMemo(() => callback, deps);
}

// ============================================================
// useContext
// ============================================================

export function useContext<T>(context: any): T {
  const hook = getOrCreateHook('context');
  hook.state = context;

  if (context == null || typeof context !== 'object') {
    return undefined as T;
  }

  if ('_currentValue' in context) {
    return context._currentValue as T;
  }

  if ('_currentValue2' in context) {
    return context._currentValue2 as T;
  }

  return undefined as T;
}

// ============================================================
// useImperativeHandle / useDebugValue
// ============================================================

export function useImperativeHandle<T>(ref: any, create: () => T, deps?: any[]): void {
  useLayoutEffect(() => {
    const value = create();

    if (typeof ref === 'function') {
      ref(value);
      return () => ref(null);
    }

    if (ref && typeof ref === 'object') {
      ref.current = value;
      return () => {
        ref.current = null;
      };
    }
  }, deps);
}

export function useDebugValue(_value: any): void {
  // noop
}

// ============================================================
// Effect Flushing (called by render-light.ts)
// ============================================================

export function flushLayoutEffects(): void {
  while (layoutEffects.length > 0) {
    const pending = layoutEffects.splice(0);
    for (const { node, hook } of pending) {
      if (node.dirty) continue; // Skip if component was marked dirty during render
      if (hook.effect) {
        // Run previous cleanup
        if (hook.effect.destroy) {
          try {
            hook.effect.destroy();
          } catch (e) {
            console.error('Error in useLayoutEffect cleanup:', e);
          }
        }
        // Run effect and capture cleanup
        try {
          const destroy = hook.effect.create();
          if (typeof destroy === 'function') {
            hook.effect.destroy = destroy;
          }
        } catch (e) {
          console.error('Error in useLayoutEffect:', e);
        }
      }
    }
  }
}

export function flushPassiveEffects(): void {
  if (passiveEffects.length === 0) return;

  scheduler.unstable_scheduleCallback(() => {
    const pending = passiveEffects.splice(0);
    for (const { node, hook } of pending) {
      if (node.dirty) continue;
      if (hook.effect) {
        if (hook.effect.destroy) {
          try {
            hook.effect.destroy();
          } catch (e) {
            console.error('Error in useEffect cleanup:', e);
          }
        }
        try {
          const destroy = hook.effect.create();
          if (typeof destroy === 'function') {
            hook.effect.destroy = destroy;
          }
        } catch (e) {
          console.error('Error in useEffect:', e);
        }
      }
    }
  });
}

export function cleanupEffectsForNode(node: LightNode): void {
  if (!node.memoizedState) return;

  for (const hook of node.memoizedState) {
    if (hook.effect?.destroy) {
      try {
        hook.effect.destroy();
      } catch (e) {
        // ignore
      }
    }
  }
}

// ============================================================
// Re-render Entry (called from setState scheduling)
// ============================================================

// This will be set by render-light.ts to avoid circular dependency
export type ReRenderFn = (node: LightNode) => void;
let reRenderComponent: ReRenderFn = () => {
  throw new Error('reRenderComponent not set - render-light.ts must set this');
};

export function setReRenderFn(fn: ReRenderFn): void {
  reRenderComponent = fn;
}
