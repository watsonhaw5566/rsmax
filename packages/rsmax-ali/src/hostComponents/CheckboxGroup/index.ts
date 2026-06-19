import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface CheckboxGroupProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  onChange?: (e: any) => void;
  children?: React.ReactNode;
}

export const CheckboxGroup = createHostComponent<CheckboxGroupProps>(
  'checkbox-group'
) as React.ComponentType<CheckboxGroupProps>;
