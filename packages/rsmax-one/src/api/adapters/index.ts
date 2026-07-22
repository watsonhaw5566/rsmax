import type { Platform, UnifiedAPI } from '../unified';

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

const buildTarget = process.env.RSMAX_PLATFORM as Platform | undefined;

let currentPlatform: Platform;
let currentAPI: UnifiedAPI;

// 构建期 platform 选择：rspack DefinePlugin 会把 process.env.RSMAX_PLATFORM
// 替换为字符串常量（如 'wechat'），rspack DCE 只保留命中分支，从而让
// 非目标平台的 require 语句被消除，配合 sideEffects:false 不会进入 bundle。
if (buildTarget === 'wechat') {
  currentPlatform = 'wechat';
  currentAPI = require('./wechat').wechatAPI;
} else if (buildTarget === 'ali') {
  currentPlatform = 'ali';
  currentAPI = require('./ali').aliAPI;
} else if (buildTarget === 'toutiao') {
  currentPlatform = 'toutiao';
  currentAPI = require('./toutiao').toutiaoAPI;
} else {
  // 运行时 fallback（兼容未设置 RSMAX_PLATFORM 的场景）
  if (typeof wx !== 'undefined') {
    currentPlatform = 'wechat';
    currentAPI = require('./wechat').wechatAPI;
  } else if (typeof my !== 'undefined') {
    currentPlatform = 'ali';
    currentAPI = require('./ali').aliAPI;
  } else if (typeof tt !== 'undefined') {
    currentPlatform = 'toutiao';
    currentAPI = require('./toutiao').toutiaoAPI;
  } else {
    currentPlatform = 'wechat';
    currentAPI = require('./wechat').wechatAPI;
  }
}

export function getCurrentPlatform(): Platform {
  return currentPlatform;
}

export function setCurrentPlatform(_platform: Platform): void {
  // 一份小程序产物只服务一个构建目标平台，运行时无需切换
}

export function getCurrentAPI(): UnifiedAPI {
  return currentAPI;
}

export function initAPI(_platform?: Platform): UnifiedAPI {
  return currentAPI;
}
