import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface FormProps extends BaseProps {
  onSubmit?: (e: any) => void;
  onReset?: (e: any) => void;
  reportSubmit?: boolean;
  catchSubmit?: (e: any) => void;
  catchReset?: (e: any) => void;
}

export const Form: React.ComponentType<FormProps> = createHostComponent<FormProps>('form');

Form.defaultProps = {
  reportSubmit: false,
};
