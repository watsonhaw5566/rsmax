import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface CoverViewProps {
  readonly dataset?: DOMStringMap;
  className?: string;
  style?: React.CSSProperties;
  onTap?: (e: any) => void;
}

export const CoverView = createHostComponent<CoverViewProps>('cover-view') as React.ComponentType<CoverViewProps>;
