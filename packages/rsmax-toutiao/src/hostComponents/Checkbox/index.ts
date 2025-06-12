import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface CheckboxProps extends BaseProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  color?: string;
}

export const Checkbox: React.ComponentType<CheckboxProps> = createHostComponent<CheckboxProps>('checkbox');

Checkbox.defaultProps = {
  disabled: false,
  checked: false,
};
