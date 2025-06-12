import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface EditorPortal extends BaseProps {
  key: string;
}

/**
 * 3.7.11
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/editor-portal.html
 */
export const EditorPortal: React.ComponentType<EditorPortal> = createHostComponent<EditorPortal>('editor-portal');

EditorPortal.defaultProps = {
  key: '',
};
