import React from 'react';
import { createHostComponent } from '@rsmax/runtime';
import { BaseProps } from '../../types/component';

/**
 *
 * 基础库 2.25.2 开始支持，低版本需做兼容处理。
 *
 * 微信 Windows 版：支持
 *
 * 微信 Mac 版：支持
 *
 * 渲染框架支持情况：Skyline （使用最新 Nighly 工具调试）、WebView
 * https://developers.weixin.qq.com/miniprogram/dev/component/root-portal.html
 */
export interface RootPortalProps extends BaseProps {
  /**
   * 是否从页面中脱离出来
   */
  enable: boolean;
}

export const RootPortal: React.ComponentType<RootPortalProps> = createHostComponent<RootPortalProps>('root-portal');

RootPortal.defaultProps = {
  enable: true,
};
