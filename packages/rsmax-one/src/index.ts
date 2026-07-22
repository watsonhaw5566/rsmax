export * from './components';

export { api } from './api/unified';
export { getCurrentAPI, getCurrentPlatform, setCurrentPlatform, initAPI } from '@rsmax/one/api/current';

export type { UnifiedAPI } from './api/unified/types';
export * from './api/unified/types';

export { default as createHostComponent } from './createHostComponent';
export { createUnifiedComponent } from './components';

export type { BaseProps, Platform, PlatformConfig } from './types/component';

export * from './types/component';
export * from './types/event';
export * from './types';
