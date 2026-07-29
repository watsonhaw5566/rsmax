const { describe, test, expect, beforeEach } = require('@rstest/core');

// Reset module cache between tests so each test gets a fresh i18n instance
function loadI18n() {
  const modPath = require.resolve('../index.js');
  // Clear all cached modules that start with the rsmax-i18n package path
  Object.keys(require.cache).forEach(function(key) {
    if (key.includes('rsmax-i18n') && !key.includes('tests')) {
      delete require.cache[key];
    }
  });
  return require('../index.js');
}

// Mock page instance for useI18n hook tests
function createMockInstance() {
  const instance = {
    data: {},
    setData(update, cb) {
      Object.keys(update).forEach(function(k) {
        instance.data[k] = update[k];
      });
      if (typeof cb === 'function') cb();
    },
    _destroyed: false
  };
  return instance;
}

const zhMessages = {
  common: { ok: '确定', cancel: '取消' },
  page: {
    home: {
      title: '首页',
      greeting: '你好，{name}！',
      nested: { deep: '深层文本' }
    }
  }
};

const enMessages = {
  common: { ok: 'OK', cancel: 'Cancel' },
  page: {
    home: {
      title: 'Home',
      greeting: 'Hello, {name}!',
      nested: { deep: 'Deep text' }
    }
  }
};

