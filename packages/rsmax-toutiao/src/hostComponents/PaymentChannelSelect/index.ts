import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

/** 用户选择的商品信息 */
export interface SkuListItem {
  /** 外部商品 id */
  skuId: string;
  /** 商品价格，scene=cash 时单位为分，scene=diamond 时单位为钻石数量 */
  price: number;
  /** 商品标题 */
  title: string;
  /** 商品类型 */
  type: number;
  /** 标签组 id */
  tagGroupId: string;
}

/** 自定义样式 */
export interface PaymentCustomStyle {
  /** 组件背景颜色 */
  backgroundColor?: string;
  /** 组件文字大小 */
  fontSize?: string;
  /** 重试文字颜色 */
  retryTextColor?: string;
  /** 支付按钮背景颜色 */
  buttonBackgroundColor?: string;
  /** 支付按钮文字颜色 */
  buttonColor?: string;
  /** 支付方式栏样式 */
  payChannelCell?: {
    titleColor?: string;
    textColor?: string;
  };
  /** 交易保障栏样式 */
  payTagCell?: {
    titleColor?: string;
    textColor?: string;
  };
  /** 支付优惠栏样式 */
  payDiscountCell?: {
    titleColor?: string;
    textColor?: string;
  };
}

export interface PaymentChannelSelectProps extends BaseProps {
  /** 支付场景：cash - 现金，diamond - 钻石（iOS 必传 diamond） */
  scene?: string;
  /** 用户选择的商品信息，目前仅支持传入一项 */
  skuList: SkuListItem[];
  /** 开发者自定义收款商户号 */
  merchantUid?: string;
  /** 以订单维度屏蔽支付方式，[1,2] 屏蔽微信和支付宝。scene=diamond 时无效 */
  limitPayWayList?: number[];
  /** 自定义样式 */
  customStyle?: PaymentCustomStyle;
  /** 用户点击"立即支付"时触发，需返回 Promise */
  onRequestorder?: (event: GenericEvent) => any;
  /** 支付结果回调 */
  onGetpaymentresult?: (event: GenericEvent) => any;
  /** 组件属性异常或内部异常时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * payment-channel-select 前置支付组件
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/trading-system/payment-channel-select
 */
export const PaymentChannelSelect: React.ComponentType<PaymentChannelSelectProps> =
  createHostComponent<PaymentChannelSelectProps>('payment-channel-select');

PaymentChannelSelect.defaultProps = {
  scene: 'cash',
};
