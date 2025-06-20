import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

/**
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/view-container/movable-area
 * 基础库 2.25.0 开始支持本组件。
 */
export interface MovableAreaProps extends BaseProps {
  // 当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area,默认:false
  scaleArea?: boolean;
}

export const MovableArea: React.ComponentType<MovableAreaProps> = createHostComponent<MovableAreaProps>('movable-area');

MovableArea.defaultProps = {
  scaleArea: false,
};
