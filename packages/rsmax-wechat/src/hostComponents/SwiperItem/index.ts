import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface SwiperItemProps extends BaseProps {
  /** 该 swiper-item 的标识符 1.9.0 */
  itemId?: string;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/swiper-item.html
 */
export const SwiperItem: React.ComponentType<SwiperItemProps> = createHostComponent<SwiperItemProps>('swiper-item');
