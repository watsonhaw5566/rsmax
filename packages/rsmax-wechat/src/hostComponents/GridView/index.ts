import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 网格/瀑布流布局容器
 * https://developers.weixin.qq.com/miniprogram/dev/component/grid-view.html
 */
export interface GridViewProps extends BaseProps {
  /** 布局方式 aligned/masonry */
  type?: 'aligned' | 'masonry';
  /** 交叉轴元素数量 */
  crossAxisCount?: number;
  /** 交叉轴元素最大范围 */
  maxCrossAxisExtent?: number;
  /** 主轴方向间隔 */
  mainAxisGap?: number;
  /** 交叉轴方向间隔 */
  crossAxisGap?: number;
  /** 内边距，按 top、right、bottom、left 顺序 3.0.0 */
  padding?: [number, number, number, number];
}

export const GridView: React.ComponentType<GridViewProps> = createHostComponent<GridViewProps>('grid-view');

GridView.defaultProps = {
  type: 'aligned',
  padding: [0, 0, 0, 0],
};
