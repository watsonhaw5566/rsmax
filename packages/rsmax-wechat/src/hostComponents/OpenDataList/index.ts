import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 开放数据列表
 * https://developers.weixin.qq.com/miniprogram/dev/component/open-data-list.html
 */
export interface OpenDataListProps extends BaseProps {
  /** 开放数据类型，如 groupMembers */
  type: string;
  /** 群成员 group_openid 列表 */
  members?: string[];
}

export const OpenDataList: React.ComponentType<OpenDataListProps> =
  createHostComponent<OpenDataListProps>('open-data-list');
