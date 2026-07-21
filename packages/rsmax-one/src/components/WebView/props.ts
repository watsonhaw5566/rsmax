import * as React from 'react';

export interface WebViewProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  onMessage?: (event: WebViewMessageEvent) => void;
}

export interface WebViewMessageEvent {
  detail: {
    data: any;
  };
}
