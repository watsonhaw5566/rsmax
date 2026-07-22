import { RuntimeOptions } from '@rsmax/framework-shared';
import renderClassic from './render';
import renderLight from './render-light';
import { ReactReconcilerInst } from './render';
import { unstable_batchedUpdates as batchedUpdatesLight } from './render-light';

export interface Renderer {
  render: (element: any, container: any) => any;
  unstable_batchedUpdates: (callback: () => any, ...args: any[]) => any;
}

const classicRenderer: Renderer = {
  render: renderClassic,
  unstable_batchedUpdates: ReactReconcilerInst.batchedUpdates,
};

const lightRenderer: Renderer = {
  render: renderLight,
  unstable_batchedUpdates: batchedUpdatesLight,
};

export function getRenderer(): Renderer {
  const renderer = RuntimeOptions.get('renderer');
  return renderer === 'light' ? lightRenderer : classicRenderer;
}

export { renderClassic as render, renderLight };
