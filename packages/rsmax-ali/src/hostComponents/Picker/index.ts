import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface PickerProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  range?: string[] | any[];
  rangeKey?: string;
  value?: number;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
export const Picker = createHostComponent<PickerProps>('picker') as React.ComponentType<PickerProps>;
