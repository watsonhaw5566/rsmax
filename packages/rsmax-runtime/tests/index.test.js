const { describe, test, expect, beforeEach } = require('@rstest/core');
const {
  useState,
  useEffect,
  useStore,
  useQuery,
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

  // 模拟组件 attached：methods 中的内部方法需挂到实例上
  function mountComponent(compConfig, initialData = {}) {
    const instance = createMockInstance({ data: initialData });
    Object.assign(instance, compConfig, compConfig.methods);
    // Object.assign 会带入 compConfig.data（空对象），恢复为模拟的初始 data（含 properties 值）
    instance.data = { ...initialData };
    compConfig.lifetimes.attached.call(instance);
    return instance;
  }

  describe('useState 初始值', () => {
    test('编译器外提的静态初值：注册期 data 已有值，首跑不再 setData', () => {
      let inFn;
      // 模拟编译器产物：createPage(fn, { data: { activeTab: 'created' } })
      const config = createPage(function () {
        const [activeTab] = useState('created', 'activeTab');
        inFn = activeTab;
      }, { data: { activeTab: 'created' } });

      // 模块加载期（onLoad 之前）首屏 data 即已就绪
      expect(config.data.activeTab).toBe('created');

      const instance = mountPage(config);

      expect(inFn).toBe('created');
      expect(instance.data.activeTab).toBe('created');
      // 首跑不产生任何 setData —— 首帧直接渲染注册期 data，无空帧/闪烁
      expect(instance._setDataCalls).toEqual([]);
    });

    test('组件路径同样复用注册期 data 中的静态初值', () => {
      const config = createComponent(function () {
        useState(0, 'active');
      }, { data: { active: 0 } });

      const instance = mountComponent(config, { active: 0 });
      expect(instance.data.active).toBe(0);
      expect(instance._setDataCalls).toEqual([]);
    });
  });

  describe('useState 动态初始值（首跑时在函数作用域内求值）', () => {
    test('初始值可以引用同一次执行中的局部变量（useQuery 场景）', () => {
      let capturedId;
      const config = createPage(function () {
        const query = useQuery();
        const resolvedId = query.id || '';
        const [id] = useState(resolvedId, 'id');
        capturedId = id;
      });

      const instance = mountPage(config, { id: 'abc-123' });

      // 函数体内同步读到初值
      expect(capturedId).toBe('abc-123');
      // 首跑结束后通过 setData 注入视图层
      expect(instance.data.id).toBe('abc-123');
      expect(instance._setDataCalls).toEqual([{ id: 'abc-123' }]);
    });

    test('不预填 data 时，字面量初值也由首跑 setData 提供', () => {
      const config = createPage(function () {
        useState(0, 'count');
        useState('init', 'name');
      });

      const instance = mountPage(config);

      expect(instance.data.count).toBe(0);
      expect(instance.data.name).toBe('init');
      // 多个初值合并为一次 setData
      expect(instance._setDataCalls).toEqual([{ count: 0, name: 'init' }]);
    });

    test('支持函数惰性初始化，且 rerender 时不再重复求值', () => {
      let initCalls = 0;
      const config = createPage(function () {
        useState(() => {
          initCalls++;
          return 42;
        }, 'n');
      });

      const instance = mountPage(config);
      expect(instance.data.n).toBe(42);
      expect(initCalls).toBe(1);

      // 模拟一次 rerender（hooks 已建立，初值被忽略）
      config._run.call(instance, false);
      expect(initCalls).toBe(1);
      expect(instance.data.n).toBe(42);
    });

    test('组件（createComponent）路径同样支持动态初值', () => {
      const config = createComponent(function (props) {
        useState(props.initialActive, 'active');
      }, { properties: { initialActive: { type: null, value: false } } });

      const instance = mountComponent(config, { initialActive: true });

      expect(instance.data.active).toBe(true);
      expect(instance._setDataCalls).toEqual([{ active: true }]);
    });

    test('首跑的 state 与 useStore 初值合并为同一次 setData', () => {
      const store = {
        getState: () => ({ count: 7 }),
        subscribe: () => () => {}
      };
      const config = createPage(function () {
        useState(1, 'id');
        useStore(store, 'count', 'count');
      });

      const instance = mountPage(config);

      expect(instance.data.id).toBe(1);
      expect(instance.data.count).toBe(7);
      expect(instance._setDataCalls).toEqual([{ id: 1, count: 7 }]);
    });
  });
});
