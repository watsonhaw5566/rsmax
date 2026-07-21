import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface SubscribeMessageProps {
  templateId: string;
  onComplete?: (e: any) => void;
}

export const SubscribeMessage = createHostComponent<SubscribeMessageProps>(
  'subscribe-message'
) as React.ComponentType<SubscribeMessageProps>;
