import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface LabelProps extends BaseProps {
  for?: string;
}

export const Label: React.ComponentType<LabelProps> = createHostComponent<LabelProps>('label');
