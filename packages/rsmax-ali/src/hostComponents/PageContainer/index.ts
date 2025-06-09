import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface PageContainerProps {
  /** 是否显示容器组件 */
  show?: boolean;
  /** 动画时长，单位毫秒 */
  duration?: number;
  /** z-index 层级 */
  zIndex?: number;
  /** 是否显示遮罩层 */
  overlay?: boolean;
  /** 弹出位置，可选值为 top bottom right center */
  position?: 'top' | 'bottom' | 'right' | 'center';
  /** 是否显示圆角 */
  round?: boolean;
  /** 是否在下滑一段距离后关闭 */
  closeOnSlideDown?: boolean;
  /** 自定义遮罩层样式 */
  overlayStyle?: string;
  /** 自定义弹出层样式 */
  customStyle?: string;
  /** 进入前触发 */
  onBeforeEnter?: (e: any) => void;
  /** 进入中触发  */
  onEnter?: (e: any) => void;
  /** 进入后触发  */
  onAfterEnter?: (e: any) => void;
  /** 离开前触发  */
  onBeforeLeave?: (e: any) => void;
  /** 离开中触发  */
  onLeave?: (e: any) => void;
  /** 离开被打断时触发 */
  onLeaveCancelled?: (e: any) => void;
  /** 离开后触发  */
  onAfterLeave?: (e: any) => void;
  /** 点击遮罩层触发 */
  onClickOverlay?: (e: any) => void;
  children?: React.ReactNode;
}
/**
 * @see https://opendocs.alipay.com/mini/04ne6j?pathHash=699942d6
 */
export const PageContainer: React.ComponentType<PageContainerProps> =
  createHostComponent<PageContainerProps>('page-container');

PageContainer.defaultProps = {
  show: false,
  duration: 300,
  zIndex: 100,
  overlay: true,
  position: 'bottom',
  round: false,
  closeOnSlideDown: false,
};
