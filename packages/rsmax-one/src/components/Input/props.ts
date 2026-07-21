import * as React from 'react';

export type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'password';

export interface InputProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: InputType;
  value?: string;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  placeholderClass?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
  confirmHold?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;

  onChange?: (event: InputEvent) => void;
  onInput?: (event: InputEvent) => void;
  onConfirm?: (event: InputEvent) => void;
  onFocus?: (event: InputEvent) => void;
  onBlur?: (event: InputEvent) => void;
}

export interface InputEvent {
  detail: {
    value: string;
  };
}
