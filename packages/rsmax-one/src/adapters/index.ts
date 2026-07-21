import {
  type Platform,
  type PlatformAdapter,
  getCurrentPlatform,
  setCurrentPlatform,
  getCurrentAdapter,
  setCurrentAdapter,
  createAdapter,
} from './PlatformAdapter';
import { wechatAdapter } from './wechat';
import { aliAdapter } from './ali';
import { toutiaoAdapter } from './toutiao';

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

export {
  type Platform,
  type PlatformAdapter,
  getCurrentPlatform,
  setCurrentPlatform,
  getCurrentAdapter,
  setCurrentAdapter,
  createAdapter,
};

export { wechatAdapter };
export { aliAdapter };
export { toutiaoAdapter };

export const adapters: Record<string, PlatformAdapter> = {
  wechat: wechatAdapter,
  ali: aliAdapter,
  toutiao: toutiaoAdapter,
};

function detectPlatform(): string {
  if (typeof wx !== 'undefined') {
    return 'wechat';
  }
  if (typeof my !== 'undefined') {
    return 'ali';
  }
  if (typeof tt !== 'undefined') {
    return 'toutiao';
  }
  return 'wechat';
}

export function initAdapter(platform?: string): void {
  let targetPlatform = platform;

  if (!targetPlatform) {
    try {
      targetPlatform = process.env?.RSMAX_PLATFORM;
    } catch {
      // process.env may not be available in all environments
    }
  }

  if (!targetPlatform) {
    targetPlatform = detectPlatform();
  }

  const adapter = adapters[targetPlatform];

  if (!adapter) {
    throw new Error(`Unsupported platform: ${targetPlatform}`);
  }

  setCurrentPlatform(targetPlatform as Platform);
  setCurrentAdapter(adapter);
}
