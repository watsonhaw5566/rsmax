import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface LifestyleProps {
  readonly dataset?: DOMStringMap;
  publicId: string;
  onFollow?: (e: any) => void;
  onUnfollow?: (e: any) => void;
  onClose?: (e: any) => void;
}

export const Lifestyle = createHostComponent<LifestyleProps>('lifestyle') as React.ComponentType<LifestyleProps>;
