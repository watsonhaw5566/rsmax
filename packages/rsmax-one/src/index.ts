export * from './components';

export * as wechat from './hostComponents/wechat';
export * as ali from './hostComponents/ali';
export * as toutiao from './hostComponents/toutiao';

export { api } from './api/unified';
export { getCurrentAPI, getCurrentPlatform, setCurrentPlatform } from './api/adapters';
export { wechatAPI, aliAPI, toutiaoAPI } from './api/adapters';

export type { UnifiedAPI } from './api/unified/types';
export * from './api/unified/types';

import createHostComponent from './createHostComponent';
export { createHostComponent };
export { createUnifiedComponent } from './components';

export type { BaseProps, Platform, PlatformConfig } from './types/component';

export * from './types/component';
export * from './types/event';
export * from './types';
