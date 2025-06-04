import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

interface Node {
  name: string;
  attrs?: any;
  children?: Node[];
}

export interface RichTextProps extends BaseProps {
  nodes?: Node | string;
  space?: 'ensp' | 'emsp' | 'nbsp';
}

export const RichText: React.ComponentType<RichTextProps> = createHostComponent<RichTextProps>('rich-text');
