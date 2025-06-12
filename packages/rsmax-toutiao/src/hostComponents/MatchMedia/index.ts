import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface MatchMediaProps extends BaseProps {
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  height?: number;
  orientation?: 'portrait' | 'portraitupsidedown' | 'landscapeleft' | 'landscaperight';
  children?: React.ReactNode;
}

/**
 * match-media
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/view-container/component-match-media
 */
export const MatchMedia: React.ComponentType<MatchMediaProps> = createHostComponent<MatchMediaProps>('match-media');
