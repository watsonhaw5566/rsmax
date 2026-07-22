import { getCurrentAPI, initAPI } from '@rsmax/one/api/current';
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
