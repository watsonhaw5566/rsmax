import { RuntimeOptions } from '@rsmax/framework-shared';
import { ReactReconcilerInst } from './render';
import { unstable_batchedUpdates as batchedUpdatesLight } from './render-light';

export { default as render } from './render';
export { default as renderLight } from './render-light';
export { default as createAppConfig } from './createAppConfig';
export { default as createPageConfig } from './createPageConfig';
export { default as createComponentConfig } from './createComponentConfig';
export { default as createNativeComponent } from './createNativeComponent';
export { default as createHostComponent } from './createHostComponent';
export { createPortal } from './ReactPortal';
export { RuntimeOptions, PluginDriver } from '@rsmax/framework-shared';
export * from './hooks';
export * from './hooks-light';

export function unstable_batchedUpdates(callback: () => any): any {
  const renderer = RuntimeOptions.get('renderer');
  if (renderer === 'light') {
    return batchedUpdatesLight(callback);
  }
  return ReactReconcilerInst.batchedUpdates(callback, null);
}

export default {
  unstable_batchedUpdates,
};
