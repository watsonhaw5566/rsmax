import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface WebViewProps extends BaseProps {
  src?: string;
  onMessage?: (e: any) => void;
  progressbarColor?: string;
}

export const WebView: React.ComponentType<WebViewProps> = createHostComponent<WebViewProps>('web-view');

WebView.defaultProps = {
  progressbarColor: '#51a0d8',
};
