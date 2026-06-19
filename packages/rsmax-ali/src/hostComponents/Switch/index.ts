import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface SwitchProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  checkedColor?: string;
  uncheckedColor?: string;
  controlled?: boolean;
  onChange?: (e: any) => void;
  children?: React.ReactNode;
}

export const Switch = createHostComponent<SwitchProps>('switch') as React.ComponentType<SwitchProps>;
