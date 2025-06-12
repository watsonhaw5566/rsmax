import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

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
