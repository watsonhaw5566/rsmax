const { describe, test, expect, beforeEach } = require('@rstest/core');
const {
  useState,
  useEffect,
  useStore,
  createPage,
  createComponent,
  _flushBatch,
  _batchQueue
} = require('../index');

// 模拟小程序 Page instance
function createMockInstance(pageConfig) {
  const instance = {
    data: pageConfig.data ? { ...pageConfig.data } : {},
    _setDataCalls: [],
    _destroyed: false,
    setData(data, cb) {
      instance._setDataCalls.push({ ...data });
      Object.assign(instance.data, data);
      if (cb) cb();
    }
  };
  return instance;
}

// 运行 page 的 onLoad 生命周期
function mountPage(pageConfig, options = {}) {
  const instance = createMockInstance(pageConfig);
  Object.assign(instance, pageConfig);
  if (pageConfig.onLoad) {
    pageConfig.onLoad.call(instance, options);
  }
  return instance;
}

describe('@rsmax/runtime', () => {
  describe('setState batching', () => {
    test('多次 setState 应合并为一次 setData', async () => {
      let setCount, setName;
      const config = createPage(function () {
        const [count, _setCount] = useState(0, 'count');
        const [name, _setName] = useState('init', 'name');
        setCount = _setCount;
        setName = _setName;
      }, { data: { count: 0, name: 'init' } });

      const instance = mountPage(config);
      instance._setDataCalls = [];

      // 同步调用多次 setState
      setCount(1);
      setName('updated');

      // 此时还没有 flush（microtask 还没执行）
      expect(instance._setDataCalls.length).toBe(0);
      // 但 instance.data 已即时更新（保证读取一致性）
      expect(instance.data.count).toBe(1);
      expect(instance.data.name).toBe('updated');

      // 手动 flush 批处理
      _flushBatch();

      // 只触发了一次 setData
      expect(instance._setDataCalls.length).toBe(1);
      expect(instance._setDataCalls[0]).toEqual({ count: 1, name: 'updated' });
    });

    test('单次 setState 也通过批处理', async () => {
      let setCount;
      const config = createPage(function () {
        const [count, _setCount] = useState(0, 'count');
        setCount = _setCount;
      }, { data: { count: 0 } });

      const instance = mountPage(config);
      instance._setDataCalls = [];

      setCount(5);
      _flushBatch();

      expect(instance._setDataCalls.length).toBe(1);
      expect(instance._setDataCalls[0]).toEqual({ count: 5 });
    });

    test('setState 使用函数 updater 应正确链式更新', async () => {
      let setCount;
      const config = createPage(function () {
        const [count, _setCount] = useState(0, 'count');
        setCount = _setCount;
      }, { data: { count: 0 } });

      const instance = mountPage(config);
      instance._setDataCalls = [];

      // 连续三次递增
      setCount(c => c + 1);
      setCount(c => c + 1);
      setCount(c => c + 1);

      // instance.data 应立即反映最新值
      expect(instance.data.count).toBe(3);

      _flushBatch();

      // 合并为一次 setData
      expect(instance._setDataCalls.length).toBe(1);
      expect(instance._setDataCalls[0]).toEqual({ count: 3 });
    });

    test('相同值的 setState 不触发 setData', async () => {
      let setCount;
      const config = createPage(function () {
        const [count, _setCount] = useState(5, 'count');
        setCount = _setCount;
      }, { data: { count: 5 } });

      const instance = mountPage(config);
      instance._setDataCalls = [];

      setCount(5); // 相同值
      _flushBatch();

      expect(instance._setDataCalls.length).toBe(0);
    });

    test('destroyed instance 不触发 setData', async () => {
      let setCount;
      const config = createPage(function () {
        const [count, _setCount] = useState(0, 'count');
        setCount = _setCount;
      }, { data: { count: 0 } });

      const instance = mountPage(config);
      instance._setDataCalls = [];

      setCount(10);
      instance._destroyed = true;
      _flushBatch();

      expect(instance._setDataCalls.length).toBe(0);
    });
  });

  describe('createPage basic', () => {
    test('createPage 应返回包含生命周期的配置对象', () => {
      const config = createPage(function () {
        useState(0, 'count');
      }, { data: { count: 0 } });

      expect(config.onLoad).toBeDefined();
      expect(config.onUnload).toBeDefined();
      expect(config.data).toEqual({ count: 0 });
    });

    test('onLoad 应正确初始化 hooks', () => {
      let queryResult;
      const config = createPage(function () {
        useState(0, 'count');
      }, { data: { count: 0 } });

      const instance = mountPage(config, { id: '123' });
      expect(instance._query).toEqual({ id: '123' });
      expect(instance._hooks.length).toBe(1);
    });
  });

  describe('createComponent basic', () => {
    test('createComponent 应返回包含 lifetimes 的配置', () => {
      const config = createComponent(function (props) {
        useState(0, 'value');
      }, { data: { value: 0 } });

      expect(config.lifetimes).toBeDefined();
      expect(config.lifetimes.attached).toBeDefined();
      expect(config.lifetimes.detached).toBeDefined();
    });
  });
});
