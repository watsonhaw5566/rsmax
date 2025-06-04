import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

/**
 * live-preview
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/media-component/live-preview
 */
export interface LivePreviewProps extends BaseProps {
  awemeId: string;
  title?: string;
  imageSrc?: string;
  hideHeader?: boolean;
  onUserPage?: (e: any) => void;
  onLiveRoom?: (e: any) => void;
  onLiveStatus?: (e: any) => void;
  onError?: (e: any) => void;
  onClick?: (e: any) => void;
}

export const LivePreview: React.ComponentType<LivePreviewProps> = createHostComponent<LivePreviewProps>('live-preview');
