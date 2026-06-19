import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface CoverViewProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  onTap?: (e: any) => void;
  onClick?: (e: any) => void;
  onTouchStart?: (e: any) => void;
  onTouchMove?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  onTouchCancel?: (e: any) => void;
  children?: React.ReactNode;
}

export const CoverView = createHostComponent<CoverViewProps>('cover-view') as React.ComponentType<CoverViewProps>;
