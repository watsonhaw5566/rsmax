import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 吸顶布局分区容器
 * https://developers.weixin.qq.com/miniprogram/dev/component/sticky-section.html
 */
export interface StickySectionProps extends BaseProps {}

export const StickySection: React.ComponentType<StickySectionProps> =
  createHostComponent<StickySectionProps>('sticky-section');
