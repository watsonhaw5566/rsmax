import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface OpenDataItemProps extends BaseProps {
  /** 开放数据类型：userNickName - 用户昵称；userAvatar - 用户头像 */
  type: 'userNickName' | 'userAvatar';
  /** 用于指定数据项的序号（需配合 open-data-list 使用） */
  index: number;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/open-data-item.html */
export const OpenDataItem: React.ComponentType<OpenDataItemProps> =
  createHostComponent<OpenDataItemProps>('open-data-item');
