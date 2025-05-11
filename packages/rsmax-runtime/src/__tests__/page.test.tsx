import React from 'react';
import './helpers/setupGlobals';
import createPageConfig from '../createPageConfig';
import { usePageEvent } from '../../src';
import { RuntimeOptions, PageProps } from '@rsmax/framework-shared';
import View from './helpers/View';
import Page from './helpers/Page';

const TEST_PAGE = 'pages/test/index';

describe('page', () => {
  beforeAll(() => {
    RuntimeOptions.apply({
      appEvents: [
        'onLaunch',
        'onShow',
        'onHide',
        'onShareAppMessage',
        'onPageNotFound',
        'onError',
        'onUnhandledRejection',
        'onThemeChange',
      ],
      pageEvents: {
        'pages/test/only/onshow': ['onShow'],
        'pages/test/index': [
          'onShow',
          'onHide',
          'onPullDownRefresh',
          'onPullIntercept',
          'onReachBottom',
          'onPageScroll',
          'onShareAppMessage',
          'onShareTimeline',
          'onTitleClick',
          'onOptionMenuClick',
          'onPopMenuClick',
          'onReady',
          'onResize',
          'onTabItemTap',
        ],
      },
    });
  });

  afterAll(() => {
    RuntimeOptions.reset();
  });

  it('create page config', () => {
    const Foo = () => {
      return <View>foo</View>;
    };
    const page = Page(createPageConfig(Foo, TEST_PAGE));
    getApp().onLaunch();
    page.load();
    expect(page.config.wrapper).not.toBeNull();
  });

  describe('hooks', () => {
    it('works', () => {
      const log: string[] = [];
      const Foo: React.FC<PageProps> = () => {
        usePageEvent('onLoad', () => {
          log.push('useLoad');
        });
        usePageEvent('onUnload', () => {
          log.push('useUnload');
        });
        usePageEvent('onReady', () => {
          log.push('useReady');
        });
        usePageEvent('onShow', () => {
          log.push('useShow');
        });

        usePageEvent('onHide', () => {
          log.push('useHide');
        });

        usePageEvent('onPullDownRefresh', () => {
          log.push('usePullDownRefresh');
        });

        usePageEvent('onReachBottom', () => {
          log.push('useReachBottom');
        });

        usePageEvent('onPageScroll', () => {
          log.push('usePageScroll');
        });

        usePageEvent('onShareAppMessage', object => {
          log.push(object.from);
          log.push('useShareAppMessage');

          return {};
        });

        usePageEvent('onShareTimeline', object => {
          log.push(object.from);
          log.push('useShareTimeline');

          return {};
        });

        usePageEvent('onTitleClick', () => {
          log.push('useTitleClick');
        });

        usePageEvent('onOptionMenuClick', () => {
          log.push('useOptionMenuClick');
        });

        usePageEvent('onPopMenuClick', () => {
          log.push('usePopMenuClick');
        });

        usePageEvent('onPullIntercept', () => {
          log.push('usePullIntercept');
        });

        usePageEvent('onBack', () => {
          log.push('useEventOnBack');
        });

        usePageEvent('onKeyboardHeight', () => {
          log.push('useEventOnKeyboardHeight');
        });

        usePageEvent('onTabItemTap', () => {
          log.push('useEventOnTabItemTap');
        });

        usePageEvent('beforeTabItemTap', () => {
          log.push('useEventBeforeTabItemTap');
        });

        usePageEvent('onResize', () => {
          log.push('useEventOnResize');
        });

        usePageEvent('onShow', () => {
          log.push('useEventOnShow');
        });

        return <View>foo</View>;
      };
      const page = Page(createPageConfig(Foo, TEST_PAGE));
      page.load();
      page.ready();
      page.pullDownRefresh();
      page.pullIntercept();
      page.reachBottom();
      page.pageScroll();
      page.shareAppMessage();
      page.shareTimeline();
      page.titleClick();
      page.optionMenuClick();
      page.popMenuClick();
      page.back();
      page.keyboardHeight();
      page.tabItemTap();
      page.beforeTabItemTap();
      page.resize();
      page.hide();
      page.unload();

      expect(log).toEqual([
        'useLoad',
        'useShow',
        'useEventOnShow',
        'useReady',
        'usePullDownRefresh',
        'usePullIntercept',
        'useReachBottom',
        'usePageScroll',
        'menu',
        'useShareAppMessage',
        'menu',
        'useShareTimeline',
        'useTitleClick',
        'useOptionMenuClick',
        'usePopMenuClick',
        'useEventOnBack',
        'useEventOnKeyboardHeight',
        'useEventOnTabItemTap',
        // 测试了微信和阿里两个hook，所以有两个
        'useEventOnTabItemTap',
        'useEventBeforeTabItemTap',
        'useEventOnResize',
        // 测试了微信和阿里两个hook，所以有两个
        'useEventOnResize',
        'useHide',
        'useUnload',
      ]);
    });

    it('works in component', () => {
      const log: string[] = [];
      const Foo = () => {
        usePageEvent('onShow', () => {
          log.push('onShow');
        });
        return <View>foo</View>;
      };
      const Bar = () => <Foo />;
      const page = Page(createPageConfig(Bar, TEST_PAGE));
      page.load();
      expect(log).toEqual(['onShow']);
    });

    it('register once', () => {
      const log: string[] = [];
      const foo = React.createRef<any>();
      const Foo = React.forwardRef((props, ref) => {
        const forceUpdate = React.useState(0)[1];

        usePageEvent('onShow', () => {
          log.push('onShow');
        });

        usePageEvent('onShareAppMessage', () => {
          log.push('onShareAppMessage');
        });

        React.useImperativeHandle(ref, () => ({
          forceUpdate,
        }));

        return <View>foo</View>;
      });
      const page = Page(createPageConfig(() => <Foo ref={foo} />, TEST_PAGE));
      page.load();
      foo.current.forceUpdate();
      page.shareAppMessage();
      expect(log).toEqual(['onShow', 'onShareAppMessage']);
    });

    it('call once with child hook', () => {
      const log: string[] = [];
      const foo = React.createRef<any>();

      const Child = () => {
        const [count, setCount] = React.useState(0);
        usePageEvent('onShow', () => {
          log.push('child onShow');
          setCount(count + 1);
        });

        return <View>Child</View>;
      };

      const Foo = React.forwardRef((props, ref) => {
        usePageEvent('onShow', () => {
          log.push('foo onShow');
        });

        return (
          <View>
            <Child />
          </View>
        );
      });
      const page = Page(createPageConfig(() => <Foo ref={foo} />, TEST_PAGE));
      page.load();
      expect(log).toEqual(['child onShow', 'foo onShow']);
    });
  });

  it('lifecycle methods', () => {
    const log: string[] = [];
    class Foo extends React.Component {
      UNSAFE_componentWillMount() {
        log.push('componentWillMount');
      }

      componentDidMount() {
        log.push('componentDidMount');
      }

      componentWillUnmount() {
        log.push('componentWillUnmount');
      }

      onLoad() {
        log.push('onLoad');
      }

      onUnload() {
        log.push('onUnload');
      }

      onShow() {
        log.push('onShow');
      }

      onHide() {
        log.push('onHide');
      }

      onPullDownRefresh() {
        log.push('onPullDownRefresh');
      }

      onReachBottom() {
        log.push('onReachBottom');
      }

      onPageScroll() {
        log.push('onPageScroll');
      }

      onShareAppMessage(object: any) {
        log.push(object.from);
        log.push('onShareAppMessage');
      }

      onShareTimeline(object: any) {
        log.push(object.from);
        log.push('onShareTimeline');
      }

      onTitleClick() {
        log.push('onTitleClick');
      }

      onOptionMenuClick() {
        log.push('onOptionMenuClick');
      }

      onPopMenuClick() {
        log.push('onPopMenuClick');
      }

      onPullIntercept() {
        log.push('onPullIntercept');
      }

      onResize() {
        log.push('onResize');
      }

      onTabItemTap() {
        log.push('onTabItemTap');
      }

      onKeyboardHeight() {
        log.push('onKeyboardHeight');
      }

      onBack() {
        log.push('onBack');
      }

      beforeTabItemTap() {
        log.push('beforeTabItemTap');
      }

      render() {
        return <View>foo</View>;
      }
    }

    const page = Page(createPageConfig(Foo, TEST_PAGE));
    page.load();
    page.pullDownRefresh();
    page.pullIntercept();
    page.reachBottom();
    page.pageScroll();
    page.shareAppMessage();
    page.shareTimeline();
    page.titleClick();
    page.optionMenuClick();
    page.popMenuClick();
    page.hide();
    page.back();
    page.keyboardHeight();
    page.beforeTabItemTap();
    page.tabItemTap();
    page.resize();
    page.unload();

    expect(log).toEqual([
      'componentWillMount',
      'componentDidMount',
      'onLoad',
      'onShow',
      'onPullDownRefresh',
      'onPullIntercept',
      'onReachBottom',
      'onPageScroll',
      'menu',
      'onShareAppMessage',
      'menu',
      'onShareTimeline',
      'onTitleClick',
      'onOptionMenuClick',
      'onPopMenuClick',
      'onHide',
      'onBack',
      'onKeyboardHeight',
      'beforeTabItemTap',
      'onTabItemTap',
      'onTabItemTap',
      'onResize',
      'onResize',
      'onUnload',
      'componentWillUnmount',
    ]);
  });

  // it('hooks methods', done => {
  //   const log: string[] = [];
  //   const Foo = () => {
  //     React.useEffect(() => {
  //       log.push('componentDidMount');
  //       return () => {
  //         log.push('componentWillUnmount');
  //         expect(log).toEqual(['componentDidMount', 'componentWillUnmount']);
  //         done();
  //       };
  //     }, []);
  //     return <View>foo</View>;
  //   };
  //   const page = Page(createPageConfig(Foo, TEST_PAGE));
  //   page.load();
  //   page.unload();
  // });

  // it('call useEffect', done => {
  //   const Foo = React.forwardRef((props, ref) => {
  //     const log = React.useRef<string[]>([]);
  //     const times = React.useRef(0);
  //     const [v1, upV1] = React.useState(1);
  //     const [v2, upV2] = React.useState(1);
  //
  //     React.useEffect(() => {
  //       log.current.push('foo didMount');
  //       return () => {
  //         expect(times.current).toEqual(2);
  //         expect(log.current).toEqual(['foo onShow', 'foo didMount']);
  //         done();
  //       };
  //     }, []);
  //
  //     React.useEffect(
  //       function updateTimes() {
  //         times.current += 1;
  //       },
  //       [v1, v2]
  //     );
  //
  //     usePageEvent('onShow', function updateState() {
  //       upV1(2);
  //       upV2(2);
  //       log.current.push('foo onShow');
  //     });
  //
  //     return <View>useEffect</View>;
  //   });
  //   const page = Page(createPageConfig(() => <Foo />, TEST_PAGE));
  //   page.load();
  //   page.unload();
  // });

  // it('call events batchedUpdates', done => {
  //   const Foo = React.forwardRef((props, ref) => {
  //     const log = React.useRef<string[]>([]);
  //     const times = React.useRef(0);
  //     const [v1, upV1] = React.useState(1);
  //     const [v2, upV2] = React.useState(1);
  //
  //     const up = (event: any) => {
  //       expect(event.stopPropagation).toBeTruthy();
  //       upV1(2);
  //       upV2(2);
  //     };
  //
  //     React.useEffect(() => {
  //       log.current.push('foo didMount');
  //       return () => {
  //         expect(times.current).toEqual(2);
  //         expect(log.current).toEqual(['foo onShow', 'foo didMount']);
  //         done();
  //       };
  //     }, []);
  //
  //     React.useEffect(
  //       function updateTimes() {
  //         times.current += 1;
  //       },
  //       [v1, v2]
  //     );
  //
  //     usePageEvent('onShow', function updateState() {
  //       log.current.push('foo onShow');
  //     });
  //
  //     return <View onClick={up}>useEffect</View>;
  //   });
  //   const page = Page(createPageConfig(() => <Foo />, TEST_PAGE));
  //   page.load();
  //   const fnKey = Object.keys(page.config).find(key => key.endsWith('onClick')) as string;
  //   const fn = page.config[fnKey];
  //
  //   fn({
  //     stopPropagation() {
  //       // mock event
  //     },
  //   });
  //   setTimeout(() => {
  //     page.unload();
  //   }, 300);
  // });
});
