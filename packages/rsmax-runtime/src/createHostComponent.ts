import React from 'react';
import { RuntimeOptions } from '@rsmax/framework-shared';

export default function createHostComponent<P = any>(name: string, component?: React.ComponentType<P>) {
  if (component) {
    return component;
  }

  const Component = React.forwardRef((props, ref) => {
    let element = React.createElement(name, { ...props, ref });
    element = RuntimeOptions.get('pluginDriver').onCreateHostComponentElement(element) as React.DOMElement<any, any>;
    return element;
  });
  Component.displayName = name;
  return RuntimeOptions.get('pluginDriver').onCreateHostComponent(Component);
}
