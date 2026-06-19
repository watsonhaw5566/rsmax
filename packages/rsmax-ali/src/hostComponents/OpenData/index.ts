import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface OpenDataProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  openGid?: string;
  lang?: string;
  onError?: (e: any) => void;
  children?: React.ReactNode;
}

export const OpenData = createHostComponent<OpenDataProps>('open-data') as React.ComponentType<OpenDataProps>;
