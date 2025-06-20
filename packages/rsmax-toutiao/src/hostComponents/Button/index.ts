import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ButtonProps extends BaseProps {
  size?: 'default' | 'mini';
  type?: 'primary' | 'default';
  disabled?: boolean;
  loading?: boolean;
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  hoverStopPropagation?: boolean;
  formType?: 'submit' | 'reset';
  openType?: 'share' | 'getPhoneNumber';
  onClick?: (e: any) => void;
  onGetPhoneNumber?: (e: any) => void;
  children?: React.ReactNode;
}

export const Button: React.ComponentType<ButtonProps> = createHostComponent<ButtonProps>('button');

Button.defaultProps = {
  size: 'default',
  type: 'default',
  disabled: false,
  loading: false,
  hoverClassName: 'button-hover',
  hoverStartTime: 20,
  hoverStayTime: 70,
  hoverStopPropagation: false,
};
