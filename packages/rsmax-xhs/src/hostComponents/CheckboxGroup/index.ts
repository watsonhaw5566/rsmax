import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

export interface CheckboxGroupProps extends BaseProps {
  name?: string;
  onChange?: (e: any) => void;
}

export const CheckboxGroup: React.ComponentType<CheckboxGroupProps> =
  createHostComponent<CheckboxGroupProps>('checkbox-group');
