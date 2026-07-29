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

    // Create initial state from user config.
    // Pass a wrapped set that persists after state change.
    const initialState = config(
      (...args) => {
        set(...args);
        persistState();
      },
      get,
      api
    );

    // Merge hydrated state with initial state
    const mergedState = Object.assign({}, initialState, hasHydrated ? hydratedState : { __version: version });

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

    // Subscribe to state changes so that direct api.setState calls also persist
    // (e.g. store.setState({...}) outside of actions)
    api.subscribe(() => {
      persistState();
    });

    // If hydrated, save back to ensure version field is stored
    if (hasHydrated) {
      // Schedule persist after state is set (next tick)
      // We do it synchronously after return since we know mergedState is already set
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
