import type React from 'react';

import { createHostComponent } from '@rsmax/runtime';

import type { BaseProps } from '../../types/component';

export interface PickerViewProps extends BaseProps {
  name?: string;
  value?: number[];
  indicatorStyle?: React.CSSProperties;
  indicatorClassName?: string;
  maskStyle?: string;
  maskClassName?: string;
  immediateChange?: boolean;
  onChange?: (e: any) => void;
  onPickStart?: (e: any) => void;
  onPickEnd?: (e: any) => void;
}

export const PickerView: React.ComponentType<PickerViewProps> = createHostComponent<PickerViewProps>('picker-view');
