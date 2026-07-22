import type { UnifiedAPI, SystemInfo } from '../unified';
import { promisify } from '@rsmax/framework-shared';

declare const my: any;

export const aliAPI: UnifiedAPI = {
  getSystemInfo: () => {
    return new Promise<SystemInfo>(resolve => {
      const info = my.getSystemInfoSync();
      resolve({
        brand: info.brand || '',
        model: info.model || '',
        pixelRatio: info.pixelRatio,
        screenWidth: info.screenWidth,
        screenHeight: info.screenHeight,
        windowWidth: info.windowWidth,
        windowHeight: info.windowHeight,
        statusBarHeight: info.statusBarHeight || 0,
        language: info.language || '',
        version: info.version || '',
        platform: info.platform === 'ios' ? 'ios' : 'android',
      });
    });
  },

  getSystemInfoSync: () => {
    const info = my.getSystemInfoSync();
    return {
      brand: info.brand || '',
      model: info.model || '',
      pixelRatio: info.pixelRatio,
      screenWidth: info.screenWidth,
      screenHeight: info.screenHeight,
      windowWidth: info.windowWidth,
      windowHeight: info.windowHeight,
      statusBarHeight: info.statusBarHeight || 0,
      language: info.language || '',
      version: info.version || '',
      platform: info.platform === 'ios' ? 'ios' : 'android',
    };
  },

  navigateTo: options => promisify(my.navigateTo)(options),
  navigateBack: options => promisify(my.navigateBack)(options),
  redirectTo: options => promisify(my.redirectTo)(options),
  switchTab: options => promisify(my.switchTab)(options),
  reLaunch: options => promisify(my.reLaunch)(options),

  showToast: options => promisify(my.showToast)(options),
  showModal: options => promisify(my.showModal)(options),
  showLoading: options => promisify(my.showLoading)(options),
  hideLoading: () => my.hideLoading(),

  request: options => {
    return new Promise((resolve, reject) => {
      my.request({
        ...options,
        method: options.method?.toUpperCase(),
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  uploadFile: options => {
    return new Promise((resolve, reject) => {
      my.uploadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  downloadFile: options => {
    return new Promise((resolve, reject) => {
      my.downloadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  setStorage: options => promisify(my.setStorage)(options),
  setStorageSync: options => my.setStorageSync(options.key, options.data),
  getStorage: options => promisify(my.getStorage)(options),
  getStorageSync: options => ({ data: my.getStorageSync(options.key) }),
  removeStorage: options => promisify(my.removeStorage)(options),
  removeStorageSync: options => my.removeStorageSync(options.key),
  clearStorage: () => promisify(my.clearStorage)(),
  clearStorageSync: () => my.clearStorageSync(),
};

import type { Platform } from '../unified';

export function getCurrentPlatform(): Platform {
  return 'ali';
}

export function getCurrentAPI(): UnifiedAPI {
  return aliAPI;
}

export function setCurrentPlatform(_platform: Platform): void {
  // 一份小程序产物只服务一个构建目标平台，运行时无需切换
}

export function initAPI(_platform?: Platform): UnifiedAPI {
  return aliAPI;
}
