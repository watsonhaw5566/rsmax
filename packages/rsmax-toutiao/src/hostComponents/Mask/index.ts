import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface MaskProps extends BaseProps {
  hidden?: boolean;
  children?: React.ReactNode;
}

/**
 * mask 蒙层
 * 基础库 1.0.0 开始支持本组件。
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/view-container/mask
 */
export const Mask: React.ComponentType<MaskProps> = createHostComponent<MaskProps>('mask');

Mask.defaultProps = {
  hidden: false,
};
