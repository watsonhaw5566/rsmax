import * as React from 'react';

export interface ViewProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  hidden?: boolean;
  dataSet?: Record<string, string>;

  onTap?: (event: TouchEvent) => void;
  onLongTap?: (event: TouchEvent) => void;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchCancel?: (event: TouchEvent) => void;

  hoverClass?: string;
  hoverStopPropagation?: boolean;
  hoverStartTime?: number;
  hoverStayTime?: number;

  activeClass?: string;
  activeStyle?: React.CSSProperties;

  hoverClassName?: string;
}
