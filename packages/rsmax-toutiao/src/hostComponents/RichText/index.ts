import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

interface Node {
  name: string;
  attrs?: any;
  children?: Node[];
}

export interface RichTextProps extends BaseProps {
  nodes?: Node | string;
  space?: 'ensp' | 'emsp' | 'nbsp';
  onTap?: (e: any) => void;
  onClick?: (e: any) => void;
  onTouchStart?: (e: any) => void;
  onTouchMove?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  onTouchCancel?: (e: any) => void;
  onLongTap?: (e: any) => void;
}

export const RichText: React.ComponentType<RichTextProps> = createHostComponent<RichTextProps>('rich-text');
