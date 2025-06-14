import type React from 'react';
import createHostComponent from '../../createHostComponent';
import type { Event } from '../../types';

export interface WebViewProps extends React.AriaAttributes {
  id?: string;
  src: string;
  onMessage?: (event: Event) => void;
}

const WebView: React.ComponentType<WebViewProps> = createHostComponent<WebViewProps>('web-view', null);

export default WebView;
