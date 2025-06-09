import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface JoinGroupChatProps {
  templateId: string;
}

export const JoinGroupChat = createHostComponent<JoinGroupChatProps>(
  'join-group-chat'
) as React.ComponentType<JoinGroupChatProps>;
