import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface RadioGroupProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  onChange?: (e: any) => void;
  children?: React.ReactNode;
}

export const RadioGroup = createHostComponent<RadioGroupProps>('radio-group') as React.ComponentType<RadioGroupProps>;
