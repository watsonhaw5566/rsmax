import { getCurrentAPI, initAPI } from '../adapters';
import type { UnifiedAPI } from './types';

export { initAPI };

export const api: UnifiedAPI = new Proxy(
  {},
  {
    get(_target: any, prop: string): any {
      const currentAPI = getCurrentAPI();
      return (currentAPI as any)[prop];
    },
  }
);

export type { UnifiedAPI };
export * from './types';
