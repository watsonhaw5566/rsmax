import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface FormProps {
  readonly dataset?: DOMStringMap;
  className?: string;
  style?: React.CSSProperties;
  reportSubmit?: boolean;
  onSubmit?: (e: any) => void;
  onReset?: (e: any) => void;
}

export const Form = createHostComponent<FormProps>('form') as React.ComponentType<FormProps>;
