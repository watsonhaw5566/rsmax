import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

export interface StoreGiftProps extends BaseProps {
  /** 礼物订单id 3.8.10 */
  presentOrderId?: string;
  /** 用户openid 3.8.10 */
  openId?: string;
  /** 是否展示礼物卡片，默认展示 3.8.10 */
  showGiftCard?: boolean;
  /** 打开礼物成功的回调，event.detail={code,message} */
  onSuccess?: (event: GenericEvent) => void;
  /** 打开礼物失败的回调，event.detail={code,message} */
  onError?: (event: GenericEvent) => void;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/store-gift.html
 */
export const StoreGift: React.ComponentType<StoreGiftProps> = createHostComponent<StoreGiftProps>('store-gift');

StoreGift.defaultProps = {
  showGiftCard: true,
};
