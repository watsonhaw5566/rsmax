import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface SwiperItemProps extends BaseProps {
  itemId?: string;
}

export const SwiperItem: React.ComponentType<SwiperItemProps> = createHostComponent<SwiperItemProps>('swiper-item');
