import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface EditorPortalProps extends BaseProps {
  portalKey: string;
}

/**
 * 3.7.11
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/editor-portal.html
 */
export const EditorPortal: React.ComponentType<EditorPortalProps> =
  createHostComponent<EditorPortalProps>('editor-portal');
