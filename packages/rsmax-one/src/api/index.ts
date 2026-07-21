export { api, initAPI } from './unified';
export { getCurrentAPI, getCurrentPlatform, setCurrentPlatform } from './adapters';
export { wechatAPI, aliAPI, toutiaoAPI } from './adapters';

export type { UnifiedAPI } from './unified/types';
export * from './unified/types';
