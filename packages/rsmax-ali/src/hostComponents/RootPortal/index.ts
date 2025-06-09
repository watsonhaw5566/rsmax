import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

/**
 * 基础库 2.8.3 开始支持，低版本需要做 兼容处理。
 * Native 渲染引擎：暂不支持。可以通过my.canIUse('root-portal')判断是否支持。
 * https://opendocs.alipay.com/mini/05snwp?pathHash=bccb8999
 */
export interface RootPortalProps {
  /**
   * 是否从页面中脱离出来
   */
  enable?: boolean;
}

export const RootPortal: React.ComponentType<RootPortalProps> = createHostComponent<RootPortalProps>('root-portal');

RootPortal.defaultProps = {
  enable: true,
};
