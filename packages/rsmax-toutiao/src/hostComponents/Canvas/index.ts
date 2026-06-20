import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface CanvasProps extends BaseProps {
  canvasId?: string;
  type?: string;
  onTouchStart?: (e: any) => void;
  onTouchMove?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  onTouchCancel?: (e: any) => void;
}

export const Canvas: React.ComponentType<CanvasProps> = createHostComponent<CanvasProps>('canvas');
