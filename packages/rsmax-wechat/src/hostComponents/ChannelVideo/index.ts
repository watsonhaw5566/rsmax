import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/channel-video.html
 *
 * 基础库 2.25.1 开始支持，低版本需做兼容处理。
 *
 * 微信 Windows 版：支持
 *
 * 微信 Mac 版：支持
 *
 * 相关文档: 视频号视频
 *
 * 渲染框架支持情况：Skyline （使用最新 Nighly 工具调试）、WebView
 *
 * 功能描述
 * 小程序内嵌视频号视频组件，支持在小程序中播放视频号视频，并无弹窗跳转至视频号。注意：
 *
 * 若小程序与内嵌视频号视频为同主体，则内嵌视频号视频可支持自动播放；
 * 基础库 2.31.1 起，对于非个人主体小程序，若小程序于内嵌视频号视频非同主体，则内嵌视频号视频不可自动播放，即强制 autoplay=false。
 */
export interface ChannelVideoProps extends BaseProps {
  feedId?: string;
  finderUserName?: string;
  feedToken?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: 'contain' | 'fill' | 'cover';
  objectFit?: boolean;
}

/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html
 */
export const ChannelVideo: React.ComponentType<ChannelVideoProps> =
  createHostComponent<ChannelVideoProps>('channel-live');

ChannelVideo.defaultProps = {
  feedId: '',
  finderUserName: '',
  feedToken: '',
  autoplay: true,
  loop: false,
  muted: 'contain',
};
