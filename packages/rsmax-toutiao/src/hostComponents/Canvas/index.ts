import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface CanvasProps extends BaseProps {
  canvasId: string;
}

export const Canvas: React.ComponentType<CanvasProps> = createHostComponent<CanvasProps>('canvas');
