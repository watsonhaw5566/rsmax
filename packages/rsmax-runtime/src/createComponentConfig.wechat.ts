import { ComponentInstanceContext, RuntimeOptions } from '@rsmax/framework-shared';
import * as React from 'react';
import Container from './Container';
import render from './render';

export default function createComponentConfig(Component: React.ComponentType<any>) {
  const config: any = {
    options: {
      styleIsolation: 'apply-shared',
    },

    data: {
      action: {},
      root: {
        children: [],
      },
    },

    observers: {
      '**'(
        this: { container?: Container; properties?: Record<string, any>; render: () => void },
        nextProps: Record<string, any>
      ) {
        if (this.container && this.properties !== nextProps) {
          this.render();
        }
      },
    },

    attached: function () {
      // 在组件实例进入页面节点树时执行
      if (!this.container) {
        this.init();
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      this.container.clearUpdate();
      render(null, this.container);
    },

    methods: {
      init(this: any) {
        this.component = RuntimeOptions.get('pluginDriver').onMiniComponent({
          component: Component,
          context: this,
        });
        this.container = new Container(this);
        this.render();
      },

      render(this: any) {
        this.element = render(
          React.createElement(
            ComponentInstanceContext.Provider,
            {
              value: this,
            },
            React.createElement(this.component, this.properties)
          ),
          this.container
        );
      },
    },
  };

  return config;
}
