import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

export interface RadioGroupProps extends BaseProps {
  name?: string;
  onChange?: (e: any) => void;
}

export const RadioGroup: React.ComponentType<RadioGroupProps> = createHostComponent<RadioGroupProps>('radio-group');
