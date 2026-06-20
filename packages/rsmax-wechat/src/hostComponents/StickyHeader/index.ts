import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface StickyHeaderProps extends BaseProps {
  /** 吸顶时与视窗顶部的距离(px) (default: 0) */
  offsetTop?: number;
  /** 是否允许与前一个 sticky-header 重叠 (default: false) */
  allowOverlapping?: boolean;
  /** 长度为4的数组，按 top、right、bottom、left 顺序指定内边距(px) (default: [0,0,0,0]) */
  padding?: number[];
  /** 吸顶状态变化事件 */
  onStickOnTopChange?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/sticky-header.html */
export const StickyHeader: React.ComponentType<StickyHeaderProps> =
  createHostComponent<StickyHeaderProps>('sticky-header');

StickyHeader.defaultProps = {
  offsetTop: 0,
  allowOverlapping: false,
  padding: [0, 0, 0, 0],
};
