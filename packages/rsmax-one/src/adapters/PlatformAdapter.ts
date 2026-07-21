export type Platform = 'wechat' | 'ali' | 'toutiao';

export interface PlatformAdapter {
  platform: Platform;
  api: Record<string, any>;
  componentProps: Record<string, Record<string, any>>;
}

let currentPlatform: Platform = 'wechat';
let currentAdapter: PlatformAdapter | null = null;

export function getCurrentPlatform(): Platform {
  return currentPlatform;
}

export function setCurrentPlatform(platform: Platform): void {
  currentPlatform = platform;
}

export function getCurrentAdapter(): PlatformAdapter {
  if (!currentAdapter) {
    throw new Error('Platform adapter not initialized');
  }
  return currentAdapter;
}

export function setCurrentAdapter(adapter: PlatformAdapter): void {
  currentAdapter = adapter;
}

export function createAdapter(
  platform: Platform,
  api: Record<string, any>,
  componentProps: Record<string, Record<string, any>>
): PlatformAdapter {
  return {
    platform,
    api,
    componentProps,
  };
}
