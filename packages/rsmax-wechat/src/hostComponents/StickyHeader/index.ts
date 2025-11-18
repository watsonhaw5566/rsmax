import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * Skyline 吸顶布局容器
 * https://developers.weixin.qq.com/miniprogram/dev/component/sticky-header.html
 */
export interface StickyHeaderProps extends BaseProps {
  /** 吸顶时与视窗顶部的距离(px) 3.0.0 */
  offsetTop?: number;
  /** 是否允许与前一个 sticky-header 重叠 3.7.11 */
  allowOverlapping?: boolean;
  /** 内边距，按 top、right、bottom、left 顺序(px) 3.0.0 */
  padding?: [number, number, number, number];
  /** 吸顶状态变化事件 event.detail = { isStickOnTop } 3.6.2 */
  onStickOnTopChange?: (event: GenericEvent) => void;
}

export const StickyHeader: React.ComponentType<StickyHeaderProps> =
  createHostComponent<StickyHeaderProps>('sticky-header');

StickyHeader.defaultProps = {
  offsetTop: 0,
  allowOverlapping: false,
  padding: [0, 0, 0, 0],
};
