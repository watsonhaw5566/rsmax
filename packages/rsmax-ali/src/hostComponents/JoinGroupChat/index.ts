import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface JoinGroupChatProps {
  templateId: string;
  onComplete?: (e: any) => void;
  onError?: (e: any) => void;
}

export const JoinGroupChat = createHostComponent<JoinGroupChatProps>(
  'join-group-chat'
) as React.ComponentType<JoinGroupChatProps>;
