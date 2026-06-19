import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface LivePusherProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  url: string;
  mode?: 'SD' | 'HD' | 'FHD';
  autoplay?: boolean;
  muted?: boolean;
  enableCamera?: boolean;
  autoFocus?: boolean;
  orientation?: 'vertical' | 'horizontal';
  beauty?: number;
  whiteness?: number;
  aspect?: '3:4' | '9:16';
  minBitrate?: number;
  maxBitrate?: number;
  audioQuality?: string;
  waitingImage?: string;
  zoom?: boolean;
  onPush?: (e: any) => void;
  onStop?: (e: any) => void;
  onError?: (e: any) => void;
  onNetStatus?: (e: any) => void;
  onBgmStart?: (e: any) => void;
  onBgmProgress?: (e: any) => void;
  onBgmComplete?: (e: any) => void;
  onPictureInPictureModeChanged?: (e: any) => void;
}

export const LivePusher = createHostComponent<LivePusherProps>('live-pusher') as React.ComponentType<LivePusherProps>;

LivePusher.defaultProps = {
  mode: 'HD',
  autoplay: false,
  muted: false,
  enableCamera: true,
  autoFocus: true,
  orientation: 'vertical',
  beauty: 0,
  whiteness: 0,
  aspect: '9:16',
  minBitrate: 200,
  maxBitrate: 1000,
  audioQuality: 'high',
  zoom: false,
};
