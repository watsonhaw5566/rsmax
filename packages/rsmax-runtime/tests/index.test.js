const { describe, test, expect } = require('@rstest/core');
const { promisify } = require('../index');

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

describe('@rsmax/runtime', () => {
  describe('promisify', () => {
    test('should return a function', () => {
      const api = createMockFn();
      const promisified = promisify(api);
      expect(typeof promisified).toBe('function');
    });

    test('should return a Promise when called', () => {
      const api = createMockFn((options) => {
        options.success && options.success({});
      });
      const promisified = promisify(api);
      const result = promisified();
      expect(result instanceof Promise).toBe(true);
    });

    test('should resolve with success result', async () => {
      const successData = { data: 'test', statusCode: 200 };
      const api = createMockFn((options) => {
        options.success && options.success(successData);
      });
      const promisified = promisify(api);
      const result = await promisified();
      expect(result).toEqual(successData);
    });

    test('should reject with fail result', async () => {
      const failError = { errMsg: 'test:fail error' };
      const api = createMockFn((options) => {
        options.fail && options.fail(failError);
      });
      const promisified = promisify(api);
      try {
        await promisified();
        expect(true).toBe(false); // Should not reach here
      } catch (err) {
        expect(err).toEqual(failError);
      }
    });

    test('should pass arguments to the original api', () => {
      const api = createMockFn((options) => {
        options.success && options.success({});
      });
      const promisified = promisify(api);
      const testArgs = { url: '/api/test', data: { id: 1 } };
      promisified(testArgs);
      expect(api.callCount).toBe(1);
      expect(api.calls[0][0].url).toBe('/api/test');
      expect(api.calls[0][0].data).toEqual({ id: 1 });
    });

    test('should call custom success callback if provided', async () => {
      const successData = { data: 'custom test' };
      const customSuccess = createMockFn();
      const api = createMockFn((options) => {
        options.success && options.success(successData);
      });
      const promisified = promisify(api);
      await promisified({ success: customSuccess });
      expect(customSuccess.callCount).toBe(1);
      expect(customSuccess.calls[0][0]).toEqual(successData);
    });

    test('should call custom fail callback if provided', async () => {
      const failError = { errMsg: 'custom fail' };
      const customFail = createMockFn();
      const api = createMockFn((options) => {
        options.fail && options.fail(failError);
      });
      const promisified = promisify(api);
      try {
        await promisified({ fail: customFail });
      } catch (e) {}
      expect(customFail.callCount).toBe(1);
      expect(customFail.calls[0][0]).toEqual(failError);
    });

    test('should work with no arguments (default empty object)', async () => {
      const api = createMockFn((options) => {
        expect(typeof options).toBe('object');
        options.success && options.success({ ok: true });
      });
      const promisified = promisify(api);
      const result = await promisified();
      expect(result).toEqual({ ok: true });
    });

    test('should preserve other options besides success/fail', async () => {
      const api = createMockFn((options) => {
        expect(options.url).toBe('/api/data');
        expect(options.method).toBe('GET');
        expect(options.header).toEqual({ 'Content-Type': 'application/json' });
        options.success && options.success({ data: 'result' });
      });
      const promisified = promisify(api);
      const result = await promisified({
        url: '/api/data',
        method: 'GET',
        header: { 'Content-Type': 'application/json' }
      });
      expect(result).toEqual({ data: 'result' });
    });

    test('should override success/fail but still call original callbacks', async () => {
      const originalSuccess = createMockFn();
      const originalFail = createMockFn();
      const successData = { result: 'ok' };

      const api = createMockFn((options) => {
        // Simulate that original callbacks were already in the options object
        // (This tests that even if user passes success/fail, the wrapper calls both)
        options.success && options.success(successData);
      });

      const promisified = promisify(api);
      const result = await promisified({
        success: originalSuccess,
        fail: originalFail
      });

      expect(originalSuccess.callCount).toBe(1);
      expect(originalSuccess.calls[0][0]).toEqual(successData);
      expect(originalFail.callCount).toBe(0);
      expect(result).toEqual(successData);
    });

    test('should handle async-style API simulation', async () => {
      // Simulate async wx API like wx.request
      const api = createMockFn((options) => {
        setTimeout(() => {
          options.success && options.success({ data: 'async result' });
        }, 10);
      });

      const promisified = promisify(api);
      const result = await promisified();
      expect(result).toEqual({ data: 'async result' });
    });

    test('should work with typical WeChat Mini Program API pattern', async () => {
      // Simulate wx.getStorage
      const storage = { 'key1': 'value1' };
      const wxGetStorage = createMockFn((options) => {
        setTimeout(() => {
          if (storage[options.key]) {
            options.success && options.success({ data: storage[options.key] });
          } else {
            options.fail && options.fail({ errMsg: 'getStorage:fail data not found' });
          }
        }, 5);
      });

      const getStorage = promisify(wxGetStorage);

      // Success case
      const result = await getStorage({ key: 'key1' });
      expect(result.data).toBe('value1');

      // Fail case
      try {
        await getStorage({ key: 'nonexistent' });
        expect(true).toBe(false);
      } catch (err) {
        expect(err.errMsg).toContain('fail');
      }
    });
  });
});
