import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * 开放数据子项，需要搭配 open-data-list 使用
 * https://developers.weixin.qq.com/miniprogram/dev/component/open-data-item.html
 */
export interface OpenDataItemProps extends BaseProps {}

export const OpenDataItem: React.ComponentType<OpenDataItemProps> =
  createHostComponent<OpenDataItemProps>('open-data-item');
