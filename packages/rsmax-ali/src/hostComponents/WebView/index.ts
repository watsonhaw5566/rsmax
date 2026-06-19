import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface WebViewProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  src: string;
  onMessage?: (e: any) => void;
  onLoad?: (e: any) => void;
  onError?: (e: any) => void;
}

export const WebView = createHostComponent<WebViewProps>('web-view') as React.ComponentType<WebViewProps>;
