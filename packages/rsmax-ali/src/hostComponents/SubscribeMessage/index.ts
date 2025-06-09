import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface SubscribeMessageProps {
  templateId: string;
  onComplete?: (e: any) => void;
}

export const SubscribeMessage = createHostComponent<SubscribeMessageProps>(
  'subscribe-message'
) as React.ComponentType<SubscribeMessageProps>;
