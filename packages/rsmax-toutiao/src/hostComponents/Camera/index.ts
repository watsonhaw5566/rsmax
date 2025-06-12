import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

/**
 * camera
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/media-component/camera
 */
export interface CameraProps extends BaseProps {
  mode?: 'normal' | 'scanCode';
  resolution?: string;
  devicePosition?: 'front' | 'back';
  flash?: 'on' | 'off';
  frameSize?: 'small' | 'medium' | 'large';
  onInitdone?: (e: any) => void;
  onError?: (e: any) => void;
  onStop?: (e: any) => void;
  onScancode?: (e: any) => void;
  onClick?: (e: any) => void;
}

export const Camera: React.ComponentType<CameraProps> = createHostComponent<CameraProps>('camera');
