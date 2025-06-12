import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/channel-live.html
 *
 * 基础库 2.29.0 开始支持，低版本需做兼容处理。
 *
 * 微信 Windows 版：支持
 * 微信 Mac 版：支持
 *
 * 相关文档: 视频号直播
 *
 * 渲染框架支持情况：Skyline （使用最新 Nighly 工具调试）、WebView
 *
 * 功能描述
 * 小程序内嵌视频号直播组件，展示视频号直播状态和封面，并无弹窗跳转至视频号。注意：使用该组件打开的视频号视频需要与小程序的主体一致。
 *
 */
export interface ChannelLiveProps extends BaseProps {
  feedId?: string;
  finderUserName?: string;
}

/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/checkbox.html
 */
export const ChannelLive: React.ComponentType<ChannelLiveProps> = createHostComponent<ChannelLiveProps>('channel-live');

ChannelLive.defaultProps = {
  feedId: '',
  finderUserName: '',
};
