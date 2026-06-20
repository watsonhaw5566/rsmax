import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface PayButtonProps extends BaseProps {
  /** 组件使用模式：1 - 已下单，2 - 未下单（立即抢购） */
  mode?: number;
  /** 商品 id，商品库商品传 spuid，非商品库传开发者订单系统商品号，课程库传 product_id 转成 string */
  goodsId?: string;
  /** 商品类别：1 - 商品库商品，2 - 非商品库商品（泛知识必须为 1） */
  goodsType?: number;
  /** 已下单(mode=1)下的订单状态：0 继续支付，1 申请退款，2 退款中，3 退款成功，4 退款失败 */
  orderStatus?: number;
  /** 开发者订单系统的交易订单号，继续支付或申请退款时必传 */
  orderId?: string;
  /** 退款单号，用于查看退款详情 */
  refundId?: string;
  /** 退款金额（单位：分），针对老订单申请退款时必传 */
  refundTotalAmount?: number;
  /** 业务线类型：1 - 团购，2 - 泛知识 */
  bizLine?: number;
  /** 是否已配置营销扩展点，true 才展示并计算营销优惠 */
  marketingReady?: boolean;
  /** 获取扩展路径，用于积分等营销场景 */
  onGetextensionpath?: (event: GenericEvent) => any;
  /** 获取商品信息，返回商品详情 */
  onGetgoodsinfo?: (event: GenericEvent) => any;
  /** 跳转提单页前的登录等准备工作 */
  onPlaceorder?: (event: GenericEvent) => any;
  /** 组件属性异常或内部异常时触发 */
  onError?: (event: GenericEvent) => any;
  /** 透传退款参数，用于申请退款 */
  onApplyrefund?: (event: GenericEvent) => any;
  /** 退款提交后的回调 */
  onRefund?: (event: GenericEvent) => any;
  /** 支付状态回调（继续支付 / 立即抢购成功后触发） */
  onPay?: (event: GenericEvent) => any;
}

/**
 * pay-button 交易按钮（已废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/trading-system/pay-button
 */
export const PayButton: React.ComponentType<PayButtonProps> = createHostComponent<PayButtonProps>('pay-button');

PayButton.defaultProps = {
  mode: 1,
  orderStatus: 0,
  bizLine: 1,
  marketingReady: false,
};
