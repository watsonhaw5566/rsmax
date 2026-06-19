import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

/**
 * audio 音频
 * 基础库 1.0.0 开始支持本组件。
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/media-component/audio
 */
export interface AudioProps extends BaseProps {
  /** 要播放音频的资源地址 */
  src?: string;
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否显示默认播放控件（播放/暂停按钮、播放进度、时间） */
  controls?: boolean;
  /** 当开始播放时触发 play 事件 */
  onPlay?: (event: any) => any;
  /** 当暂停播放时触发 pause 事件 */
  onPause?: (event: any) => any;
  /** 当播放到末尾时触发 ended 事件 */
  onEnded?: (event: any) => any;
  /** 音频播放出错时触发 */
  onError?: (event: any) => any;
  /** 播放进度变化时触发，event.detail = { currentTime, duration } */
  onTimeUpdate?: (event: any) => any;
  children?: React.ReactNode;
}

export const Audio: React.ComponentType<AudioProps> = createHostComponent<AudioProps>('audio');

Audio.defaultProps = {
  loop: false,
  controls: true,
};
