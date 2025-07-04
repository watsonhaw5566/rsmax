import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface InputProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  name?: string;
  type?: string;
  password?: boolean;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  placeholderClassName?: string;
  disabled?: boolean;
  maxlength?: number;
  focus?: boolean;
  confirmType?: 'done' | 'go' | 'next' | 'search' | 'send';
  confirmHold?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  randomNumber?: boolean;
  controlled?: boolean;
  enableNative?: boolean;
  onInput?: (e: any) => void;
  onConfirm?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
}

export const Input = createHostComponent<InputProps>('input') as React.ComponentType<InputProps>;
