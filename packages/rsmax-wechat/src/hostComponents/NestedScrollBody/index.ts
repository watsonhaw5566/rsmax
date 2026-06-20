import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface NestedScrollBodyProps extends BaseProps {
  // 嵌套滚动内容区，作为 scroll-view type="nested" 的直接子节点使用
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/nested-scroll-header.html */
export const NestedScrollBody: React.ComponentType<NestedScrollBodyProps> =
  createHostComponent<NestedScrollBodyProps>('nested-scroll-body');
