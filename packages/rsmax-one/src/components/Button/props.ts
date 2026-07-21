import * as React from 'react';

export type ButtonType = 'primary' | 'default' | 'warn';
export type ButtonSize = 'default' | 'mini';
export type ButtonFormType = 'submit' | 'reset';
export type ButtonOpenType =
  | 'navigate'
  | 'redirect'
  | 'switchTab'
  | 'reLaunch'
  | 'navigateBack'
  | 'share'
  | 'getUserInfo'
  | 'getPhoneNumber'
  | 'launchApp'
  | 'openSetting';

export interface ButtonProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  formType?: ButtonFormType;
  openType?: ButtonOpenType;
  hoverClass?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;

  onTap?: (event: TouchEvent) => void;
  onLongTap?: (event: TouchEvent) => void;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchCancel?: (event: TouchEvent) => void;
}
