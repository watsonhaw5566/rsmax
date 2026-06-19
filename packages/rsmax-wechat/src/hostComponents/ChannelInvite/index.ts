import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 3.2.0 开始支持，低版本需做兼容处理。
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/channel-invite.html
 */
export interface ChannelInviteProps extends BaseProps {
  /** 分享按钮标题 */
  buttonText?: string;
  /** 分享标题 */
  shareTitle?: string;
  /** 分享跳转路径，不填则默认跳转首页 */
  sharePath?: string;
  /** 非必填，分享附带的自定义参数，在卡片被有效拉起后，可通过wx.getLaunchOptionsSync或wx.onShow返回的query中拿到channelInviteInfo */
  shareInfo?: string;
  /** 成功回调 */
  onSuccess?: (event: GenericEvent) => any;
  /** 失败回调 */
  onError?: (event: GenericEvent) => any;
  /** 完成回调（成功、失败都会回调） */
  onComplete?: (event: GenericEvent) => any;
}

export const ChannelInvite: React.ComponentType<ChannelInviteProps> =
  createHostComponent<ChannelInviteProps>('channel-invite');
