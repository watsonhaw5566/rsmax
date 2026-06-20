import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface SkuButtonProps extends BaseProps {
  /** 店铺 ID */
  shopId: string;
  /** 商品 ID */
  productId: string;
  /** 规格选择后的行为：1 - 加购，2 - 立购 */
  actionType?: number;
  /** 按钮是否显示 */
  hidden?: boolean;
  /** 按钮是否禁用 */
  disabled?: boolean;
  /** 是否关闭默认样式 */
  noStyle?: boolean;
  /** 按钮大小：default、mini */
  size?: string;
  /** 按钮样式类型：default、primary */
  type?: string;
  /** 按钮文案 */
  text?: string;
  /** 规格选择面板打开成功回调 */
  onSuccess?: (event: GenericEvent) => any;
  /** 组件发生错误回调 */
  onError?: (event: GenericEvent) => any;
}

/**
 * sku-button 商品规格选择按钮（即将废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/e-commerce/sku-button
 */
export const SkuButton: React.ComponentType<SkuButtonProps> = createHostComponent<SkuButtonProps>('sku-button');

SkuButton.defaultProps = {
  actionType: 2,
  hidden: false,
  disabled: false,
  noStyle: false,
  size: 'default',
  type: 'primary',
};
