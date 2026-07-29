const { describe, test, expect, beforeEach } = require('@rstest/core');
const { create, createStore } = require('../index');
const { persist } = require('../middleware');

function createMockFn(impl) {
  const fn = function (...args) {
    fn.calls.push(args);
    fn.callCount++;
    if (impl) return impl(...args);
  };
  fn.calls = [];
  fn.callCount = 0;
  fn.mockClear = () => { fn.calls = []; fn.callCount = 0; };
  fn.toHaveBeenCalled = () => fn.callCount > 0;
  fn.toHaveBeenCalledWith = (...expectedArgs) => {
    return fn.calls.some(call => JSON.stringify(call) === JSON.stringify(expectedArgs));
  };
  fn.not = { toHaveBeenCalled: () => fn.callCount === 0 };
  return fn;
}

// Mock wx storage for testing
const storageMock = (() => {
  const store = {};
  return {
    getItem(key) { return store[key]; },
    setItem(key, value) { store[key] = value; },
    removeItem(key) { delete store[key]; },
    clear() { Object.keys(store).forEach(k => delete store[k]); }
  };
})();

global.wx = {
  getStorageSync(key) { return storageMock.getItem(key); },
  setStorageSync(key, value) { storageMock.setItem(key, value); },
  removeStorageSync(key) { storageMock.removeItem(key); }
};

