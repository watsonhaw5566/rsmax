import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface CheckboxProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  controlled?: boolean;
  onChange?: (e: any) => void;
}

export const Checkbox = createHostComponent<CheckboxProps>('checkbox') as React.ComponentType<CheckboxProps>;
