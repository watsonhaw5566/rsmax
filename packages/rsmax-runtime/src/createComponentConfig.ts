import { ComponentInstanceContext, RuntimeOptions } from '@rsmax/framework-shared';
import * as React from 'react';
import Container from './Container';
import { getRenderer } from './renderer';

export default function createComponentConfig(Component: React.ComponentType<any>) {
  const platform = RuntimeOptions.get('platform');
  const isWechat = platform === 'wechat';

  const config: any = {
    data: {
      action: {},
      root: {
        children: [],
      },
    },
  };

  if (isWechat) {
    config.options = {
      styleIsolation: 'apply-shared',
    };

    config.attached = function () {
      if (!this.container) {
        this.init();
      }
    };

    config.detached = function () {
      this.container.clearUpdate();
      const { render } = getRenderer();
      render(null, this.container);
    };
  } else {
    config.didMount = function () {
      if (!this.container) {
        this.init();
      }
    };

    config.didUpdate = function (prevProps: any, prevData: any) {
      if (prevData !== this.data) {
        return;
      }
      this.render();
    };

    config.didUnmount = function () {
      this.container.clearUpdate();
      const { render } = getRenderer();
      render(null, this.container);
    };
  }

  config.methods = {
    init(this: any) {
      this.component = RuntimeOptions.get('pluginDriver').onMiniComponent({
        component: Component,
        context: this,
      });
      this.container = new Container(this);
      this.render();
    },

    render(this: any) {
      const { render } = getRenderer();
      this.element = render(
        React.createElement(
          ComponentInstanceContext.Provider,
          {
            value: this,
          },
          React.createElement(this.component, isWechat ? this.properties : this.props)
        ),
        this.container
      );
    },
  };

  return config;
}
