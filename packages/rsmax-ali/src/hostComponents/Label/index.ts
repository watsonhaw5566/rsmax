import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface LabelProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  for?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  children?: React.ReactNode;
}

export const Label = createHostComponent<LabelProps>('label') as React.ComponentType<LabelProps>;
