import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 3.4.0 开始支持，低版本需做兼容处理。
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/drag-target.html
 */
export interface DragTargetProps extends BaseProps {
  /** 拖拽能力标签，拥有相同 tag 的 draggable 和 drag-target 组件可以相互响应 */
  tag?: string;
  /** 是否可接收拖拽 */
  droppable?: boolean;
  /** 拖拽进入时触发 */
  onDragEnter?: (event: GenericEvent) => any;
  /** 拖拽离开时触发 */
  onDragLeave?: (event: GenericEvent) => any;
  /** 拖拽在组件内移动时触发 */
  onDragOver?: (event: GenericEvent) => any;
  /** 拖拽放下时触发 */
  onDrop?: (event: GenericEvent) => any;
}

export const DragTarget: React.ComponentType<DragTargetProps> = createHostComponent<DragTargetProps>('drag-target');

DragTarget.defaultProps = {
  droppable: true,
};
