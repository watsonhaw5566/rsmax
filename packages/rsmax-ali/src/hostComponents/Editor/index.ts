import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface EditorProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  showImgSize?: boolean;
  showImgToolbar?: boolean;
  showImgResize?: boolean;
  showKeyboard?: boolean;
  disableScroll?: boolean;
  readOnly?: boolean;
  placeholderStyle?: string;
  onReady?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onInput?: (e: any) => void;
  onStatuschange?: (e: any) => void;
  onReady2?: (e: any) => void;
}

export const Editor = createHostComponent<EditorProps>('editor') as React.ComponentType<EditorProps>;
