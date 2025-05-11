import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface CoverImageProps {
  readonly dataset?: DOMStringMap;
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  onTap?: (e: any) => void;
}

export const CoverImage = createHostComponent<CoverImageProps>('cover-image') as React.ComponentType<CoverImageProps>;
