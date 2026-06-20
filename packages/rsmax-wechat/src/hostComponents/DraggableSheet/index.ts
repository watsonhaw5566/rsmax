import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface DraggableSheetProps extends BaseProps {
  /** 初始状态下半屏占父容器的比例 (default: 0.5) */
  initialChildSize?: number;
  /** 半屏可拖拽至最小时占父容器的比例 (default: 0.25) */
  minChildSize?: number;
  /** 半屏可拖拽至最大时占父容器的比例 (default: 1.0) */
  maxChildSize?: number;
  /** 拖拽结束后是否自动吸附到最近的关键点 (default: false) */
  snap?: boolean;
  /** 拖拽后吸附的关键点数组，无需包含最小值和最大值 */
  snapSizes?: number[];
  /** 尺寸（半屏高度比例或像素值）发生变化时触发 */
  onSizeUpdate?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/draggable-sheet.html */
export const DraggableSheet: React.ComponentType<DraggableSheetProps> =
  createHostComponent<DraggableSheetProps>('draggable-sheet');

DraggableSheet.defaultProps = {
  initialChildSize: 0.5,
  minChildSize: 0.25,
  maxChildSize: 1.0,
  snap: false,
  snapSizes: [],
};
