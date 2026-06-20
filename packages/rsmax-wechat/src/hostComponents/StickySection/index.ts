import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface StickySectionProps extends BaseProps {
  /** 吸顶元素重叠时是否继续上推 (default: true) */
  pushPinnedHeader?: boolean;
  /** 长度为4的数组，按 top、right、bottom、left 顺序指定内边距 (default: [0,0,0,0]) */
  padding?: number[];
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/sticky-section.html */
export const StickySection: React.ComponentType<StickySectionProps> =
  createHostComponent<StickySectionProps>('sticky-section');

StickySection.defaultProps = {
  pushPinnedHeader: true,
  padding: [0, 0, 0, 0],
};
