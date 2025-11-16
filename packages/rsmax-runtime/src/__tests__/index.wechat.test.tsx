import React from 'react';
import './helpers/setupGlobals';
import View from './helpers/View';
import Input from './helpers/Input';
import render from '../render';
import { reset as resetInstanceId } from '../instanceId';
import Container from '../Container';
import { useNativeEffect } from '../hooks';
import { RuntimeOptions } from '@rsmax/framework-shared';
import createComponentConfig from '../createComponentConfig.wechat';

function delay(ms: number): Promise<void> {
  if (typeof ms !== 'number') {
    throw new Error('Must specify ms');
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const p = {
  setData(state: any, callback: () => void) {
    setTimeout(() => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  },
};

describe('wechat remax render', () => {
  afterEach(() => {
    resetInstanceId();
  });

  it('render correctly', () => {
    const Page = () => <View className="foo">hello</View>;
    const container = new Container(p);
    render(<Page />, container);
    expect(container.root).toMatchSnapshot();
  });

  it('insert new element', () => {
    class Page extends React.Component {
      state = {
        list: [1, 3],
      };

      update() {
        this.setState({
          list: [1, 2, 3],
        });
      }

      render() {
        const { list } = this.state;
        return (
          <View>
            {list.map(i => (
              <View key={i}>{i}</View>
            ))}
          </View>
        );
      }
    }

    const container = new Container(p);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);
    expect(container.root).toMatchSnapshot();
    page.current.update();
    expect(container.root).toMatchSnapshot();
  });

  it("change elements' order", () => {
    class Page extends React.Component {
      state = {
        list: [1, 2, 3],
      };

      updateA() {
        this.setState({
          list: [2, 1, 3],
        });
      }

      updateB() {
        this.setState({
          list: [2, 3, 1],
        });
      }

      render() {
        const { list } = this.state;
        return (
          <View>
            {list.map(i => (
              <View key={i}>{i}</View>
            ))}
          </View>
        );
      }
    }

    const container = new Container(p);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);
    expect(container.root).toMatchSnapshot();
    page.current.updateA();
    expect(container.root).toMatchSnapshot();
    page.current.updateB();
    expect(container.root).toMatchSnapshot();
  });

  it('umount component', () => {
    class Page extends React.Component {
      state = {
        show: true,
      };

      hide() {
        this.setState({ show: false });
      }

      render() {
        return <View>{this.state.show && <View>foo</View>}</View>;
      }
    }

    const container = new Container(p);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);
    expect(container.root).toMatchSnapshot();
    page.current.hide();
    expect(container.root).toMatchSnapshot();
  });

  it('renders style', () => {
    const Page = () => <View style={{ width: '100px', height: '100px' }}>hello</View>;
    const container = new Container(p);
    render(<Page />, container);
    expect(container.root).toMatchSnapshot();
  });

  it('renders vendor prefix style', () => {
    const Page = () => <View style={{ WebkitLineClamp: 2, height: '100px' }}>hello</View>;
    const container = new Container(p);
    render(<Page />, container);
    expect(container.root).toMatchSnapshot();
  });

  it('renders empty style', () => {
    const Page = () => <View style={undefined}>hello</View>;
    const container = new Container(p);
    render(<Page />, container);
    expect(container.root).toMatchSnapshot();
  });

  it('renders conditional fragment correctly', () => {
    class Page extends React.Component {
      state = {
        show: false,
      };

      show() {
        this.setState({ show: true });
      }

      render() {
        if (this.state.show) {
          return <View>foo</View>;
        }

        return (
          <>
            <View>one</View>
            <View>two</View>
          </>
        );
      }
    }

    const container = new Container(p);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);
    expect(container.root).toMatchSnapshot();
    page.current.show();
    expect(container.root).toMatchSnapshot();
  });

  it('render native component correctly', () => {
    const NativeComponent = ({ fooBar, onClick, className }: any) =>
      React.createElement('native-component', {
        fooBar,
        className,
        onClick,
      });
    const actions: any = [];
    const p = {
      setData: (data: any) => actions.push(data),
    };

    const container = new Container(p);
    render(<NativeComponent fooBar="fooBar" onClick={() => void 0} className="class" />, container);

    expect(actions).toMatchSnapshot();
  });

  it('remove and add children', async () => {
    const logs: any = [];

    class App extends React.Component {
      state = {
        toggle: false,
      };

      toggle() {
        this.setState({
          toggle: true,
        });
      }

      render() {
        const { toggle } = this.state;
        return (
          <>
            <View id="1">
              <View id="2">{toggle ? <View id="3">a</View> : <View id="3">b</View>}</View>
              {!toggle && <View id="5">safeAreaHeight</View>}
            </View>
          </>
        );
      }
    }

    const container = new Container({
      setData(action: any) {
        logs.push(action);
      },
    });
    const app = React.createRef<any>();
    render(<App ref={app} />, container);
    app.current.toggle();
    await delay(100);
    expect(logs.pop()).toEqual({
      'root.nodes.6.children': [3],
      'root.nodes.6.nodes.3.nodes.2.nodes.1': {
        id: 1,
        text: 'a',
        type: 'plain-text',
      },
      'root.nodes.6.nodes.5': null,
    });
  });

  it('swaps items', () => {
    const logs: any = [];

    class App extends React.Component {
      state = {
        list: ['a', 'b'],
      };

      swap() {
        const { list } = this.state;
        this.setState({
          list: [list[1], list[0]],
        });
      }

      render() {
        const { list } = this.state;
        return (
          <View id="1">
            {list.map((item, index) => (
              <View key={item}>
                {index}
                {item}
              </View>
            ))}
          </View>
        );
      }
    }

    const container = new Container({
      setData(action: any) {
        logs.push(action);
      },
    });
    const app = React.createRef<any>();
    render(<App ref={app} />, container);
    expect(logs.pop()).toMatchSnapshot();
    app.current.swap();
    expect(logs.pop()).toMatchSnapshot();
    app.current.swap();
    expect(logs.pop()).toMatchSnapshot();
  });

  it("does not update deleted node's children node", async () => {
    const logs: any = [];

    class App extends React.Component {
      state = {
        a: true,
        b: true,
      };

      toggle() {
        this.setState({
          b: false,
        });
        this.setState({
          a: false,
        });
      }

      render() {
        const { a, b } = this.state;
        // eslint-disable-next-line prettier/prettier
        return <View id="a">{a && <View id="b">{b ? <View id="c">a</View> : 'b'}</View>}</View>;
      }
    }

    const container = new Container({
      setData(action: any) {
        logs.push(action);
      },
    });
    const app = React.createRef<any>();
    render(<App ref={app} />, container);
    app.current.toggle();
    await delay(100);
    expect(logs.pop()).toEqual({
      'root.nodes.4.children': [],
      'root.nodes.4.nodes.3': null,
    });
  });

  it('does not update deleted node', async () => {
    const logs: any = [];

    class App extends React.Component {
      state = {
        a: true,
        b: true,
      };

      toggle() {
        this.setState({
          b: false,
        });
        this.setState({
          a: false,
        });
      }

      render() {
        const { a, b } = this.state;
        return <View>{a && <View style={{ color: b ? 'red' : 'green' }}>foo</View>}</View>;
      }
    }

    const container = new Container({
      setData(action: any) {
        logs.push(action);
      },
    });
    const app = React.createRef<any>();
    render(<App ref={app} />, container);
    app.current.toggle();
    await delay(100);
    expect(logs.pop()).toEqual({
      'root.nodes.3.children': [],
      'root.nodes.3.nodes.2': null,
    });
  });

  it('create proxy for onClick callback', () => {
    const view = React.createRef<any>();
    const handleClick = (event: any) => {
      expect(event.stopPropagation).not.toBeUndefined();
    };
    const handleAnimationStart = (event: any) => {
      expect(event.stopPropagation).toBeUndefined();
    };

    class Page extends React.Component {
      render() {
        return <View ref={view} onClick={handleClick} onAnimationStart={handleAnimationStart} />;
      }
    }

    const container = new Container(p);
    render(<Page />, container);

    function findFn(name: string) {
      const fnKeys = Object.keys(view.current.container.context);
      const fnKey = fnKeys.find(key => key.indexOf(name) !== -1) || '';
      return view.current.container.context[fnKey];
    }

    const newHandleClick = findFn('onClick');
    const newHandleAnimationStart = findFn('onAnimationStart');

    newHandleClick({});
    newHandleAnimationStart({});

    const view2 = React.createRef<any>();
    const handleCancel = (event: any) => {
      expect(event.stopPropagation).not.toBeUndefined();
    };
    class Page2 extends React.Component {
      render() {
        return <View ref={view2} onTouchCancel={handleCancel} />;
      }
    }
    const container2 = new Container(p);
    render(<Page2 />, container2);
    const cancelFn = (() => {
      const fnKeys = Object.keys(view2.current.container.context);
      const fnKey = fnKeys.find(key => key.indexOf('onTouchCancel') !== -1) || '';
      return view2.current.container.context[fnKey];
    })();
    cancelFn({});
  });

  it('setData chunking by setDataChunkSize', () => {
    const calls: any[] = [];
    const ctx = {
      setData(payload: any, callback?: () => void) {
        calls.push(payload);
        if (typeof callback === 'function') callback();
      },
    };
    RuntimeOptions.apply({ platform: 'wechat', setDataChunkSize: 1 });
    const container = new Container(ctx);
    const Page = () => <View className="a" style={{ width: 100, height: 100 }} />;
    render(<Page />, container);
    expect(calls.length).toBeGreaterThan(1);
    RuntimeOptions.reset();
  });

  it('tagMap remaps host tag', () => {
    RuntimeOptions.apply({ tagMap: { foo: 'bar' } });
    const container = new Container({ setData() {} });
    const Foo = () => React.createElement('foo', null);
    render(<Foo />, container);
    const first: any = (container.root as any).firstChild;
    expect(first.type).toBe('bar');
    RuntimeOptions.reset();
  });

  it('wechat observers trigger render on props change', () => {
    const Comp = ({ value }: any) => React.createElement('view', null, value);
    const cfg: any = createComponentConfig(Comp);
    const ctx: any = { properties: { value: 'a' } };
    ctx.setData = (_payload: any, cb?: () => void) => { if (typeof cb === 'function') cb(); };
    ctx.render = rstest.fn(cfg.methods.render.bind(ctx));
    cfg.methods.init.call(ctx);
    expect(ctx.render).toHaveBeenCalledTimes(1);
    cfg.observers['**'].call(ctx, { value: 'b' });
    expect(ctx.render).toHaveBeenCalledTimes(2);
  });

  it('useEffect works', async () => {
    await new Promise<void>(resolve => {
      const Page = () => {
        React.useEffect(() => {
          resolve();
        });
        return <View>app</View>;
      };
      const container = new Container(p);
      render(<Page />, container);
    });
  });

  it.skip('pure rerender when props changed', async () => {
    const payload: any[] = [];
    const context = {
      setData: (data: any) => {
        payload.push(data);
      },
    };

    class Page extends React.Component {
      state = {
        value: 'foo',
      };

      setValue(value: string) {
        this.setState({ value });
      }

      render() {
        return (
          <View style={{ width: '32px' }}>
            <Input value={this.state.value} />
          </View>
        );
      }
    }

    const container = new Container(context);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);

    expect.assertions(2);

    page.current.setValue('bar');

    await new Promise<void>(resolve => {
      setTimeout(() => {
        expect(payload).toHaveLength(2);
        expect(payload[1]).toMatchInlineSnapshot(`
          Object {
            "root.nodes.2.nodes.1.props.value": "bar",
          }
        `);
        resolve();
      }, 5);
    });
  });

  it.skip('pure rerender when props delete', async () => {
    const payload: any[] = [];
    const context = {
      setData: (data: any) => {
        payload.push(data);
      },
    };

    class Page extends React.Component {
      state = {
        value: 'foo',
      };

      setValue(value: string) {
        this.setState({ value });
      }

      render() {
        return (
          <View style={{ width: '32px' }}>{!this.state.value ? <Input /> : <Input value={this.state.value} />}</View>
        );
      }
    }

    const container = new Container(context);
    const page = React.createRef<any>();
    render(<Page ref={page} />, container);

    expect.assertions(2);

    page.current.setValue(undefined);

    await new Promise<void>(resolve => {
      setTimeout(() => {
        expect(payload).toHaveLength(2);
        expect(payload).toMatchInlineSnapshot(`
          Array [
            Object {
              "root.children": Array [
                2,
              ],
              "root.nodes.2": Object {
                "children": Array [
                  1,
                ],
                "id": 2,
                "nodes": Object {
                  "1": Object {
                    "children": Array [],
                    "id": 1,
                    "props": Object {
                      "value": "foo",
                    },
                    "text": undefined,
                    "type": "input",
                  },
                },
                "props": Object {
                  "style": "width:32rpx;",
                },
                "text": undefined,
                "type": "view",
              },
            },
            Object {
              "root.nodes.2.nodes.1.props.value": null,
            },
          ]
        `);
        resolve();
      }, 5);
    });
  });

  it.skip('useNativeEffect once works', async () => {
    let count = 0;
    let resolveDone!: () => void;
    const donePromise = new Promise<void>(resolve => {
      resolveDone = resolve;
    });
    const Page = () => {
      const [width, setWidth] = React.useState(0);
      useNativeEffect(() => {
        count += 1;
        setTimeout(() => {
          if (count === 1) {
            resolveDone();
          }
        }, 500);
      }, []);
      React.useEffect(() => {
        setTimeout(() => {
          setWidth(100);
        }, 100);
      }, []);

      return <View>{width}</View>;
    };
    const container = new Container(p);
    render(<Page />, container);
    await donePromise;
  });

  // it.skip('useNativeEffect deps works', done => {
  //   let count = 0;
  //   const Page = () => {
  //     const [width, setWidth] = React.useState(0);
  //     const [height, setheight] = React.useState(0);
  //     useNativeEffect(() => {
  //       count += 1;
  //
  //       if (count === 2) {
  //         done();
  //       }
  //     }, [width]);
  //     React.useEffect(() => {
  //       setheight(100);
  //       setTimeout(() => {
  //         setWidth(100);
  //       }, 1000);
  //     }, []);
  //
  //     return (
  //       <View>
  //         {width}
  //         {height}
  //       </View>
  //     );
  //   };
  //   const container = new Container(p);
  //   render(<Page />, container);
  // });
});
