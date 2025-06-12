import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

type SignatureProps = {
  enable: boolean;
  content: string;
  position: string;
  color: string;
};

/**
 * live-player
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/media-component/live-player
 */
export interface LivePlayerProps extends BaseProps {
  src: string;
  autoplay?: boolean;
  muted?: boolean;
  orientation?: 'vertical' | 'horizontal';
  objectFit?: 'contain' | 'fillCrop';
  signature?: SignatureProps;
  showCastingButton?: boolean;
  onStatechange?: (e: any) => void;
  onFullscreenchange?: (e: any) => void;
  onError?: (e: any) => void;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}

export const LivePlayer: React.ComponentType<LivePlayerProps> = createHostComponent<LivePlayerProps>('live-player');
