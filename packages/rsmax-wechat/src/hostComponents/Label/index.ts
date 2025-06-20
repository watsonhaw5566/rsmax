import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface LabelProps extends BaseProps {
  /** 绑定控件的 id 1.0.0 */
  for?: string;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/label.html
 */
export const Label: React.ComponentType<LabelProps> = createHostComponent<LabelProps>('label');
