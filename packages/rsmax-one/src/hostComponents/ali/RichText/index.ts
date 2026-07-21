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
  nodes?: RichTextNode[];
}

export const RichText = createHostComponent<RichTextProps>('rich-text') as React.ComponentType<RichTextProps>;
