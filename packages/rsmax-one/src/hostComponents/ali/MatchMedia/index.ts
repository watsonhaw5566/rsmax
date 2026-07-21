import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

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
