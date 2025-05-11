import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface CheckboxGroupProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  name?: string;
  onChange?: (e: any) => void;
}

export const CheckboxGroup = createHostComponent<CheckboxGroupProps>(
  'checkbox-group'
) as React.ComponentType<CheckboxGroupProps>;
