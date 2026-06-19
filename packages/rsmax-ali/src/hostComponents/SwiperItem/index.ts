import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface SwiperItemProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  key: string;
  children?: React.ReactNode;
}

export const SwiperItem = createHostComponent<SwiperItemProps>('swiper-item') as React.ComponentType<SwiperItemProps>;
