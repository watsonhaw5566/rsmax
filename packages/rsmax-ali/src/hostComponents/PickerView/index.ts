import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface PickerViewProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  value?: number[];
  indicatorStyle?: React.CSSProperties;
  indicatorClassName?: string;
  maskStyle?: React.CSSProperties;
  maskClassName?: string;
  onChange?: (e: any) => void;
}

export const PickerView = createHostComponent<PickerViewProps>('picker-view') as React.ComponentType<PickerViewProps>;
