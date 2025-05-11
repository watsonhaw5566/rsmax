import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

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
