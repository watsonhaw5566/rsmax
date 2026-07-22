import renderLight, { unstable_batchedUpdates as batchedUpdatesLight } from './render-light';

export const ReactReconcilerInst = {
  batchedUpdates(callback: () => any) {
    return batchedUpdatesLight(callback);
  },
};

export default renderLight;
