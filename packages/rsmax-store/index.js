/**
 * Rsmax Store - Zustand-like state management for WeChat Mini Program
 *
 * Core vanilla store: create, getState, setState, subscribe
 */

function createStore(createState) {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (nextState !== null && typeof nextState === 'object') {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach(listener => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);
  return api;
}

/**
 * Create a store instance.
 *
 * Usage:
 *   const store = create((set, get) => ({
 *     count: 0,
 *     increment: () => set(s => ({ count: s.count + 1 })),
 *   }));
 *
 *   // With persist middleware:
 *   const store = create(persist((set, get) => ({ ... }), { name: 'my-store' }));
 */
function create(createState) {
  // Support middleware pattern: if createState returns an api object (has getState),
  // it's already been wrapped by middleware.
  return createStore(createState);
}

module.exports = { create, createStore };
