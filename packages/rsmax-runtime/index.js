let currentInstance = null;
let hookIndex = 0;
let isRerunning = false;
let isFirstRun = false;

function getInstance() {
  if (!currentInstance) {
    throw new Error('Hooks can only be called inside a functional component.');
  }
  return currentInstance;
}

function _initHooks(instance, firstRun) {
  if (!instance._hooks) {
    instance._hooks = [];
    instance._effects = [];
    instance._pendingEffects = [];
    instance._eventHandlers = {};
    instance._storeUnsubs = [];
  }
  instance._effects = [];
  instance._pendingEffects = [];
  instance._pendingStoreData = {};
  hookIndex = 0;
  currentInstance = instance;
  isFirstRun = firstRun;
}

function useState(initialValue, key) {
  const instance = getInstance();
  const idx = hookIndex++;
  const stateKey = key || `s${idx}`;
  
  if (!instance._hooks[idx]) {
    instance._hooks[idx] = { type: 'state', key: stateKey };
  }
  
  const hook = instance._hooks[idx];
  const state = instance.data[hook.key];
  
  const setState = (updater) => {
    const oldVal = instance.data[hook.key];
    const newVal = typeof updater === 'function' ? updater(oldVal) : updater;
    if (oldVal !== newVal) {
      const updateData = {};
      updateData[hook.key] = newVal;
      instance.setData(updateData, () => {
        _rerender(instance);
      });
    }
  };
  
  return [state, setState];
}

function useEffect(fn, deps) {
  const instance = getInstance();
  const idx = hookIndex++;
  
  if (!instance._hooks[idx]) {
    instance._hooks[idx] = { type: 'effect', deps: null, cleanup: null };
  }
  
  const hook = instance._hooks[idx];
  
  const runEffect = () => {
    if (hook.cleanup) {
      const cleanup = hook.cleanup;
      hook.cleanup = null;
      cleanup.call(instance);
    }
    const result = fn.call(instance);
    if (typeof result === 'function') {
      hook.cleanup = result;
    }
  };
  
  if (deps === undefined || deps === null) {
    instance._effects.push(runEffect);
  } else {
    const oldDeps = hook.deps;
    let changed = !oldDeps;
    if (oldDeps) {
      changed = deps.length !== oldDeps.length || deps.some((d, i) => d !== oldDeps[i]);
    }
    if (changed) {
      hook.deps = [...deps];
      instance._effects.push(runEffect);
    }
  }
}

let contexts = {};
let ctxId = 0;

function createContext(defaultValue) {
  const id = `__ctx_${ctxId++}`;
  contexts[id] = { defaultValue, currentValue: defaultValue };
  return { _id: id, _defaultValue: defaultValue };
}

function useContext(context) {
  const instance = getInstance();
  if (instance._providedCtx && instance._providedCtx[context._id] !== undefined) {
    return instance._providedCtx[context._id];
  }
  const ctx = contexts[context._id];
  if (ctx) return ctx.currentValue;
  return context._defaultValue !== undefined ? context._defaultValue : null;
}

function useQuery() {
  const instance = getInstance();
  return instance._query || {};
}

function usePageEvent(event, handler) {
  const instance = getInstance();
  const idx = hookIndex++;
  
  if (!instance._hooks[idx]) {
    instance._hooks[idx] = { type: 'event', event };
    const orig = instance[event];
    instance[event] = function(...args) {
      if (orig) orig.apply(this, args);
      const latestHandler = instance._eventHandlers[`${event}_${idx}`];
      if (latestHandler) latestHandler.apply(this, args);
    };
  }
  
  instance._eventHandlers[`${event}_${idx}`] = handler;
}

function useComponentEvent(event, handler) {
  usePageEvent(event, handler);
}

