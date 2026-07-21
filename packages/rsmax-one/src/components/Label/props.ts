import * as React from 'react';

export interface LabelProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  for?: string;

  onTap?: (event: TouchEvent) => void;
}
