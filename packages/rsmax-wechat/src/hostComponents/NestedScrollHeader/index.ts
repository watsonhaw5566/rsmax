import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 嵌套滚动外层 Header
 * https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-header.html
 */
export interface NestedScrollHeaderProps extends BaseProps {}

export const NestedScrollHeader: React.ComponentType<NestedScrollHeaderProps> =
  createHostComponent<NestedScrollHeaderProps>('nested-scroll-header');
