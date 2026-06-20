import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ProgressProps extends BaseProps {
  percent?: number;
  strokeWidth?: number;
  activeColor?: string;
  backgroundColor?: string;
  active?: boolean;
  activeMode?: string;
  duration?: number;
  onActiveEnd?: (e: any) => void;
}

export const Progress: React.ComponentType<ProgressProps> = createHostComponent<ProgressProps>('progress');

Progress.defaultProps = {
  percent: 0,
  strokeWidth: 6,
  activeColor: '#F85959',
  backgroundColor: '#EBEBEB',
  active: false,
  activeMode: 'backwards',
  duration: 30,
};
