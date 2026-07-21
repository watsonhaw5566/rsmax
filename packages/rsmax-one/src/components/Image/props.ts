import * as React from 'react';

export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right';

export interface ImageEvent {
  detail: {
    width: number;
    height: number;
  };
}

export interface ImageProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  mode?: ImageMode;
  lazyLoad?: boolean;
  showMenuByLongpress?: boolean;
  webp?: boolean;
  loop?: boolean;

  onLoad?: (event: ImageEvent) => void;
  onError?: (event: ImageEvent) => void;
}
