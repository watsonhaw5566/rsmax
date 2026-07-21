import type { UnifiedAPI, SystemInfo } from '../unified/types';
import { promisify } from '@rsmax/framework-shared';

declare const tt: any;

export const toutiaoAPI: UnifiedAPI = {
  getSystemInfo: () => {
    return new Promise<SystemInfo>(resolve => {
      const info = tt.getSystemInfoSync();
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
    const info = tt.getSystemInfoSync();
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

  navigateTo: options => promisify(tt.navigateTo)(options),
  navigateBack: options => promisify(tt.navigateBack)(options),
  redirectTo: options => promisify(tt.redirectTo)(options),
  switchTab: options => promisify(tt.switchTab)(options),
  reLaunch: options => promisify(tt.reLaunch)(options),

  showToast: options => promisify(tt.showToast)(options),
  showModal: options => promisify(tt.showModal)(options),
  showLoading: options => promisify(tt.showLoading)(options),
  hideLoading: () => tt.hideLoading(),

  request: options => {
    return new Promise((resolve, reject) => {
      tt.request({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  uploadFile: options => {
    return new Promise((resolve, reject) => {
      tt.uploadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  downloadFile: options => {
    return new Promise((resolve, reject) => {
      tt.downloadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  setStorage: options => promisify(tt.setStorage)(options),
  setStorageSync: options => tt.setStorageSync(options.key, options.data),
  getStorage: options => promisify(tt.getStorage)(options),
  getStorageSync: options => ({ data: tt.getStorageSync(options.key) }),
  removeStorage: options => promisify(tt.removeStorage)(options),
  removeStorageSync: options => tt.removeStorageSync(options.key),
  clearStorage: () => promisify(tt.clearStorage)(),
  clearStorageSync: () => tt.clearStorageSync(),
};
