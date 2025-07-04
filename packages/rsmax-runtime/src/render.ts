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
    rendererPackageName: 'remax',
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
  // Create a root Container if it doesnt exist
  if (!container._rootContainer) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    container._rootContainer = ReactReconcilerInst.createContainer(container, 0, null, false, null, '', () => {}, null);
  }

  ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, () => {
    // ignore
  });

  return getPublicRootInstance(container._rootContainer);
}
