import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface NestedScrollHeaderProps extends BaseProps {
  // 嵌套滚动头部节点，仅渲染第一个子节点
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-header.html */
export const NestedScrollHeader: React.ComponentType<NestedScrollHeaderProps> =
  createHostComponent<NestedScrollHeaderProps>('nested-scroll-header');
