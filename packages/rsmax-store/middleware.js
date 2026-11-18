/**
 * Persist middleware - persists store state to wx.storage
 *
 * Usage:
 *   import { create } from '@rsmax/store';
 *   import { persist } from '@rsmax/store/middleware';
 *
 *   const store = create(persist((set, get) => ({
 *     count: 0,
 *     increment: () => set(s => ({ count: s.count + 1 })),
 *   }), {
 *     name: 'counter',        // storage key (required)
 *     // partialize: (state) => ({ count: state.count }), // optional: pick fields to persist
 *     // storage: {            // optional: custom storage (default: wx.storage sync API)
 *     //   getItem(key) { return wx.getStorageSync(key); },
 *     //   setItem(key, value) { wx.setStorageSync(key, value); },
 *     //   removeItem(key) { wx.removeStorageSync(key); },
 *     // },
 *     version: 0,             // optional: schema version for migration
 *     migrate: (persistedState, version) => newState, // optional
 *   }));
 */

const DEFAULT_STORAGE = {
  getItem(key) {
    if (typeof wx !== 'undefined' && wx.getStorageSync) {
      return wx.getStorageSync(key);
    }
    return undefined;
  },
  setItem(key, value) {
    if (typeof wx !== 'undefined' && wx.setStorageSync) {
      wx.setStorageSync(key, value);
    }
  },
  removeItem(key) {
    if (typeof wx !== 'undefined' && wx.removeStorageSync) {
      wx.removeStorageSync(key);
    }
  }
};

function persist(config, options) {
  const {
    name,
    partialize = (state) => state,
    storage = DEFAULT_STORAGE,
    version = 0,
    migrate
  } = options || {};

  if (!name) {
    throw new Error('[rsmax-store] persist middleware requires a "name" option for storage key');
  }

  return (set, get, api) => {
    // Attempt to hydrate from storage
    let hydratedState = {};
    let hasHydrated = false;

    try {
      const stored = storage.getItem(name);
      if (stored !== undefined && stored !== null && stored !== '') {
        if (typeof stored === 'string') {
          try {
            hydratedState = JSON.parse(stored);
          } catch (e) {
            hydratedState = {};
          }
        } else {
          hydratedState = stored;
        }

        // Handle version migration
        if (migrate && hydratedState.__version !== version) {
          hydratedState = migrate(hydratedState, hydratedState.__version) || hydratedState;
        }
        hydratedState.__version = version;
        hasHydrated = true;
      }
    } catch (e) {
      console.warn('[rsmax-store] Failed to hydrate from storage:', e);
    }

    // Persist current state
    function persistState() {
      try {
        const state = get();
        const partial = partialize(state);
        storage.setItem(name, partial);
      } catch (e) {
        console.warn('[rsmax-store] Failed to persist state:', e);
      }
    }

    // Subscribe to state changes so that BOTH action set() and direct api.setState()
    // calls persist. The wrapped set() below does NOT call persistState() directly,
    // otherwise every set() would write to storage twice (once here, once via subscription).
    api.subscribe(() => {
      persistState();
    });

    // Create initial state from user config.
    // The wrapped set delegates to the store's setState; persistence is handled by
    // the subscription above, so no explicit persistState() call is needed here.
    const initialState = config(
      (...args) => {
        set(...args);
      },
      get,
      api
    );

    // Merge hydrated state with initial state
    const mergedState = Object.assign({}, initialState, hasHydrated ? hydratedState : { __version: version });

    // If hydrated, persist the merged state (with updated __version) back to storage
    // so migration doesn't re-run on every launch. Defer to next microtask because
    // createStore assigns `state = createState(...)` only after this function returns;
    // calling persistState() synchronously here would read `get() === undefined`.
    if (hasHydrated) {
      Promise.resolve().then(persistState);
    }

    return mergedState;
  };
}

/**
 * Create JSON storage adapter - wraps storage to JSON serialize/deserialize
 */
function createJSONStorage(getStorage) {
  return {
    getItem(key) {
      const value = getStorage().getItem(key);
      if (value === undefined || value === null || value === '') return undefined;
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch {
        return value;
      }
    },
    setItem(key, value) {
      getStorage().setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    removeItem(key) {
      getStorage().removeItem(key);
    }
  };
}

module.exports = { persist, createJSONStorage };
