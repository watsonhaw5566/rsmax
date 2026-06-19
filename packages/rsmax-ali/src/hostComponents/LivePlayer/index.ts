import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface LivePlayerProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src: string;
  mode?: string;
  autoplay?: boolean;
  muted?: boolean;
  orientation?: string;
  objectFit?: 'contain' | 'fillCrop';
  background?: string;
  minCache?: number;
  maxCache?: number;
  livePause?: boolean;
  pictureInPictureMode?: Array<string>;
  onPlay?: (e: any) => void;
  onPause?: (e: any) => void;
  onStop?: (e: any) => void;
  onEnded?: (e: any) => void;
  onError?: (e: any) => void;
  onTimeUpdate?: (e: any) => void;
  onLoading?: (e: any) => void;
  onLoadedMetaData?: (e: any) => void;
  onFullScreenChange?: (e: any) => void;
  onPictureInPictureModeChanged?: (e: any) => void;
}

export const LivePlayer = createHostComponent<LivePlayerProps>('live-player') as React.ComponentType<LivePlayerProps>;

LivePlayer.defaultProps = {
  mode: 'live',
  autoplay: false,
  muted: false,
  orientation: 'vertical',
  objectFit: 'contain',
  background: 'black',
  minCache: 1,
  maxCache: 3,
  livePause: false,
};
