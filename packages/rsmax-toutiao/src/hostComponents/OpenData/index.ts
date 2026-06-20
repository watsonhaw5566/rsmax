import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface OpenDataProps extends BaseProps {
  /** 开放数据类型 */
  type?: 'userNickName' | 'userAvatarUrl' | 'userGender' | 'userCity' | 'userProvince' | 'userCountry';
  /** 数据为空时的默认文案 */
  defaultText?: string;
  /** 用户头像为空时的默认图片，支持相对路径和网络图片路径 */
  defaultAvatar?: string;
  /** 当数据为空且未设置默认值时，是否显示官方默认值 */
  useEmptyValue?: boolean;
  /** 出现错误时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * open-data 开放数据
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/open-data
 */
export const OpenData: React.ComponentType<OpenDataProps> = createHostComponent<OpenDataProps>('open-data');
