import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 3.6.0 开始支持，低版本需做兼容处理。
 *
 * 渲染框架支持情况：Skyline （使用最新 Nighly 工具调试）、WebView
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/short-video.html
 */
export interface ShortVideoProps extends BaseProps {
  /** 视频号 id，以"sph"开头的字符串，必须是视频号主页中appid链接内的id */
  finderUserName?: string;
  /** 视频 feedId，从视频号助手获取（须已同步到本地视频号） */
  feedId?: string;
  /** 视频预览的时长，单位：秒 */
  previewDuration?: number;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否静音 */
  muted?: boolean;
  /** 是否显示默认播放控件（播放/暂停按钮、播放进度、时间） */
  controls?: boolean;
  /** 组件加载成功时触发 */
  onLoad?: (event: GenericEvent) => any;
  /** 组件加载失败时触发 */
  onError?: (event: GenericEvent) => any;
}

export const ShortVideo: React.ComponentType<ShortVideoProps> = createHostComponent<ShortVideoProps>('short-video');

ShortVideo.defaultProps = {
  previewDuration: 5,
  autoplay: false,
  loop: false,
  muted: false,
  controls: true,
};
