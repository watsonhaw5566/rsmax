import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface TextProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  selectable?: boolean;
  space?: string;
  decode?: boolean;
  numberOfLines?: number;
  onTap?: (e: any) => void;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}

export const Text = createHostComponent<TextProps>('text') as React.ComponentType<TextProps>;
