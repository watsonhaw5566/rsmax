import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * Skyline 列表构造器，仅 Skyline 支持
 * https://developers.weixin.qq.com/miniprogram/dev/component/list-builder.html
 */
export interface ListBuilderProps extends BaseProps {
  /** 内边距，按 top、right、bottom、left 顺序 */
  padding?: [number, number, number, number];
  /** 类型：定高(static) 或 不定高(dynamic) */
  type?: 'static' | 'dynamic';
  /** 用于渲染的列表 */
  list?: unknown[];
  /** 完整列表的长度，不传则取 list 的长度 */
  childCount?: number;
  /** 列表项的高度，type=static 必填 */
  childHeight?: number[];
  /** 首次渲染的列表项数量，用于减少首屏白屏时长 3.7.12 */
  initialChildCount?: number;
  /** 列表项创建时触发 event.detail = {index} */
  onItemBuild?: (event: GenericEvent) => void;
  /** 列表项回收时触发 event.detail = {index} */
  onItemDispose?: (event: GenericEvent) => void;
}

export const ListBuilder: React.ComponentType<ListBuilderProps> = createHostComponent<ListBuilderProps>('list-builder');

ListBuilder.defaultProps = {
  type: 'static',
  padding: [0, 0, 0, 0],
  initialChildCount: 0,
};
