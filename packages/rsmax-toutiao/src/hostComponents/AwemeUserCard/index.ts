import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface AwemeUserCardProps extends BaseProps {
  /** 引导关注的抖音号，只支持小程序绑定的品牌号、员工号 */
  awemeId: string;
  /** 组件宽度（单位：rpx），最小值 544，最大值 750 */
  width?: number;
  /** 组件高度（单位：rpx），最小值 96，最大值 288 */
  height?: number;
  /** 组件左右 padding（单位：rpx），最大值 96，最小值 0 */
  leftRightPadding?: number;
  /** 组件是否为 fixed 布局 */
  fixed?: boolean;
  /** 组件出现错误时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * aweme-user-card 一键关注抖音号
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/aweme-user-card
 */
export const AwemeUserCard: React.ComponentType<AwemeUserCardProps> =
  createHostComponent<AwemeUserCardProps>('aweme-user-card');

AwemeUserCard.defaultProps = {
  width: 504,
  height: 144,
  leftRightPadding: 32,
  fixed: false,
};
