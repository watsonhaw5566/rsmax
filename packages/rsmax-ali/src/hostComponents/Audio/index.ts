import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface AudioProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src: string;
  name?: string;
  author?: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  obeysMuteSwitch?: boolean;
  volume?: number;
  onAction?: (e: any) => void;
  onPlay?: (e: any) => void;
  onPause?: (e: any) => void;
  onStop?: (e: any) => void;
  onEnded?: (e: any) => void;
  onError?: (e: any) => void;
  onTimeUpdate?: (e: any) => void;
  onLoading?: (e: any) => void;
  onLoadedData?: (e: any) => void;
}

export const Audio = createHostComponent<AudioProps>('audio') as React.ComponentType<AudioProps>;

Audio.defaultProps = {
  controls: true,
  obeysMuteSwitch: true,
};
