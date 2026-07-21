import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface OpenContainerProps extends BaseProps {
  /** 初始容器背景色 (default: white) */
  closedColor?: string;
  /** 初始容器影深大小 (default: 0) */
  closedElevation?: number;
  /** 初始容器圆角大小 (default: 0) */
  closedBorderRadius?: number;
  /** fadeThrough 模式下的过渡背景色 */
  middleColor?: string;
  /** 打开状态下容器背景色 (default: white) */
  openColor?: string;
  /** 打开状态下容器影深大小 (default: 0) */
  openElevation?: number;
  /** 打开状态下容器圆角大小 (default: 0) */
  openBorderRadius?: number;
  /** 动画时长，单位毫秒 (default: 300) */
  transitionDuration?: number;
  /** 动画类型：fade / fadeThrough (default: fade) */
  transitionType?: 'fade' | 'fadeThrough';
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/open-container.html */
export const OpenContainer: React.ComponentType<OpenContainerProps> =
  createHostComponent<OpenContainerProps>('open-container');

OpenContainer.defaultProps = {
  closedColor: 'white',
  closedElevation: 0,
  closedBorderRadius: 0,
  openColor: 'white',
  openElevation: 0,
  openBorderRadius: 0,
  transitionDuration: 300,
  transitionType: 'fade',
};
