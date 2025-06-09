import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface MatchMediaProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  height?: number;
  orientation?: 'landscape' | 'portrait';
  children?: React.ReactNode;
}

export const MatchMedia = createHostComponent<MatchMediaProps>('match-media') as React.ComponentType<MatchMediaProps>;
