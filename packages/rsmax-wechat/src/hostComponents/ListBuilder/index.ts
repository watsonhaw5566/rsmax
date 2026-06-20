import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface ListBuilderProps extends BaseProps {
  /** 列表模式：static - 定高模式；dynamic - 不定高模式 (default: static) */
  type?: 'static' | 'dynamic';
  /** 用于渲染列表的源数据 */
  list?: any[];
  /** 完整列表的总长度，不传则取 list.length */
  childCount?: number;
  /** 列表项的高度（type 为 static 时必须传入） */
  childHeight?: number;
  /** 长度为4的数组，按 top、right、bottom、left 顺序指定内边距 (default: [0,0,0,0]) */
  padding?: number[];
  /** 首次渲染时提前渲染的列表项数量 (default: 0) */
  initialChildCount?: number;
  /** 列表项创建时触发 */
  onItemBuild?: (event: any) => any;
  /** 列表项回收时触发 */
  onItemDispose?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/list-builder.html */
export const ListBuilder: React.ComponentType<ListBuilderProps> = createHostComponent<ListBuilderProps>('list-builder');

ListBuilder.defaultProps = {
  type: 'static',
  padding: [0, 0, 0, 0],
  initialChildCount: 0,
};
