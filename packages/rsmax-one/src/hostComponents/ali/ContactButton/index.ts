import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface ContactButtonProps {
  readonly dataset?: DOMStringMap;
  tntInstId: string;
  scene: string;
  size?: string | number;
  color?: string;
  icon?: string;
  alipayCardNo?: string;
}

export const ContactButton = createHostComponent<ContactButtonProps>(
  'contact-button'
) as React.ComponentType<ContactButtonProps>;
