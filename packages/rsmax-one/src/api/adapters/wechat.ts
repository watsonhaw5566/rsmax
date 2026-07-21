import type { UnifiedAPI } from '../unified/types';
import { promisify } from '@rsmax/framework-shared';

declare const wx: any;

export const wechatAPI: UnifiedAPI = {
  getSystemInfo: promisify(wx.getSystemInfo),
  getSystemInfoSync: () => wx.getSystemInfoSync(),

  navigateTo: options => promisify(wx.navigateTo)(options),
  navigateBack: options => promisify(wx.navigateBack)(options),
  redirectTo: options => promisify(wx.redirectTo)(options),
  switchTab: options => promisify(wx.switchTab)(options),
  reLaunch: options => promisify(wx.reLaunch)(options),

  showToast: options => promisify(wx.showToast)(options),
  showModal: options => promisify(wx.showModal)(options),
  showLoading: options => promisify(wx.showLoading)(options),
  hideLoading: () => wx.hideLoading(),

  request: options => {
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  uploadFile: options => {
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  downloadFile: options => {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        ...options,
        success: (res: any) => resolve(res),
        fail: (err: any) => reject(err),
      });
    });
  },

  setStorage: options => promisify(wx.setStorage)(options),
  setStorageSync: options => wx.setStorageSync(options.key, options.data),
  getStorage: options => promisify(wx.getStorage)(options),
  getStorageSync: options => ({ data: wx.getStorageSync(options.key) }),
  removeStorage: options => promisify(wx.removeStorage)(options),
  removeStorageSync: options => wx.removeStorageSync(options.key),
  clearStorage: () => promisify(wx.clearStorage)(),
  clearStorageSync: () => wx.clearStorageSync(),
};
