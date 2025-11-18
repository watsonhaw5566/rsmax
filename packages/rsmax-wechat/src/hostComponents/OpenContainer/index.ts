import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 容器转场动画组件
 * https://developers.weixin.qq.com/miniprogram/dev/component/open-container.html
 */
export interface OpenContainerProps extends BaseProps {
  /** 初始容器背景色 */
  closedColor?: string;
  /** 初始容器影深大小 */
  closedElevation?: number;
  /** 初始容器圆角大小 */
  closedBorderRadius?: number;
  /** fadeThrough 模式下的过渡背景色 */
  middleColor?: string;
  /** 打开状态下容器背景色 */
  openColor?: string;
  /** 打开状态下容器影深大小 */
  openElevation?: number;
  /** 打开状态下容器圆角大小 */
  openBorderRadius?: number;
  /** 动画时长 */
  transitionDuration?: number;
  /** 动画类型 fade/fadeThrough */
  transitionType?: 'fade' | 'fadeThrough';
}

export const OpenContainer: React.ComponentType<OpenContainerProps> =
  createHostComponent<OpenContainerProps>('open-container');

OpenContainer.defaultProps = {
  closedColor: 'white',
  openColor: 'white',
  transitionDuration: 300,
  transitionType: 'fade',
};
