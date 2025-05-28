import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

export interface LabelProps extends BaseProps {
  for?: string;
}

export const Label: React.ComponentType<LabelProps> = createHostComponent<LabelProps>('label');
