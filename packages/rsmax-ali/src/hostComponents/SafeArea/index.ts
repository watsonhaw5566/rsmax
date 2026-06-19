import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface SafeAreaProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const SafeArea = createHostComponent<SafeAreaProps>('safe-area') as React.ComponentType<SafeAreaProps>;
