import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface ShopFollowCardProps extends BaseProps {
  /** 店铺 ID */
  shopId: string;
  /** 卡片是否显示 */
  hidden?: boolean;
  /** 店铺关注成功时触发 */
  onFollowed?: (event: GenericEvent) => any;
  /** 店铺取消关注成功时触发 */
  onUnfollowed?: (event: GenericEvent) => any;
  /** 组件发生错误时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * shop-follow-card 店铺关注卡片（即将废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/e-commerce/shop-follow-card
 */
export const ShopFollowCard: React.ComponentType<ShopFollowCardProps> =
  createHostComponent<ShopFollowCardProps>('shop-follow-card');

ShopFollowCard.defaultProps = {
  hidden: false,
};
