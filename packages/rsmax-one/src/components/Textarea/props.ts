import * as React from 'react';

export interface TextareaProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  value?: string;
  placeholder?: string;
  placeholderStyle?: React.CSSProperties;
  placeholderClass?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  autoHeight?: boolean;
  showConfirmBar?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;

  onChange?: (event: TextareaEvent) => void;
  onInput?: (event: TextareaEvent) => void;
  onConfirm?: (event: TextareaEvent) => void;
  onFocus?: (event: TextareaEvent) => void;
  onBlur?: (event: TextareaEvent) => void;
}

export interface TextareaEvent {
  detail: {
    value: string;
  };
}
