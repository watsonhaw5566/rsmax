import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface FormProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  reportSubmit?: boolean;
  onSubmit?: (e: any) => void;
  onReset?: (e: any) => void;
  children?: React.ReactNode;
}

export const Form = createHostComponent<FormProps>('form') as React.ComponentType<FormProps>;