function useStore(store, selector, key) {
  const instance = getInstance();
  const idx = hookIndex++;
  const storeKey = key || `__store${idx}`;

  // Normalize selector: string → property accessor, falsy → identity
  const select = typeof selector === 'function'
    ? selector
    : (typeof selector === 'string'
        ? (state) => state[selector]
        : (state) => state);

  if (!instance._hooks[idx]) {
    instance._hooks[idx] = { type: 'store', key: storeKey, store, selector: select };

    // Get initial value from store synchronously
    const initialValue = select(store.getState());

    // Collect initial value to be set after user function runs
    instance._pendingStoreData[storeKey] = initialValue;
    instance.data[storeKey] = initialValue;

    // Subscribe to store changes
    const unsub = store.subscribe((state) => {
      if (instance._destroyed) return;
      const newVal = select(state);
      const oldVal = instance.data[storeKey];
      if (newVal !== oldVal) {
        const update = {};
        update[storeKey] = newVal;
        instance.setData(update, () => {
          _rerender(instance);
        });
      }
    });
    instance._storeUnsubs.push(unsub);
  }

  return instance.data[storeKey];
}

function useAppEvent(event, handler) {
  const instance = getInstance();
  const idx = hookIndex++;
  
  if (!instance._hooks[idx]) {
    instance._hooks[idx] = { type: 'appEvent', event };
    const app = typeof getApp === 'function' ? getApp() : null;
    if (app && app._rsmaxBus) {
      app._rsmaxBus.on(event, (...args) => {
        const latestHandler = instance._eventHandlers[`app_${event}_${idx}`];
        if (latestHandler && !instance._destroyed) {
          latestHandler.apply(instance, args);
        }
      }, instance);
    }
  }
  
  instance._eventHandlers[`app_${event}_${idx}`] = handler;
}

function _rerender(instance) {
  if (isRerunning) return;
  isRerunning = true;
  
  try {
    instance._effects = [];
    _initHooks(instance, false);
    // For components, pass this.data as props; for pages, no props argument
    if (instance._isComponent) {
      instance._userFn.call(instance, instance.data);
    } else {
      instance._userFn.call(instance);
    }
    instance._runEffects();
  } finally {
    isRerunning = false;
  }
}

function createApp(appConfig) {
  const listeners = {};
  
  const bus = {
    on(event, fn, ctx) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push({ fn, ctx });
    },
    off(event, fn) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter(l => l.fn !== fn);
    },
    emit(event, ...args) {
      if (!listeners[event]) return;
      listeners[event].forEach(l => {
        if (l.ctx && !l.ctx._destroyed) {
          l.fn.apply(l.ctx, args);
        } else if (!l.ctx) {
          l.fn.apply(null, args);
        }
      });
    }
  };
  
  appConfig._rsmaxBus = bus;
  
  const lifecycle = ['onLaunch', 'onShow', 'onHide', 'onError'];
  lifecycle.forEach(name => {
    const orig = appConfig[name];
    appConfig[name] = function(...args) {
      if (orig) orig.apply(this, args);
      bus.emit(name, ...args);
    };
  });
  
  return appConfig;
}

