import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

/**
 * aweme-data 直播间状态组件
 * 基础库 2.53.0 开始支持本组件。
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/aweme-data
 */
export interface AwemeDataProps extends BaseProps {
  /** 用户的抖音号，只支持小程序绑定的品牌号、合作号 */
  awemeId: string;
  /** 类型，可以选择头像或昵称 */
  type?: 'avatar' | 'nickname';
  /** 禁用默认行为。点击头像时，如果用户处于直播状态下默认会跳转到直播间，非直播状态下跳转到个人主页。如果为 true，点击头像时不会有默认行为。 */
  disableDefault?: boolean;
  /** 获取信息失败时显示的默认昵称文本 */
  defaultText?: string;
  /** 当错误发生时触发 */
  onError?: (event: any) => any;
  children?: React.ReactNode;
}

export const AwemeData: React.ComponentType<AwemeDataProps> = createHostComponent<AwemeDataProps>('aweme-data');

AwemeData.defaultProps = {
  type: 'avatar',
  disableDefault: false,
};
