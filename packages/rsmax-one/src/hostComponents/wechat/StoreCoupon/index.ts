import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface StoreCouponProps extends BaseProps {
  /** 小店 appid */
  appid: string;
  /** 优惠券 id */
  couponId: string;
  /** 自定义样式 */
  customStyle?: Record<string, Record<string, string>>;
  /** 推客参数，用于机构推广券类型 */
  promoterShareLink?: string;
  /** 跳转小店成功的回调 */
  onEnterSuccess?: (event: any) => any;
  /** 跳转小店失败的回调 */
  onEnterError?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/store-coupon.html */
export const StoreCoupon: React.ComponentType<StoreCouponProps> = createHostComponent<StoreCouponProps>('store-coupon');
