import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface TextareaProps extends BaseProps {
  name?: string;
  value?: string;
  placeholder?: string;
  placeholderStyle?: string;
  placeholderClassName?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  autoHeight?: boolean;
  fixed?: boolean;
  showCount?: boolean;
  controlled?: boolean;
  cursorSpacing?: number;
  cursor?: number;
  showConfirmBar?: boolean;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;
  holdKeyboard?: boolean;
  disableDefaultPadding?: boolean;
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done' | 'return';
  confirmHold?: boolean;
  onInput?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onLineChange?: (e: any) => void;
  onConfirm?: (e: any) => void;
  onKeyboardHeightChange?: (e: any) => void;
}

export const Textarea: React.ComponentType<TextareaProps> = createHostComponent<TextareaProps>('textarea');

Textarea.defaultProps = {
  disabled: false,
  maxlength: 140,
  focus: false,
  autoHeight: false,
  fixed: false,
  cursorSpacing: 0,
  cursor: -1,
  selectionStart: -1,
  selectionEnd: -1,
  adjustPosition: true,
  holdKeyboard: false,
  disableDefaultPadding: true,
  confirmType: 'return',
  confirmHold: false,
  showConfirmBar: true,
};
