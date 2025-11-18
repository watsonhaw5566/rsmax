import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

export interface StoreCouponProps extends BaseProps {
  /** 小店appid 3.8.3 */
  appid?: string;
  /** 优惠券id */
  couponId?: string;
  /** 自定义样式。支持的样式项参见 custom-style 说明 */
  customStyle?: Record<string, string | number>;
  /** 推客参数。用于机构推广券染色 3.8.11 */
  promoterShareLink?: string;
  /** 跳转小店成功的回调 */
  onEnterSuccess?: (event: GenericEvent) => void;
  /** 跳转小店失败的回调，event.detail={code,message} */
  onEnterError?: (event: GenericEvent) => void;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/store-coupon.html
 */
export const StoreCoupon: React.ComponentType<StoreCouponProps> = createHostComponent<StoreCouponProps>('store-coupon');
