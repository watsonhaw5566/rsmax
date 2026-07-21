import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface JoinGroupChatProps {
  templateId: string;
}

export const JoinGroupChat = createHostComponent<JoinGroupChatProps>(
  'join-group-chat'
) as React.ComponentType<JoinGroupChatProps>;
