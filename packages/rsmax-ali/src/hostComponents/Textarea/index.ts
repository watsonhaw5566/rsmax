import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface TextareaProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  value?: string;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  placeholderClassName?: string;
  disabled?: boolean;
  maxlength?: number;
  focus?: boolean;
  autoHeight?: boolean;
  showCount?: boolean;
  controlled?: boolean;
  enableNative?: boolean;
  adjustPosition?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  randomNumber?: boolean;
  onInput?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onConfirm?: (e: any) => void;
}

export const Textarea = createHostComponent<TextareaProps>('textarea') as React.ComponentType<TextareaProps>;
