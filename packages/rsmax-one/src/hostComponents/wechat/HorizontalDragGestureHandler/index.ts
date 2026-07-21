import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface HorizontalDragGestureHandlerProps extends BaseProps {
  /** 声明手势协商时的组件标识 */
  tag?: string;
  /** 手势识别成功的回调 */
  onGesture?: (event: any) => any;
  /** 手指移动过程中手势是否响应 */
  onShouldResponseOnMove?: (event: any) => any;
  /** 手势是否应该被识别 */
  onShouldAcceptGesture?: (event: any) => any;
  /** 声明可同时触发的手势节点 */
  simultaneousHandlers?: string[];
  /** 代理的原生节点类型 */
  nativeView?: string;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/horizontal-drag-gesture-handler.html */
export const HorizontalDragGestureHandler: React.ComponentType<HorizontalDragGestureHandlerProps> =
  createHostComponent<HorizontalDragGestureHandlerProps>('horizontal-drag-gesture-handler');
