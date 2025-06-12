import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface TextProps extends BaseProps {
  selectable?: boolean;
  space?: string | boolean;
  decode?: boolean;
  children?: React.ReactNode;
}

export const Text: React.ComponentType<TextProps> = createHostComponent<TextProps>('text');

Text.defaultProps = {
  selectable: false,
  space: false,
  decode: false,
};