function createPage(userFn, pageConfig = {}) {
  const config = {
    data: pageConfig.data || {},
    
    onLoad(options) {
      this._query = options || {};
      this._userFn = userFn;
      this._run(true);
    },
    
    onShow() {
      if (this._mounted) {
        this._flushPendingEffects();
      }
    },
    
    onReady() {
      this._ready = true;
      this._flushPendingEffects();
    },
    
    onHide() {},
    
    onUnload() {
      this._destroyed = true;
      this._cleanup();
    }
  };
  
  Object.keys(pageConfig).forEach(k => {
    if (k !== 'data') {
      config[k] = pageConfig[k];
    }
  });
  
  config._run = function(firstRun) {
    _initHooks(this, firstRun);
    this._userFn.call(this);
    this._mounted = true;
    // Apply initial store data via setData to ensure view is updated
    const pendingStoreData = this._pendingStoreData;
    this._pendingStoreData = {};
    if (Object.keys(pendingStoreData).length > 0) {
      this.setData(pendingStoreData);
    }
    this._runEffects();
  };
  
  config._runEffects = function() {
    const effects = this._effects;
    this._effects = [];
    effects.forEach(fn => fn.call(this));
  };
  
  config._flushPendingEffects = function() {
    const effects = this._pendingEffects || [];
    this._pendingEffects = [];
    effects.forEach(fn => fn.call(this));
  };
  
  config._cleanup = function() {
    const hooks = this._hooks || [];
    hooks.forEach(h => {
      if (h && h.cleanup) {
        h.cleanup.call(this);
      }
    });
    // Unsubscribe from all stores
    if (this._storeUnsubs) {
      this._storeUnsubs.forEach(unsub => {
        if (typeof unsub === 'function') unsub();
      });
      this._storeUnsubs = [];
    }
  };
  
  return config;
}

function createComponent(userFn, compConfig = {}) {
  const config = {
    _isComponent: true,
    properties: compConfig.properties || {},
    data: compConfig.data || {},
    
    lifetimes: {
      attached() {
        this._userFn = userFn;
        this._isComponent = true;
        this._run(true);
      },
      ready() {
        this._ready = true;
        this._flushPendingEffects();
      },
      detached() {
        this._destroyed = true;
        this._cleanup();
      }
    },
    
    pageLifetimes: {
      show() {
        if (this._mounted) {
          this._flushPendingEffects();
        }
      },
      hide() {}
    },

    methods: {
      _run(firstRun) {
        _initHooks(this, firstRun);
        this._userFn.call(this, this.data);
        this._mounted = true;
        // Apply initial store data via setData to ensure view is updated
        const pendingStoreData = this._pendingStoreData;
        this._pendingStoreData = {};
        if (Object.keys(pendingStoreData).length > 0) {
          this.setData(pendingStoreData);
        }
        this._runEffects();
      },

      _runEffects() {
        const effects = this._effects;
        this._effects = [];
        effects.forEach(fn => fn.call(this));
      },

      _flushPendingEffects() {
        const effects = this._pendingEffects || [];
        this._pendingEffects = [];
        effects.forEach(fn => fn.call(this));
      },

      _cleanup() {
        const hooks = this._hooks || [];
        hooks.forEach(h => {
          if (h && h.cleanup) {
            h.cleanup.call(this);
          }
        });
        // Unsubscribe from all stores
        if (this._storeUnsubs) {
          this._storeUnsubs.forEach(unsub => {
            if (typeof unsub === 'function') unsub();
          });
          this._storeUnsubs = [];
        }
      }
    }
  };
  
  // Merge user config (methods, observers, etc.)
  Object.keys(compConfig).forEach(k => {
    if (k === 'data' || k === 'properties' || k === 'lifetimes' || k === 'pageLifetimes') {
      return;
    }
    if (k === 'methods') {
      // Merge user methods with internal methods (internal methods take precedence)
      config.methods = { ...compConfig.methods, ...config.methods };
    } else {
      config[k] = compConfig[k];
    }
  });
  
  return config;
}

function promisify(api) {
  return function(arg = {}) {
    return new Promise((resolve, reject) => {
      const promisifyArg = arg;

      api({
        ...promisifyArg,
        success: (res) => {
          if (promisifyArg && typeof promisifyArg.success === 'function') {
            promisifyArg.success(res);
          }
          resolve(res);
        },
        fail: (res) => {
          if (promisifyArg && typeof promisifyArg.fail === 'function') {
            promisifyArg.fail(res);
          }
          reject(res);
        },
      });
    });
  };
}

module.exports = {
  useState,
  useEffect,
  useContext,
  useQuery,
  useStore,
  usePageEvent,
  useComponentEvent,
  useAppEvent,
  createContext,
  createApp,
  createPage,
  createComponent,
  promisify
};
