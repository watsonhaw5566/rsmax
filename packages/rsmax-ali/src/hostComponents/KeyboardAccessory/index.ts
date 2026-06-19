import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface KeyboardAccessoryProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const KeyboardAccessory = createHostComponent<KeyboardAccessoryProps>(
  'keyboard-accessory'
) as React.ComponentType<KeyboardAccessoryProps>;
