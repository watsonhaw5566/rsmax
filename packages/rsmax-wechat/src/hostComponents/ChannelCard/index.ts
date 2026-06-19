import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * 基础库 3.1.0 开始支持，低版本需做兼容处理。
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/channel-card.html
 */
export interface ChannelCardProps extends BaseProps {
  /** 视频号原始 id */
  finderUserName?: string;
  /** feed 类型 */
  feedType?: 'video' | 'live';
  /** feed 标识 */
  feedId?: string;
  /** 场景标识，未指定时会使用默认值 */
  sceneNote?: string;
}

export const ChannelCard: React.ComponentType<ChannelCardProps> = createHostComponent<ChannelCardProps>('channel-card');

ChannelCard.defaultProps = {
  feedType: 'video',
};
