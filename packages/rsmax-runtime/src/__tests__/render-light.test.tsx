import React from 'react';
import './helpers/setupGlobals';
import View from './helpers/View';
import renderLight from '../render-light';
import { useState } from '../hooks-light';
import { reset as resetInstanceId } from '../instanceId';
import Container from '../Container';
import { AppInstanceContext, PageInstanceContext, RuntimeOptions } from '@rsmax/framework-shared';
import { useAppEvent, usePageEvent } from '../hooks';

const p = {
  setData(_state: any, callback: () => void) {
    setTimeout(() => { if (typeof callback === 'function') callback(); });
  },
  $batchedUpdates(callback: () => void) { callback(); },
  $spliceData(_state: any, callback: () => void) {
    setTimeout(() => { if (typeof callback === 'function') callback(); });
  },
};

describe('light renderer', () => {
  beforeEach(() => {
    RuntimeOptions.apply({ platform: 'ali' });
    resetInstanceId();
  });
  afterEach(() => {
    RuntimeOptions.reset();
    resetInstanceId();
  });

  it('render single host element with text', () => {
    const container = new Container(p);
    renderLight(<View className="foo">hello</View>, container);
    expect(container.root).toMatchSnapshot();
  });

  it('render function component', () => {
    const Page = () => <View className="page">content</View>;
    const container = new Container(p);
    renderLight(<Page />, container);
    expect(container.root).toMatchSnapshot();
  });

  it('render nested elements', () => {
    const container = new Container(p);
    renderLight(
      <View className="outer">
        <View className="inner">nested</View>
      </View>,
      container
    );
    expect(container.root).toMatchSnapshot();
  });

  it('useState triggers re-render', (done) => {
    let setCountFn: (value: number) => void = () => {};
    const Page = () => {
      const [count, setCount] = useState(0);
      setCountFn = setCount;
      return <View className={`count-${count}`}>Count: {count}</View>;
    };
    const container = new Container(p);
    renderLight(<Page />, container);
    setCountFn(1);
    setTimeout(() => {
      expect(container.root).toMatchSnapshot();
      done();
    }, 50);
  });

  it('render with React.Fragment', () => {
    const container = new Container(p);
    renderLight(
      <View>
        <>
          <View className="f1">first</View>
          <View className="f2">second</View>
        </>
      </View>,
      container
    );
    expect(container.root).toMatchSnapshot();
  });

  it('render array children', () => {
    const items = ['a', 'b', 'c'];
    const container = new Container(p);
    renderLight(
      <View>
        {items.map(item => (
          <View key={item} className={`item-${item}`}>{item}</View>
        ))}
      </View>,
      container
    );
    expect(container.root).toMatchSnapshot();
  });

  it('reuse class component instance across root renders', () => {
    const log: string[] = [];

    class Page extends React.Component<{ label: string }> {
      componentDidMount() {
        log.push('mount');
      }

      componentDidUpdate() {
        log.push('update');
      }

      render() {
        return <View className={`page-${this.props.label}`}>{this.props.label}</View>;
      }
    }

    const container = new Container(p);
    renderLight(<Page label="first" />, container);
    renderLight(<Page label="second" />, container);

    expect(log).toEqual(['mount', 'update']);
    expect(container.root.firstChild?.props?.className).toBe('page-second');
  });

  it('preserve hook state across root renders', (done) => {
    let setCountFn: (value: number) => void = () => {};

    const Page = ({ label }: { label: string }) => {
      const [count, setCount] = useState(0);
      setCountFn = setCount;
      return <View className={`${label}-${count}`}>{`${label}:${count}`}</View>;
    };

    const container = new Container(p);
    renderLight(<Page label="first" />, container);
    setCountFn(1);

    setTimeout(() => {
      renderLight(<Page label="second" />, container);

      expect(container.root.firstChild?.props?.className).toBe('second-1');
      expect(container.root.firstChild?.firstChild?.text).toBe('second:1');
      done();
    }, 50);
  });

  it('render context provider children', () => {
    const TestContext = React.createContext('fallback');

    const Page = () => (
      <TestContext.Provider value="from-provider">
        <TestContext.Consumer>
          {value => <View className={`ctx-${value}`}>{value}</View>}
        </TestContext.Consumer>
      </TestContext.Provider>
    );

    const container = new Container(p);
    renderLight(<Page />, container);

    expect(container.root.firstChild?.props?.className).toBe('ctx-from-provider');
    expect(container.root.firstChild?.firstChild?.text).toBe('from-provider');
  });

  it('supports react useEffect in light renderer', (done) => {
    const log: string[] = [];

    const Page = () => {
      React.useEffect(() => {
        log.push('effect');
      }, []);
      return <View className="effect-page">content</View>;
    };

    const container = new Container(p);
    renderLight(<Page />, container);

    setTimeout(() => {
      expect(log).toEqual(['effect']);
      expect(container.root.firstChild?.props?.className).toBe('effect-page');
      done();
    }, 20);
  });

  it('supports usePageEvent in light renderer', () => {
    const log: string[] = [];
    const pageInstance = {
      query: { foo: 'bar' },
      registerLifecycle(_lifecycle: string, callback: () => void) {
        log.push('register-page');
        callback();
        return () => log.push('cleanup-page');
      },
    };

    const Page = () => {
      usePageEvent('onShow', () => {
        log.push('show');
      });
      return <View className="page-event">content</View>;
    };

    const container = new Container(p);
    renderLight(
      <PageInstanceContext.Provider value={pageInstance}>
        <Page />
      </PageInstanceContext.Provider>,
      container
    );

    expect(log).toEqual(['register-page', 'show']);
    expect(container.root.firstChild?.props?.className).toBe('page-event');
  });

  it('supports useAppEvent in light renderer', () => {
    const log: string[] = [];
    const unregister = AppInstanceContext.registerLifecycle;

    AppInstanceContext.registerLifecycle = (lifecycle: string, callback: () => void) => {
      log.push(`register-app:${lifecycle}`);
      callback();
      return () => log.push(`cleanup-app:${lifecycle}`);
    };

    const App = () => {
      useAppEvent('onShow', () => {
        log.push('app-show');
      });
      return <View className="app-event">content</View>;
    };

    const container = new Container(p);
    renderLight(<App />, container);

    expect(log).toEqual(['register-app:show', 'app-show']);
    expect(container.root.firstChild?.props?.className).toBe('app-event');
    AppInstanceContext.registerLifecycle = unregister;
  });
});
