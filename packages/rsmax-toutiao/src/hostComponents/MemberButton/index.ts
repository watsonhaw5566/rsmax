import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface MemberButtonProps extends BaseProps {
  /** 当前小程序绑定的抖音小店 id */
  shopId: string;
  /** 入会成功回调 */
  onSuccess?: (event: GenericEvent) => any;
  /** 用户主动退出回调 */
  onCancel?: (event: GenericEvent) => any;
  /** 入会失败回调 */
  onError?: (event: GenericEvent) => any;
}

/**
 * member-button 开通会员按钮（已废弃）
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/industry/e-commerce/member-button
 */
export const MemberButton: React.ComponentType<MemberButtonProps> =
  createHostComponent<MemberButtonProps>('member-button');
