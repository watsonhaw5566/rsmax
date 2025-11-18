import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 列表容器，仅 Skyline 支持
 * https://developers.weixin.qq.com/miniprogram/dev/component/list-view.html
 */
export interface ListViewProps extends BaseProps {
  /** 内边距，按 top、right、bottom、left 顺序 3.0.0 */
  padding?: [number, number, number, number];
}

export const ListView: React.ComponentType<ListViewProps> = createHostComponent<ListViewProps>('list-view');

ListView.defaultProps = {
  padding: [0, 0, 0, 0],
};
