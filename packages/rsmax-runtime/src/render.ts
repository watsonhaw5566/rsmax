import { RuntimeOptions } from '@rsmax/framework-shared';
import type * as React from 'react';
import ReactReconciler from 'react-reconciler';
import type AppContainer from './AppContainer';
import type Container from './Container';
import hostConfig from './hostConfig';

export const ReactReconcilerInst = ReactReconciler(hostConfig as any);

if (process.env.NODE_ENV === 'development') {
  ReactReconcilerInst.injectIntoDevTools({
    bundleType: 1,
    version: '18.3.0',
    rendererPackageName: 'rsmax',
  });
}

function getPublicRootInstance(container: ReactReconciler.FiberRoot) {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  return containerFiber.child.stateNode;
}

export default function render(rootElement: React.ReactElement | null, container: Container | AppContainer) {
  if (!container._rootContainer) {
    container._rootContainer = ReactReconcilerInst.createContainer(
      container,
      RuntimeOptions.get('concurrent') ? 1 : 0,
      null,
      false,
      null,
      '',
      () => {},
      null
    );
  }

  ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, () => {
    // ignore
  });

  return getPublicRootInstance(container._rootContainer);
}
