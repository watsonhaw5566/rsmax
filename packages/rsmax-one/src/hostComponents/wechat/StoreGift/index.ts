import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface StoreGiftProps extends BaseProps {
  /** 礼物订单id */
  presentOrderId: string;
  /** 用户 openid */
  openId: string;
  /** 控制是否展示礼物卡片 (default: true) */
  showGiftCard?: boolean;
  /** 打开礼物成功的回调 */
  onSuccess?: (event: any) => any;
  /** 打开礼物失败的回调 */
  onError?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/store-gift.html */
export const StoreGift: React.ComponentType<StoreGiftProps> = createHostComponent<StoreGiftProps>('store-gift');

StoreGift.defaultProps = {
  showGiftCard: true,
};
