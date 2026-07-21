import * as React from 'react';

export interface FormProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  reportSubmit?: boolean;
  reportSubmitTimeout?: number;

  onSubmit?: (event: FormEvent) => void;
  onReset?: () => void;
}

export interface FormEvent {
  detail: {
    value: Record<string, any>;
  };
}
