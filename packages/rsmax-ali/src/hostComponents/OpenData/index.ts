import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface OpenDataProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  openGid?: string;
  onError?: (e: any) => void;
}

export const OpenData = createHostComponent<OpenDataProps>('open-data') as React.ComponentType<OpenDataProps>;
