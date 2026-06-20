import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface AwemeDataProps extends BaseProps {
  /** 用户的抖音号（仅限已绑定的小程序抖音企业机构号） */
  awemeId: string;
  /** 展示类型：头像或昵称 */
  type?: 'avatar' | 'nickname';
  /** 是否禁用头像点击的默认行为，为 true 时点击头像不会有任何跳转行为 */
  disableDefault?: boolean;
  /** 获取信息失败时显示的默认头像 URL */
  defaultAvatar?: string;
  /** 获取信息失败时显示的默认昵称文本 */
  defaultText?: string;
  /** 错误发生时触发 */
  onError?: (event: AwemeDataErrorEvent) => any;
}

export interface AwemeDataErrorEvent extends GenericEvent {
  /** 错误码 */
  errNo: number;
  /** 错误信息 */
  errMsg: string;
}

/**
 * aweme-data 抖音号数据组件
 * 用于展示抖音号的头像或昵称信息
 * 只支持小程序绑定的品牌号、合作号
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/aweme-data
 */
export const AwemeData: React.ComponentType<AwemeDataProps> = createHostComponent<AwemeDataProps>('aweme-data');

AwemeData.defaultProps = {
  type: 'avatar',
  disableDefault: false,
};
