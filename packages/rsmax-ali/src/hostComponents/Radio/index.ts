import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface RadioProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

export const Radio = createHostComponent<RadioProps>('radio') as React.ComponentType<RadioProps>;
