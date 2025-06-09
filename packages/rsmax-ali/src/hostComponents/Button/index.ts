import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface ButtonProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  size?: 'default' | 'mini';
  type?: 'primary' | 'default' | 'warn';
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  hoverStopPropagation?: boolean;
  formType?: 'submit' | 'reset';
  openType?: 'share' | 'getAuthorize' | 'contactShare' | 'lifestyle' | 'chooseAvatar';
  scope?: 'phoneNumber' | 'userInfo';
  appParameter?: string;
  publicId?: string;
  onTap?: (e: any) => void;
  onClick?: (e: any) => void;
  onGetAuthorize?: (e: any) => void;
  onChooseAvatar?: (e: any) => void;
  onError?: (e: any) => void;
  children?: React.ReactNode;
}

export const Button = createHostComponent<ButtonProps>('button') as React.ComponentType<ButtonProps>;
