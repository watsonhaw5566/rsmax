import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface CheckboxGroupProps extends BaseProps {
  name?: string;
  onChange?: (e: any) => void;
}

export const CheckboxGroup: React.ComponentType<CheckboxGroupProps> =
  createHostComponent<CheckboxGroupProps>('checkbox-group');
