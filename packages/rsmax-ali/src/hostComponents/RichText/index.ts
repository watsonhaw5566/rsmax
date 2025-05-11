import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

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
