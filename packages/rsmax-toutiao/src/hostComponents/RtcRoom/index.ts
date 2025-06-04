import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

import { BaseProps } from '../../types/component';

export interface RtcRoomProps extends BaseProps {
  userId: string;
  mode?: 'camera' | 'video' | 'screen';
  onError?: (event: any) => void;
  onTap?: (event: any) => void;
  onClick?: (event: any) => void;
}

export const RtcRoom: React.ComponentType<RtcRoomProps> = createHostComponent<RtcRoomProps>('rtc-room');
