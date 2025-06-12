import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface ErrorViewProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  fullscreen?: boolean;
  type?: 'default' | 'busy' | 'error' | 'network' | 'trade';
  message?: string;
  titleColor?: string;
  messageColor?: string;
  dataUrl?: string;
  dataStatus?: string;
  dataMessage?: string;
  children?: React.ReactNode;
}

export const ErrorView = createHostComponent<ErrorViewProps>('error-view') as React.ComponentType<ErrorViewProps>;
ErrorView.defaultProps = {
  type: 'default',
};