describe('@rsmax/store', () => {
  beforeEach(() => {
    storageMock.clear();
  });

  describe('createStore', () => {
    test('should create a store with initial state', () => {
      const store = createStore(() => ({ count: 0, name: 'test' }));
      expect(store.getState()).toEqual({ count: 0, name: 'test' });
    });

    test('should update state with setState (partial)', () => {
      const store = createStore(() => ({ count: 0, name: 'test' }));
      store.setState({ count: 1 });
      expect(store.getState().count).toBe(1);
      expect(store.getState().name).toBe('test');
    });

    test('should update state with setState (function updater)', () => {
      const store = createStore(() => ({ count: 0 }));
      store.setState(state => ({ count: state.count + 5 }));
      expect(store.getState().count).toBe(5);
    });

    test('should notify subscribers on state change', () => {
      const store = createStore(() => ({ count: 0 }));
      let receivedState, receivedPrev;
      const listener = createMockFn((state, prev) => {
        receivedState = state;
        receivedPrev = prev;
      });
      store.subscribe(listener);
      store.setState({ count: 1 });
      expect(listener.callCount).toBe(1);
      expect(receivedState).toEqual({ count: 1 });
      expect(receivedPrev).toEqual({ count: 0 });
    });

    test('should support multiple subscribers', () => {
      const store = createStore(() => ({ count: 0 }));
      const listener1 = createMockFn();
      const listener2 = createMockFn();
      store.subscribe(listener1);
      store.subscribe(listener2);
      store.setState({ count: 1 });
      expect(listener1.callCount).toBe(1);
      expect(listener2.callCount).toBe(1);
    });

    test('should unsubscribe', () => {
      const store = createStore(() => ({ count: 0 }));
      const listener = createMockFn();
      const unsub = store.subscribe(listener);
      unsub();
      store.setState({ count: 1 });
      expect(listener.callCount).toBe(0);
    });

    test('should support replace mode', () => {
      const store = createStore(() => ({ count: 0, name: 'test' }));
      store.setState({ count: 1 }, true);
      expect(store.getState()).toEqual({ count: 1 });
    });

    test('should provide set/get/api to creator function', () => {
      let capturedSet, capturedGet, capturedApi;
      const store = createStore((set, get, api) => {
        capturedSet = set;
        capturedGet = get;
        capturedApi = api;
        return { count: 0 };
      });
      expect(typeof capturedSet).toBe('function');
      expect(capturedGet).toBe(store.getState);
      expect(capturedApi).toBe(store);
    });

    test('actions defined in state should update state', () => {
      const store = createStore((set, get) => ({
        count: 0,
        increment: () => set({ count: get().count + 1 }),
      }));
      store.getState().increment();
      expect(store.getState().count).toBe(1);
    });

    test('destroy should clear all listeners', () => {
      const store = createStore(() => ({ count: 0 }));
      const listener = createMockFn();
      store.subscribe(listener);
      store.destroy();
      store.setState({ count: 1 });
      expect(listener.callCount).toBe(0);
    });
  });

  describe('create', () => {
    test('should create a store (alias for createStore)', () => {
      const store = create(() => ({ count: 0 }));
      expect(typeof store.getState).toBe('function');
      expect(typeof store.setState).toBe('function');
      expect(typeof store.subscribe).toBe('function');
      expect(store.getState().count).toBe(0);
    });
  });

  describe('persist middleware', () => {
    test('should persist state to storage when state changes', () => {
      const store = create(
        persist(
          (set, get) => ({
            count: 0,
            increment: () => set({ count: get().count + 1 }),
          }),
          { name: 'test-persist-1', storage: storageMock }
        )
      );

      store.getState().increment();
      const stored = storageMock.getItem('test-persist-1');
      expect(stored).toBeDefined();
      expect(stored.count).toBe(1);
    });

    test('should hydrate state from storage on creation', () => {
      storageMock.setItem('test-persist-2', { count: 42, __version: 0 });

      const store = create(
        persist(
          () => ({ count: 0 }),
          { name: 'test-persist-2', storage: storageMock }
        )
      );

      expect(store.getState().count).toBe(42);
    });

    test('should use initial state when storage is empty', () => {
      const store = create(
        persist(
          () => ({ count: 10 }),
          { name: 'test-persist-empty', storage: storageMock }
        )
      );

      expect(store.getState().count).toBe(10);
    });

    test('should support partialize to pick persisted fields', () => {
      const store = create(
        persist(
          (set, get) => ({
            count: 0,
            temp: 'should-not-persist',
            increment: () => set({ count: get().count + 1 }),
          }),
          {
            name: 'test-partialize',
            storage: storageMock,
            partialize: (state) => ({ count: state.count }),
          }
        )
      );

      store.getState().increment();
      const stored = storageMock.getItem('test-partialize');
      expect(stored.count).toBe(1);
      expect(stored.temp).toBeUndefined();
    });

    test('should call migrate function when version changes', () => {
      storageMock.setItem('test-migrate', { count: 5, __version: 0 });

      let migrateCalled = false;
      const migrateFn = (persistedState, version) => {
        migrateCalled = true;
        return { ...persistedState, count: persistedState.count * 10, migrated: true };
      };

      const store = create(
        persist(
          () => ({ count: 0, migrated: false }),
          {
            name: 'test-migrate',
            version: 1,
            storage: storageMock,
            migrate: migrateFn,
          }
        )
      );

      expect(migrateCalled).toBe(true);
      expect(store.getState().count).toBe(50);
      expect(store.getState().migrated).toBe(true);
    });

    test('should throw when name is not provided', () => {
      expect(() => {
        create(persist(() => ({ count: 0 }), {}));
      }).toThrow();
    });

    test('should handle multiple state updates', () => {
      const store = create(
        persist(
          (set, get) => ({
            count: 0,
            increment: () => set({ count: get().count + 1 }),
          }),
          { name: 'test-multi', storage: storageMock }
        )
      );

      store.getState().increment();
      store.getState().increment();
      store.getState().increment();
      expect(store.getState().count).toBe(3);
      const stored = storageMock.getItem('test-multi');
      expect(stored.count).toBe(3);
    });

    test('should persist across store recreations (hydration)', () => {
      storageMock.setItem('test-hydration', { count: 99, __version: 0 });

      const store1 = create(
        persist(() => ({ count: 0 }), { name: 'test-hydration', storage: storageMock })
      );
      expect(store1.getState().count).toBe(99);

      store1.setState({ count: 100 });

      // Create new store to simulate app restart
      const store2 = create(
        persist(() => ({ count: 0 }), { name: 'test-hydration', storage: storageMock })
      );
      expect(store2.getState().count).toBe(100);
    });
  });
});
