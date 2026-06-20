import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface StoreProductProps extends BaseProps {
  /** 小店 appid */
  appid: string;
  /** 商品 id */
  productId: string;
  /** 带货商品跟佣信息 */
  productPromotionLink?: string;
  /** 媒体文件 id */
  mediaId?: string;
  /** 自定义样式 */
  customStyle?: Record<string, Record<string, string>>;
  /** 开启自定义插槽 (default: false) */
  customContent?: boolean;
  /** 设置点击打开的页面 (default: product-detail) */
  openPage?: 'product-detail' | 'gift-product-detail' | 'buy' | 'gift';
  /** 设置小店标识位置 (default: bottom-left) */
  logoPosition?: 'bottom-left' | 'bottom-right';
  /** 跳转小店成功的回调 */
  onEnterSuccess?: (event: any) => any;
  /** 跳转小店失败的回调 */
  onEnterError?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/store-product.html */
export const StoreProduct: React.ComponentType<StoreProductProps> =
  createHostComponent<StoreProductProps>('store-product');

StoreProduct.defaultProps = {
  customContent: false,
  openPage: 'product-detail',
  logoPosition: 'bottom-left',
};
