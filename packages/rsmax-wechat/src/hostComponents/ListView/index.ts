import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface ListViewProps extends BaseProps {
  /** 长度为4的数组，按 top、right、bottom、left 顺序指定内边距 (default: [0,0,0,0]) */
  padding?: number[];
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/list-view.html */
export const ListView: React.ComponentType<ListViewProps> = createHostComponent<ListViewProps>('list-view');

ListView.defaultProps = {
  padding: [0, 0, 0, 0],
};
