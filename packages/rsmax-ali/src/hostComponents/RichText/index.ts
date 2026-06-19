import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface RichTextNode {
  readonly dataset?: DOMStringMap;
  type?: string;
  name: string;
  attrs?: any;
  children?: RichTextNode;
}

export interface RichTextProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  nodes?: RichTextNode[];
  space?: 'ensp' | 'emsp' | 'nbsp';
  onTap?: (e: any) => void;
  onClick?: (e: any) => void;
  onTouchStart?: (e: any) => void;
  onTouchMove?: (e: any) => void;
  onTouchEnd?: (e: any) => void;
  onTouchCancel?: (e: any) => void;
  onLongTap?: (e: any) => void;
  onLongClick?: (e: any) => void;
}

export const RichText = createHostComponent<RichTextProps>('rich-text') as React.ComponentType<RichTextProps>;