describe('@rsmax/i18n', () => {
  beforeEach(() => {
    Object.keys(require.cache).forEach(function(key) {
      if (key.includes('rsmax-i18n') && !key.includes('tests')) {
        delete require.cache[key];
      }
    });
    delete globalThis.__RSMAX_CURRENT_INSTANCE__;
  });

  describe('createI18n', () => {
    test('should create an i18n instance with default locale zh-CN', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({});
      expect(instance.getLocale()).toBe('zh-CN');
    });

    test('should respect initial locale option', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({ locale: 'en' });
      expect(instance.getLocale()).toBe('en');
    });

    test('should translate simple flat keys from inline messages', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { hello: '你好' } }
      });
      expect(instance.t('hello')).toBe('你好');
    });

    test('should translate nested keys via dot notation', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': zhMessages }
      });
      expect(instance.t('page.home.title')).toBe('首页');
      expect(instance.t('page.home.nested.deep')).toBe('深层文本');
      expect(instance.t('common.ok')).toBe('确定');
    });

    test('should return the key itself when translation is missing', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { hello: '你好' } }
      });
      expect(instance.t('nonexistent.key')).toBe('nonexistent.key');
    });

    test('should interpolate variables in translations', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': zhMessages }
      });
      expect(instance.t('page.home.greeting', { name: 'Rsmax' })).toBe('你好，Rsmax！');
    });

    test('should leave unresolved placeholders intact', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: 'Hello, {name}!' } }
      });
      expect(instance.t('msg')).toBe('Hello, {name}!');
    });

    test('should use fallback locale when key is missing in current locale', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'en',
        fallbackLocale: 'zh-CN',
        messages: {
          'zh-CN': { onlyZh: '只有中文' },
          'en': { hello: 'Hello' }
        }
      });
      expect(instance.t('onlyZh')).toBe('只有中文');
      expect(instance.t('hello')).toBe('Hello');
    });
  });

  describe('setLocale', () => {
    test('should switch locale and return a promise', async () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: {
          'zh-CN': { msg: '中文' },
          'en': { msg: 'English' }
        }
      });
      expect(instance.t('msg')).toBe('中文');
      await instance.setLocale('en');
      expect(instance.getLocale()).toBe('en');
      expect(instance.t('msg')).toBe('English');
    });

    test('should resolve immediately when setting the same locale', async () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: '中文' } }
      });
      const result = instance.setLocale('zh-CN');
      expect(result instanceof Promise).toBe(true);
      await result;
      expect(instance.getLocale()).toBe('zh-CN');
    });

    test('should notify subscribers when locale changes', async () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: {
          'zh-CN': { msg: '中文' },
          'en': { msg: 'English' }
        }
      });
      let notifiedLocale = null;
      let notifiedMsgs = null;
      const unsub = instance.subscribe(function(locale, msgs) {
        notifiedLocale = locale;
        notifiedMsgs = msgs;
      });
      await instance.setLocale('en');
      expect(notifiedLocale).toBe('en');
      expect(notifiedMsgs.msg).toBe('English');
      unsub();
    });
  });

  describe('addMessages', () => {
    test('should add messages for a new locale and allow switching to it', async () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: '中文' } }
      });
      instance.addMessages('ja', { msg: '日本語' });
      await instance.setLocale('ja');
      expect(instance.t('msg')).toBe('日本語');
    });

    test('should merge messages with existing ones', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { a: 'A' } }
      });
      instance.addMessages('zh-CN', { b: 'B' });
      expect(instance.t('a')).toBe('A');
      expect(instance.t('b')).toBe('B');
    });

    test('should notify subscribers when adding messages for current locale', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: '中文' } }
      });
      let callCount = 0;
      instance.subscribe(function() { callCount++; });
      instance.addMessages('zh-CN', { newKey: '新值' });
      expect(callCount).toBe(1);
      expect(instance.t('newKey')).toBe('新值');
    });
  });

  describe('getFlatMessages', () => {
    test('should return a flattened key-value map with dot-separated keys', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': zhMessages }
      });
      const flat = instance.getFlatMessages();
      expect(flat['common.ok']).toBe('确定');
      expect(flat['common.cancel']).toBe('取消');
      expect(flat['page.home.title']).toBe('首页');
      expect(flat['page.home.nested.deep']).toBe('深层文本');
    });

    test('should merge fallback messages with current locale messages', () => {
      const i18n = loadI18n();
      const instance = i18n.createI18n({
        locale: 'en',
        fallbackLocale: 'zh-CN',
        messages: {
          'zh-CN': { onlyZh: '只有中文', shared: '中文共享' },
          'en': { shared: 'English shared', onlyEn: 'English only' }
        }
      });
      const flat = instance.getFlatMessages();
      expect(flat['onlyZh']).toBe('只有中文');
      expect(flat['onlyEn']).toBe('English only');
      expect(flat['shared']).toBe('English shared');
    });
  });

  describe('initI18n / getI18n', () => {
    test('initI18n sets global instance, getI18n returns it, and auto-creates with defaults if called first', () => {
      const i18n = loadI18n();
      // Before any init, getI18n auto-creates with default locale zh-CN
      const autoInst = i18n.getI18n();
      expect(autoInst).toBeDefined();
      expect(typeof autoInst.t).toBe('function');
      expect(autoInst.getLocale()).toBe('zh-CN');

      // initI18n replaces the global instance
      const inst = i18n.initI18n({
        locale: 'en',
        messages: { en: { hi: 'Hi' } }
      });
      expect(i18n.getI18n()).toBe(inst);
      expect(i18n.getI18n().t('hi')).toBe('Hi');
      expect(i18n.getLocale()).toBe('en');
    });
  });

  describe('module-level t/getLocale/setLocale helpers', () => {
    test('should delegate to the global i18n instance', async () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: {
          'zh-CN': { hello: '你好' },
          'en': { hello: 'Hello' }
        }
      });
      expect(i18n.t('hello')).toBe('你好');
      expect(i18n.getLocale()).toBe('zh-CN');
      await i18n.setLocale('en');
      expect(i18n.t('hello')).toBe('Hello');
    });
  });

  describe('useI18n hook', () => {
    test('should populate data.__i18n with flat messages and return t/setLocale', () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { hello: '你好', nested: { key: '嵌套' } } }
      });
      const mockInst = createMockInstance();
      globalThis.__RSMAX_CURRENT_INSTANCE__ = mockInst;

      const hook = i18n.useI18n();
      expect(typeof hook.t).toBe('function');
      expect(typeof hook.setLocale).toBe('function');
      expect(typeof hook.addMessages).toBe('function');
      expect(mockInst.data.__i18n).toBeDefined();
      expect(mockInst.data.__i18n['hello']).toBe('你好');
      expect(mockInst.data.__i18n['nested.key']).toBe('嵌套');
    });

    test('should only initialize once per instance (idempotent)', () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: '文本' } }
      });
      const mockInst = createMockInstance();
      globalThis.__RSMAX_CURRENT_INSTANCE__ = mockInst;

      i18n.useI18n();
      const data1 = mockInst.data.__i18n;
      i18n.useI18n();
      expect(mockInst.data.__i18n).toBe(data1);
    });

    test('should return a stub when no current instance is available', () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: { 'zh-CN': { msg: '文本' } }
      });
      delete globalThis.__RSMAX_CURRENT_INSTANCE__;
      const hook = i18n.useI18n();
      expect(typeof hook.t).toBe('function');
      expect(hook.t('msg')).toBe('文本');
    });

    test('should update data.__i18n when locale is switched via setLocale', async () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: {
          'zh-CN': { msg: '中文' },
          'en': { msg: 'English' }
        }
      });
      const mockInst = createMockInstance();
      globalThis.__RSMAX_CURRENT_INSTANCE__ = mockInst;

      const hook = i18n.useI18n();
      expect(mockInst.data.__i18n['msg']).toBe('中文');
      await hook.setLocale('en');
      expect(mockInst.data.__i18n['msg']).toBe('English');
    });

    test('should unsubscribe when instance onUnload is called', async () => {
      const i18n = loadI18n();
      i18n.initI18n({
        locale: 'zh-CN',
        messages: {
          'zh-CN': { msg: '中文' },
          'en': { msg: 'English' }
        }
      });
      const mockInst = createMockInstance();
      globalThis.__RSMAX_CURRENT_INSTANCE__ = mockInst;

      i18n.useI18n();
      expect(typeof mockInst.onUnload).toBe('function');
      mockInst._destroyed = true;
      mockInst.onUnload();
      // After unload + destroy, switching locale should not throw or update the destroyed instance
      await i18n.getI18n().setLocale('en');
      // data.__i18n should still have old value since unsubscribed
      expect(mockInst.data.__i18n['msg']).toBe('中文');
    });
  });
});
