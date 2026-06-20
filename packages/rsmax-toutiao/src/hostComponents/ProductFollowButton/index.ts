import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface ProductFollowButtonProps extends BaseProps {
  /** 店铺 ID */
  shopId: string;
  /** 商品 ID */
  productId: string;
  /** 按钮是否显示 */
  hidden?: boolean;
  /** 按钮是否禁用 */
  disabled?: boolean;
  /** 是否关闭默认样式 */
  noStyle?: boolean;
  /** 按钮大小：default、mini */
  size?: string;
  /** 已收藏状态下的按钮文案 */
  followedText?: string;
  /** 未收藏状态下的按钮文案 */
  unfollowedText?: string;
  /** 商品收藏成功时触发 */
  onFollowed?: (event: GenericEvent) => any;
  /** 商品取消收藏成功时触发 */
  onUnfollowed?: (event: GenericEvent) => any;
  /** 组件发生错误时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * product-follow-button 商品收藏按钮（即将废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/e-commerce/product-follow-button
 */
export const ProductFollowButton: React.ComponentType<ProductFollowButtonProps> =
  createHostComponent<ProductFollowButtonProps>('product-follow-button');

ProductFollowButton.defaultProps = {
  hidden: false,
  disabled: false,
  noStyle: false,
  size: 'mini',
  followedText: '已收藏',
  unfollowedText: '收藏',
};
