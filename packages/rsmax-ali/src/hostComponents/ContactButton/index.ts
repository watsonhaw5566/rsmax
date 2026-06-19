import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface ContactButtonProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  tntInstId: string;
  scene: string;
  size?: string | number;
  color?: string;
  icon?: string;
  alipayCardNo?: string;
  onContactShare?: (e: any) => void;
}

export const ContactButton = createHostComponent<ContactButtonProps>(
  'contact-button'
) as React.ComponentType<ContactButtonProps>;
