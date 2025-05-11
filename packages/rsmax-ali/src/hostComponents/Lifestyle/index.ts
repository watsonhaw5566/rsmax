import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface LifestyleProps {
  readonly dataset?: DOMStringMap;
  publicId: string;
  onFollow?: (e: any) => void;
}

export const Lifestyle = createHostComponent<LifestyleProps>('lifestyle') as React.ComponentType<LifestyleProps>;
