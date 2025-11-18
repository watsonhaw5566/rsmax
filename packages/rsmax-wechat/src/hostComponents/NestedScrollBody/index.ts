import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 嵌套滚动里层容器，仅 Skyline 支持
 * https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-body.html
 */
export interface NestedScrollBodyProps extends BaseProps {
  /** 滚动目标距离顶部的距离(px)，外层滚动时该组件在主轴方向逐渐撑开 3.6.2 */
  offsetTop?: number;
}

export const NestedScrollBody: React.ComponentType<NestedScrollBodyProps> =
  createHostComponent<NestedScrollBodyProps>('nested-scroll-body');

NestedScrollBody.defaultProps = {
  offsetTop: 0,
};
