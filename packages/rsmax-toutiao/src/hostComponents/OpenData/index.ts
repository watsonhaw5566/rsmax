import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

/**
 * open-data 开放数据
 * 基础库 2.30.0 开始支持本组件。
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/open-data
 */
export interface OpenDataProps extends BaseProps {
  /** 开放数据类型 */
  type: 'userNickName' | 'userAvatarUrl';
  /** 文本数据为空时的默认内容 */
  defaultText?: string;
  /** 出现错误时触发 */
  onError?: (event: any) => any;
  children?: React.ReactNode;
}

export const OpenData: React.ComponentType<OpenDataProps> = createHostComponent<OpenDataProps>('open-data');
