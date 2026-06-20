import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface WebViewProps extends BaseProps {
  /** 指向网页的 URL，必须配置业务域名，只支持 https 和 wss 协议 */
  src?: string;
  /** 进度条颜色 */
  progressbarColor?: string;
  /** 若用于引入第三方客服，必须设置为 "im" */
  type?: 'default' | 'im';
  /** 网页向小程序 postMessage 时触发 */
  onMessage?: (e: any) => void;
  /** 网页加载完成时触发 */
  onLoad?: (e: any) => void;
  /** 网页加载失败时触发 */
  onError?: (e: any) => void;
}

export const WebView: React.ComponentType<WebViewProps> = createHostComponent<WebViewProps>('web-view');

WebView.defaultProps = {
  progressbarColor: '#51a0d8',
};
