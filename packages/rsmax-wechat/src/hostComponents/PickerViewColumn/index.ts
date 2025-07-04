import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export type PickerViewColumnProps = BaseProps;

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/picker-view-column.html
 */
export const PickerViewColumn: React.ComponentType<PickerViewColumnProps> =
  createHostComponent<PickerViewColumnProps>('picker-view-column');
