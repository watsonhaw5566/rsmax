import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface NavigatorProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  openType?: 'navigate' | 'redirect' | 'switchTab' | 'navigateBack' | 'reLaunch';
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  url: string;
}

export const Navigator = createHostComponent<NavigatorProps>('navigator') as React.ComponentType<NavigatorProps>;
