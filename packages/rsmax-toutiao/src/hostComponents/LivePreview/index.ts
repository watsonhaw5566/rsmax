import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

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
  objectFit?: ' contain' | 'fillCrop';
  signature?: SignatureProps;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}

export const LivePlayer: React.ComponentType<LivePlayerProps> = createHostComponent<LivePlayerProps>('match-media ');
