import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface GridViewProps extends BaseProps {
  /** 布局方式：aligned - 每行高度由同行中最大高度子节点决定；masonry - 瀑布流 (default: aligned) */
  type?: 'aligned' | 'masonry';
  /** 交叉轴元素数量 (default: 2) */
  crossAxisCount?: number;
  /** 交叉轴元素最大范围 (default: 0) */
  maxCrossAxisExtent?: number;
  /** 主轴方向间隔 (default: 0) */
  mainAxisGap?: number;
  /** 交叉轴方向间隔 (default: 0) */
  crossAxisGap?: number;
  /** 长度为4的数组，按 top、right、bottom、left 顺序指定内边距 (default: [0,0,0,0]) */
  padding?: number[];
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/grid-view.html */
export const GridView: React.ComponentType<GridViewProps> = createHostComponent<GridViewProps>('grid-view');

GridView.defaultProps = {
  type: 'aligned',
  crossAxisCount: 2,
  maxCrossAxisExtent: 0,
  mainAxisGap: 0,
  crossAxisGap: 0,
  padding: [0, 0, 0, 0],
};
