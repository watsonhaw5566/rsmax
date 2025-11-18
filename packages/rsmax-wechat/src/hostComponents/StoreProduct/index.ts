import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

export interface StoreProductProps extends BaseProps {
  /** 小店appid 3.5.5 */
  appid?: string;
  /** 商品id 3.5.5 */
  productId?: string;
  /** 带货商品跟佣信息 3.5.5 */
  productPromotionLink?: string;
  /** 媒体文件id 3.7.1 */
  mediaId?: string;
  /** 自定义样式 3.7.1 */
  customStyle?: Record<string, string | number>;
  /** 开启自定义插槽 3.7.2 */
  customContent?: boolean;
  /** 设置点击打开的页面（同时开启 custom-content 后生效）3.7.4 */
  openPage?: 'product-detail' | 'gift-product-detail' | 'buy';
  /** 设置小店标识的位置（同时开启 custom-content 后生效）3.7.2 */
  logoPosition?: 'bottom-left' | 'bottom-right';
  /** 跳转小店成功的回调 3.7.1 */
  onEnterSuccess?: (event: GenericEvent) => void;
  /** 跳转小店失败的回调，event.detail={code,message} 3.7.1 */
  onEnterError?: (event: GenericEvent) => void;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/store-product.html
 */
export const StoreProduct: React.ComponentType<StoreProductProps> =
  createHostComponent<StoreProductProps>('store-product');

StoreProduct.defaultProps = {
  customContent: false,
  openPage: 'product-detail',
  logoPosition: 'bottom-left',
};
