import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 3.4.0 开始支持，低版本需做兼容处理。
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/draggable.html
 */
export interface DraggableProps extends BaseProps {
  /** 拖拽能力标签，拥有相同 tag 的 draggable 和 drag-target 组件可以相互响应 */
  tag?: string;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 支持的拖拽类型，默认 move 为仅在 drag-target 内移动，copy 为从自身复制到 drag-target */
  dragType?: 'move' | 'copy';
  /** 拖拽开始时触发 */
  onDragStart?: (event: GenericEvent) => any;
  /** 拖拽结束时触发 */
  onDragEnd?: (event: GenericEvent) => any;
}

export const Draggable: React.ComponentType<DraggableProps> = createHostComponent<DraggableProps>('draggable');

Draggable.defaultProps = {
  draggable: true,
  dragType: 'move',
};
