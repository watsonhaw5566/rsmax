import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface OpenDataListProps extends BaseProps {
  /** 开放数据类型，当前仅支持 groupMembers（群成员信息） */
  type: 'groupMembers';
  /** 群成员的 group_openid 列表，仅在 type="groupMembers" 时需要提供 */
  members?: string[];
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/open-data-list.html */
export const OpenDataList: React.ComponentType<OpenDataListProps> =
  createHostComponent<OpenDataListProps>('open-data-list');
