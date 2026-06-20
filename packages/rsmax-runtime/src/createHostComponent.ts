import { RuntimeOptions } from '@rsmax/framework-shared';
import React from 'react';

export default function createHostComponent<P = any>(name: string, component?: React.ComponentType<P>) {
  if (component) {
    return component;
  }

  const Component = React.forwardRef<any, React.PropsWithChildren<P>>((props, ref) => {
    let element = React.createElement(name, { ...props, ref });
    element = RuntimeOptions.get('pluginDriver').onCreateHostComponentElement(element) as React.DOMElement<any, any>;
    return element;
  });
  Component.displayName = name;
  return RuntimeOptions.get('pluginDriver').onCreateHostComponent(Component) as React.ForwardRefExoticComponent<
    React.PropsWithChildren<P> & React.RefAttributes<any>
  >;
}
