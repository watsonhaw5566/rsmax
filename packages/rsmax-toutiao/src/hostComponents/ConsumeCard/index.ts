import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface ConsumeCardProps extends BaseProps {
  /** 开发者系统订单号 outOrderNo */
  orderId: string;
  /** 核销订单后触发 */
  onConsume?: (event: GenericEvent) => any;
  /** 申请退款时触发 */
  onRefund?: (event: GenericEvent) => any;
  /** 点击申请退款时触发 */
  onApplyrefund?: (event: GenericEvent) => any;
  /** 错误发生时的回调 */
  onError?: (event: GenericEvent) => any;
}

/**
 * consume-card 抖音码核销
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/trading-system/consume-card
 */
export const ConsumeCard: React.ComponentType<ConsumeCardProps> = createHostComponent<ConsumeCardProps>('consume-card');
