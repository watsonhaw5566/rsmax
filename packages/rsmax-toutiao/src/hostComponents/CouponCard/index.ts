import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

/** 按钮选项 */
export interface CouponButtonOptions {
  /** 未领取状态下按钮文字 */
  unappliedText?: string;
  /** 已领取状态下按钮文字 */
  appliedText?: string;
  /** 已过期状态下按钮文字 */
  expiredText?: string;
  /** 已使用状态下按钮文字 */
  usedText?: string;
  /** 激活状态按钮背景色 */
  activeBackgroundColor?: string;
  /** 激活状态按钮文字颜色 */
  activeColor?: string;
  /** 未激活状态按钮背景色 */
  disableBackgroundColor?: string;
  /** 未激活状态按钮文字颜色 */
  disableColor?: string;
}

/** 弹窗选项 */
export interface CouponModalOptions {
  /** Modal 标题 */
  title?: string;
  /** Modal 内容 */
  content?: string;
  /** 确认按钮文字 */
  confirmText?: string;
  /** 确认按钮文字颜色 */
  confirmColor?: string;
  /** 是否展示返回按钮 */
  showCancel?: boolean;
  /** 返回按钮文字 */
  cancelText?: string;
  /** 返回按钮文字颜色 */
  cancelColor?: string;
}

export interface CouponCardProps extends BaseProps {
  /** 当前小程序绑定的抖音小店 id */
  shopId: string;
  /** 优惠券 id */
  couponId: string;
  /** 是否只展示 button */
  isShowButtonOnly?: boolean;
  /** 优惠券标题 */
  title?: string;
  /** 优惠券副标题 */
  subTitle?: string;
  /** 按钮选项 */
  buttonOptions?: CouponButtonOptions;
  /** 优惠券卡片图片 URL */
  imgUrl?: string;
  /** 点击领取时弹窗的选项 */
  modalOptions?: CouponModalOptions;
  /** 默认是否展示优惠券卡片中具体的优惠券信息 */
  isShowCouponInfo?: boolean;
  /** 错误回调 */
  onError?: (event: GenericEvent) => any;
}

/**
 * coupon-card 优惠券卡片（即将废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/e-commerce/coupon-card
 */
export const CouponCard: React.ComponentType<CouponCardProps> = createHostComponent<CouponCardProps>('coupon-card');

CouponCard.defaultProps = {
  isShowButtonOnly: false,
  title: '专享优惠券',
  subTitle: '领取后前往店铺使用',
  imgUrl: 'https://lf3-cm.ecombdstatic.com/obj/ecom-ecop/1688986275d1c1cf2dc8858aacd228074e918d5dbe9301dad7.png',
  isShowCouponInfo: false,
};
