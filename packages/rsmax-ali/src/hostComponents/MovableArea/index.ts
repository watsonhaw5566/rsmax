import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface MovableAreaProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export const MovableArea = createHostComponent<MovableAreaProps>(
  'movable-area'
) as React.ComponentType<MovableAreaProps>;
