import type { RuntimePlugin } from '@rsmax/types';
import * as React from 'react';

export default class PluginDriver {
  plugins: RuntimePlugin[];

  constructor(plugins: RuntimePlugin[]) {
    this.plugins = plugins;
  }

  onAppConfig<T>(config: T): T {
    return this.plugins.reduce<T>((acc, plugin) => {
      if (typeof plugin.onAppConfig === 'function') {
        return plugin.onAppConfig({ config: acc }) as T;
      }
      return acc;
    }, config);
  }

  onPageConfig<T>({ config, page }: { config: T; page: string }): T {
    return this.plugins.reduce<T>((acc, plugin) => {
      if (typeof plugin.onPageConfig === 'function') {
        return plugin.onPageConfig({ config: acc, page }) as T;
      }
      return acc;
    }, config);
  }

  onAppComponent<C extends React.ComponentType>(component: C): C {
    return this.plugins.reduce<C>((acc, plugin) => {
      if (typeof plugin.onAppComponent === 'function') {
        return plugin.onAppComponent({ component: acc }) as C;
      }
      return acc;
    }, component);
  }

  onPageComponent<P>({ component, page }: { component: React.ComponentType<P>; page: string }): React.ComponentType<P> {
    return this.plugins.reduce<React.ComponentType<P>>((acc, plugin) => {
      if (typeof plugin.onPageComponent === 'function') {
        return plugin.onPageComponent({ component: acc, page }) as React.ComponentType<P>;
      }
      return acc;
    }, component);
  }

  onMiniComponent<P>({
    component,
    context,
  }: {
    component: React.ComponentType<P>;
    context: unknown;
  }): React.ComponentType<P> {
    return this.plugins.reduce<React.ComponentType<P>>((acc, plugin) => {
      if (typeof plugin.onMiniComponent === 'function') {
        return plugin.onMiniComponent({ component: acc, context }) as React.ComponentType<P>;
      }
      return acc;
    }, component);
  }

  onCreateHostComponent<P>(
    component: React.ForwardRefExoticComponent<P & React.RefAttributes<any>> | React.ComponentType<P>
  ) {
    return this.plugins.reduce(
      (acc, plugin) => {
        if (typeof plugin.onCreateHostComponent === 'function') {
          return plugin.onCreateHostComponent({ component: acc });
        }
        return acc;
      },
      component as React.ForwardRefExoticComponent<any> | React.ComponentType<any>
    );
  }

  onCreateHostComponentElement<P>(element: React.ReactElement<P>) {
    return this.plugins.reduce((acc, plugin) => {
      if (typeof plugin.onCreateHostComponentElement === 'function') {
        return plugin.onCreateHostComponentElement({ element: acc });
      }
      return acc;
    }, element as React.ReactElement<any>);
  }
}
