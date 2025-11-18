import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 半屏可拖拽组件，仅 Skyline 支持
 * https://developers.weixin.qq.com/miniprogram/dev/component/draggable-sheet.html
 */
export interface DraggableSheetProps extends BaseProps {
  /** 初始时占父容器的比例 3.2.0 */
  initialChildSize?: number;
  /** 最小时占父容器的比例 3.2.0 */
  minChildSize?: number;
  /** 最大时占父容器的比例 3.2.0 */
  maxChildSize?: number;
  /** 拖拽后是否自动对齐关键点 3.2.0 */
  snap?: boolean;
  /** 拖拽后对齐的关键点，无需包含最小和最大值 3.2.0 */
  snapSizes?: number[];
  /** 尺寸发生变化时触发（仅支持 worklet 回调）event = {pixels, size} 3.2.0 */
  workletOnSizeUpdate?: (event: { pixels: number; size: number }) => void;
}

export const DraggableSheet: React.ComponentType<DraggableSheetProps> =
  createHostComponent<DraggableSheetProps>('draggable-sheet');

DraggableSheet.defaultProps = {
  initialChildSize: 0.5,
  minChildSize: 0.25,
  maxChildSize: 1.0,
  snap: false,
  snapSizes: [],
};
