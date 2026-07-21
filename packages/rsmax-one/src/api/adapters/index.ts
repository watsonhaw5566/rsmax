import type { Platform, UnifiedAPI } from '../unified/types';
import { wechatAPI } from './wechat';
import { aliAPI } from './ali';
import { toutiaoAPI } from './toutiao';

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

export { wechatAPI, aliAPI, toutiaoAPI };

export const adapters: Record<Platform, UnifiedAPI> = {
  wechat: wechatAPI,
  ali: aliAPI,
  toutiao: toutiaoAPI,
};

function detectPlatform(): Platform {
  if (typeof wx !== 'undefined') return 'wechat';
  if (typeof my !== 'undefined') return 'ali';
  if (typeof tt !== 'undefined') return 'toutiao';
  return 'wechat';
}

let currentPlatform: Platform = detectPlatform();
let currentAPI: UnifiedAPI = adapters[currentPlatform];

export function getCurrentPlatform(): Platform {
  return currentPlatform;
}

export function setCurrentPlatform(platform: Platform): void {
  currentPlatform = platform;
  currentAPI = adapters[platform];
}

export function getCurrentAPI(): UnifiedAPI {
  return currentAPI;
}

export function initAPI(platform?: Platform): UnifiedAPI {
  if (platform) {
    setCurrentPlatform(platform);
  }
  return currentAPI;
}
