import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface ProgressProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  percent?: number;
  showInfo?: boolean;
  strokeWidth?: string;
  activeColor?: string;
  backgroundColor?: string;
  active?: boolean;
  borderRadius?: string | number;
  duration?: number;
  onActiveEnd?: (e: any) => void;
}

export const Progress = createHostComponent<ProgressProps>('progress') as React.ComponentType<ProgressProps>;
