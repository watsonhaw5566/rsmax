import * as React from 'react';

export type NavigatorOpenType = 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'navigateBack';

export interface NavigatorProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  url?: string;
  openType?: NavigatorOpenType;
  delta?: number;
  hoverClass?: string;
  hoverStopPropagation?: boolean;
  hoverStartTime?: number;
  hoverStayTime?: number;

  onTap?: (event: TouchEvent) => void;
}
