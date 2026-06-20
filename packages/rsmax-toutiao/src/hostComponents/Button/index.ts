import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ButtonProps extends BaseProps {
  size?: 'default' | 'mini';
  type?: 'primary' | 'default' | 'warn';
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  formType?: 'submit' | 'reset';
  openType?: string;
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  hoverStopPropagation?: boolean;
  lang?: 'en' | 'zh_CN' | 'zh_TW';
  sessionFrom?: string;
  sendMessageTitle?: string;
  sendMessagePath?: string;
  sendMessageImg?: string;
  appParameter?: string;
  showMessageCard?: boolean;
  onClick?: (e: any) => void;
  onGetUserInfo?: (e: any) => void;
  onContact?: (e: any) => void;
  onGetPhoneNumber?: (e: any) => void;
  onError?: (e: any) => void;
  onOpenSetting?: (e: any) => void;
  onLaunchApp?: (e: any) => void;
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
