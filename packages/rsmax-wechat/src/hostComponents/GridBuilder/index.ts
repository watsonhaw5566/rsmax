import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * Skyline 网格构造器，仅 Skyline 支持
 * https://developers.weixin.qq.com/miniprogram/dev/component/grid-builder.html
 */
export interface GridBuilderProps extends BaseProps {
  /** 内边距，按 top、right、bottom、left 顺序 3.4.0 */
  padding?: [number, number, number, number];
  /** 用于渲染的列表 3.4.0 */
  list?: unknown[];
  /** 完整列表的长度，不传则取 list 的长度 3.4.0 */
  childCount?: number;
  /** 布局方式 aligned/masonry 3.4.0 */
  type?: 'aligned' | 'masonry';
  /** 交叉轴元素数量 3.4.0 */
  crossAxisCount?: number;
  /** 交叉轴元素最大范围 3.4.0 */
  maxCrossAxisExtent?: number;
  /** 主轴方向间隔 3.4.0 */
  mainAxisGap?: number;
  /** 交叉轴方向间隔 3.4.0 */
  crossAxisGap?: number;
  /** 列表项创建时触发 event.detail = {index} 3.4.0 */
  onItemBuild?: (event: GenericEvent) => void;
  /** 列表项回收时触发 event.detail = {index} 3.4.0 */
  onItemDispose?: (event: GenericEvent) => void;
}

export const GridBuilder: React.ComponentType<GridBuilderProps> = createHostComponent<GridBuilderProps>('grid-builder');

GridBuilder.defaultProps = {
  type: 'aligned',
  padding: [0, 0, 0, 0],
};
