import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface RateButtonProps extends BaseProps {
  /** 开发者订单 ID，交易类小程序必填 */
  orderId?: string;
  /** 评价类型：transaction - 交易类小程序，normal - 非交易类小程序 */
  rateType?: string;
  /** 非交易类小程序的评价按钮文案 */
  normalRateText?: string;
  /** 按钮初始化完成时触发 */
  onInit?: (event: GenericEvent) => any;
  /** 从评价页面返回且已评价时触发 */
  onSuccess?: (event: GenericEvent) => any;
  /** 组件内部失败回调 */
  onError?: (event: GenericEvent) => any;
}

/**
 * rate-button 评价按钮
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/evolution/rate-button
 */
export const RateButton: React.ComponentType<RateButtonProps> = createHostComponent<RateButtonProps>('rate-button');

RateButton.defaultProps = {
  rateType: 'transaction',
};
