import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ProgressProps extends BaseProps {
  percent?: number;
  strokeWidth?: number;
  color?: string;
  activeColor?: string;
  backgroundColor?: string;
  active?: boolean;
  activeMode?: string;
  duration?: number;
}

export const Progress: React.ComponentType<ProgressProps> = createHostComponent<ProgressProps>('progress');

Progress.defaultProps = {
  percent: 0,
  strokeWidth: 6,
  color: '#F85959',
  activeColor: '#F85959',
  backgroundColor: '#EBEBEB',
  active: false,
  activeMode: 'backwards',
};
