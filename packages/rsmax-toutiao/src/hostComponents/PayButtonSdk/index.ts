import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

/** 费用明细信息 */
export interface FeeDetailsInfo {
  /** 费用类型：1 - 配送费，2 - 包装费，18 - 基建费，19 - 燃油费，20 - 税费 */
  feeType: number;
  /** 费用总金额（单位：分） */
  feeAmount: number;
  /** 费用总优惠金额 */
  feeDiscountAmount?: number;
  /** 费用描述 */
  feeDesc?: string;
}

export interface PayButtonSdkProps extends BaseProps {
  /** 组件使用模式：1 - 已下单，2 - 未下单（立即抢购） */
  mode?: number;
  /** 商品 id */
  goodsId?: string;
  /** 商品类别：1 - 商品库商品，2 - 非商品库商品 */
  goodsType?: number;
  /** 已下单(order-status)下的订单状态：0 继续支付，1 申请退款，2 退款中，3 退款成功，4 退款失败 */
  orderStatus?: number;
  /** 开发者订单系统交易订单号，order-status=0 或 1 时必传 */
  orderId?: string;
  /** 开发者退款单号，order-status=2/3/4 时必传 */
  refundId?: string;
  /** 退款金额（单位：分），针对交易系统老订单申请退款时必传 */
  refundTotalAmount?: number;
  /** 业务线类型：1 - 团购，2 - 泛知识 */
  bizLine?: number;
  /** 费用明细列表（如打包费、配送费、基建费、燃油费、税费） */
  feeDetailsList?: FeeDetailsInfo[];
  /** 是否配置了营销扩展点 */
  marketingReady?: boolean;
  /** 获取扩展路径 */
  onGetextensionpath?: (event: GenericEvent) => any;
  /** 获取商品信息回调，mode=2 时必传 */
  onGetgoodsinfo?: (event: GenericEvent) => any;
  /** 跳转至提单页前的准备，mode=2 时必传 */
  onPlaceorder?: (event: GenericEvent) => any;
  /** 组件内部异常或属性异常时触发 */
  onError?: (event: GenericEvent) => any;
  /** 透传退款参数 */
  onApplyrefund?: (event: GenericEvent) => any;
  /** 退款回调 */
  onRefund?: (event: GenericEvent) => any;
  /** 支付回调 */
  onPay?: (event: GenericEvent) => any;
}

/**
 * pay-button-sdk 交易按钮（行业 SDK）（即将废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/trading-system/pay-button-sdk
 */
export const PayButtonSdk: React.ComponentType<PayButtonSdkProps> =
  createHostComponent<PayButtonSdkProps>('pay-button-sdk');

PayButtonSdk.defaultProps = {
  mode: 1,
  orderStatus: 0,
  bizLine: 1,
  marketingReady: false,
};
