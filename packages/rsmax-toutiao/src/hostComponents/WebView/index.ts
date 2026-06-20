import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface WebViewProps extends BaseProps {
  src?: string;
  progressbarColor?: string;
  onMessage?: (e: any) => void;
  onLoad?: (e: any) => void;
  onError?: (e: any) => void;
}

export const WebView: React.ComponentType<WebViewProps> = createHostComponent<WebViewProps>('web-view');

WebView.defaultProps = {
  progressbarColor: '#51a0d8',
};
