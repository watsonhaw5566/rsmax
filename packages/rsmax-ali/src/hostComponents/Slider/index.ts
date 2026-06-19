import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface SliderProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  value?: number;
  showValue?: boolean;
  activeColor?: string;
  backgroundColor?: string;
  trackSize?: number;
  handleSize?: number;
  handleColor?: string;
  controlled?: boolean;
  onChange?: (e: any) => void;
  onChanging?: (e: any) => void;
}

export const Slider = createHostComponent<SliderProps>('slider') as React.ComponentType<SliderProps>;
