import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface PickerProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  range?: string[] | any[];
  rangeKey?: string;
  value?: number;
  disabled?: boolean;
  type?: 'selector' | 'time' | 'date' | 'multiSelector';
  start?: string;
  end?: string;
  selectedColor?: string;
  onChange?: (e: any) => void;
  children?: React.ReactNode;
}
export const Picker = createHostComponent<PickerProps>('picker') as React.ComponentType<PickerProps>;
