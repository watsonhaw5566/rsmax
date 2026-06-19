import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface PickerViewColumnProps {
  readonly dataset?: DOMStringMap;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const PickerViewColumn = createHostComponent<PickerViewColumnProps>(
  'picker-view-column'
) as React.ComponentType<PickerViewColumnProps>;
