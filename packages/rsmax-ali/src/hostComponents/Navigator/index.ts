import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface NavigatorProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  openType?: 'navigate' | 'redirect' | 'switchTab' | 'navigateBack' | 'reLaunch';
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  hoverStopPropagation?: boolean;
  url: string;
  target?: 'self' | 'mini';
  delta?: number;
  children?: React.ReactNode;
}

export const Navigator = createHostComponent<NavigatorProps>('navigator') as React.ComponentType<NavigatorProps>;
