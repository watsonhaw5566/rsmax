import * as React from 'react';

export interface TextProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  selectable?: boolean;
  space?: 'nbsp' | 'ensp' | 'emsp';
  decode?: boolean;

  onTap?: (event: TouchEvent) => void;
  onLongTap?: (event: TouchEvent) => void;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchCancel?: (event: TouchEvent) => void;
}
