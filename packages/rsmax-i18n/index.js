/**
 * Rsmax I18n - JS module-based internationalization for WeChat Mini Program
 *
 * Language files are placed in src/locales/ as .js modules (e.g. zh-CN.js, en.js)
 * that export a plain object via module.exports.
 * The compiler copies them to dist/locales/ and generates rsmax-i18n-locales.js
 * which lazily requires each locale file on first access.
 *
 * t('key') calls in JSX are compiled to __i18n['key'] data bindings by
 * babel-plugin-jsx-to-wxml. The useI18n hook populates data.__i18n.
 */

var I18N_DATA_KEY = '__i18n';

var globalI18n = null;

function resolve(obj, path) {
  if (!obj || !path) return undefined;
  var keys = path.split('.');
  var result = obj;
  for (var i = 0; i < keys.length; i++) {
    if (result == null || typeof result !== 'object') return undefined;
    result = result[keys[i]];
  }
  return result;
}

function interpolate(str, params) {
  if (typeof str !== 'string' || !params) return str;
  return str.replace(/\{(\w+)\}/g, function(match, key) {
    return params[key] != null ? String(params[key]) : match;
  });
}

function deepFlatten(obj, prefix, result) {
  result = result || {};
  prefix = prefix || '';
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    Object.keys(obj).forEach(function(key) {
      var val = obj[key];
      var fullKey = prefix ? prefix + '.' + key : key;
      if (val && typeof val === 'object' && !Array.isArray(val)) {
        deepFlatten(val, fullKey, result);
      } else {
        result[fullKey] = val;
      }
    });
  }
  return result;
}

function loadLocalesMap() {
  try {
    return require('./rsmax-i18n-locales.js');
  } catch (e) {
    return {};
  }
}

function createI18n(options) {
  options = options || {};
  var messagesMap = {};
  var loadedLocales = {};
  var currentLocale = options.locale || 'zh-CN';
  var fallbackLocale = options.fallbackLocale || currentLocale;
  var inlineMessages = options.messages || {};
  var localesMap = loadLocalesMap();
  var listeners = [];

  Object.keys(inlineMessages).forEach(function(loc) {
    messagesMap[loc] = Object.assign({}, messagesMap[loc] || {}, inlineMessages[loc]);
    loadedLocales[loc] = true;
  });

  function ensureLoaded(locale) {
    if (loadedLocales[locale]) return;
    loadedLocales[locale] = true;
    var loader = localesMap[locale];
    if (typeof loader === 'function') {
      try {
        var msgs = loader();
        messagesMap[locale] = Object.assign({}, messagesMap[locale] || {}, msgs);
      } catch (e) {
        // locale file failed to load; ignore and fall back to existing messages
      }
    } else if (loader && typeof loader === 'object') {
      messagesMap[locale] = Object.assign({}, messagesMap[locale] || {}, loader);
    }
  }

  function getMessages(locale) {
    var loc = locale || currentLocale;
    ensureLoaded(loc);
    if (loc !== fallbackLocale && loc !== currentLocale) {
      ensureLoaded(fallbackLocale);
    }
    return messagesMap[loc] || {};
  }

  function getFlatMessages(locale) {
    var msgs = getMessages(locale);
    var fallbackMsgs = (locale !== fallbackLocale) ? getMessages(fallbackLocale) : {};
    return Object.assign({}, deepFlatten(fallbackMsgs), deepFlatten(msgs));
  }

  function t(key, params) {
    ensureLoaded(currentLocale);
    var msg = resolve(messagesMap[currentLocale], key);
    if (msg === undefined && currentLocale !== fallbackLocale) {
      ensureLoaded(fallbackLocale);
      msg = resolve(messagesMap[fallbackLocale], key);
    }
    if (msg === undefined) return key;
    return interpolate(msg, params);
  }

  function getLocale() {
    return currentLocale;
  }

  function setLocale(locale) {
    if (locale === currentLocale) return Promise.resolve();
    currentLocale = locale;
    ensureLoaded(locale);
    notifyChange();
    return Promise.resolve();
  }

  function addMessages(locale, messages) {
    messagesMap[locale] = Object.assign({}, messagesMap[locale] || {}, messages);
    loadedLocales[locale] = true;
    if (locale === currentLocale) {
      notifyChange();
    }
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      var idx = listeners.indexOf(fn);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  }

  function notifyChange() {
    var flatMsgs = getFlatMessages(currentLocale);
    for (var i = 0; i < listeners.length; i++) {
      try {
        listeners[i](currentLocale, flatMsgs);
      } catch (e) {
        // listener threw; continue notifying other subscribers
      }
    }
  }

  return {
    t: t,
    getLocale: getLocale,
    setLocale: setLocale,
    addMessages: addMessages,
    getMessages: getMessages,
    getFlatMessages: getFlatMessages,
    subscribe: subscribe
  };
}

function initI18n(options) {
  globalI18n = createI18n(options);
  return globalI18n;
}

function getI18n() {
  if (!globalI18n) {
    globalI18n = createI18n({});
  }
  return globalI18n;
}

function getCurrentInstance() {
  return globalThis.__RSMAX_CURRENT_INSTANCE__ || null;
}

function useI18n() {
  var instance = getCurrentInstance();
  var i18n = getI18n();

  if (!instance) {
    return {
      t: i18n.t.bind(i18n),
      locale: i18n.getLocale(),
      setLocale: i18n.setLocale.bind(i18n),
      addMessages: i18n.addMessages.bind(i18n)
    };
  }

  if (!instance.__i18nSetup) {
    instance.__i18nSetup = true;

    // Populate __i18n data with all flattened messages for current locale
    var flatMsgs = i18n.getFlatMessages();
    instance.data[I18N_DATA_KEY] = flatMsgs;

    // Call setData to ensure view is updated
    var update = {};
    update[I18N_DATA_KEY] = flatMsgs;
    instance.setData(update);

    // Subscribe to locale changes via internal subscription mechanism
    var unsub = i18n.subscribe(function(newLocale, newMsgs) {
      if (instance._destroyed) {
        unsub();
        return;
      }
      var upd = {};
      upd[I18N_DATA_KEY] = newMsgs;
      instance.setData(upd);
    });

    // Wrap onUnload to clean up subscription when page is destroyed
    var origOnUnload = instance.onUnload;
    instance.onUnload = function() {
      unsub();
      if (typeof origOnUnload === 'function') origOnUnload.call(this);
    };
  }

  return {
    t: i18n.t.bind(i18n),
    locale: i18n.getLocale(),
    setLocale: i18n.setLocale.bind(i18n),
    addMessages: i18n.addMessages.bind(i18n)
  };
}

module.exports = {
  initI18n: initI18n,
  getI18n: getI18n,
  useI18n: useI18n,
  createI18n: createI18n,
  t: function(key, params) { return getI18n().t(key, params); },
  getLocale: function() { return getI18n().getLocale(); },
  setLocale: function(locale) { return getI18n().setLocale(locale); },
  addMessages: function(locale, messages) { return getI18n().addMessages(locale, messages); }
};
