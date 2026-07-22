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

function detectPlatform(): string {
  const buildTarget = process.env?.RSMAX_PLATFORM;
  if (buildTarget === 'wechat' || buildTarget === 'ali' || buildTarget === 'toutiao') {
    return buildTarget;
  }
  if (typeof wx !== 'undefined') return 'wechat';
  if (typeof my !== 'undefined') return 'ali';
  if (typeof tt !== 'undefined') return 'toutiao';
  return 'wechat';
}

function resolveAdapter(platform: string): PlatformAdapter {
  if (platform === 'wechat') return wechatAdapter;
  if (platform === 'ali') return aliAdapter;
  if (platform === 'toutiao') return toutiaoAdapter;
  return wechatAdapter;
}

export function initAdapter(platform?: string): void {
  const target = platform ?? detectPlatform();
  const adapter = resolveAdapter(target);
  setCurrentPlatform(target as Platform);
  setCurrentAdapter(adapter);
}
