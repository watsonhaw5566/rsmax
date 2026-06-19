import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 2.15.0 开始支持，低版本需做兼容处理。
 *
 * 小程序内嵌音视频通话组件，支持在小程序内直接发起或接听音视频通话。
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/voip-chat.html
 */
export interface VoipChatProps extends BaseProps {
  /** 窗口 id */
  windowId?: string;
  /** 房间 id，调用方需要先维护好房间号 */
  roomId?: string;
  /** 房间名，显示在呼叫界面 */
  roomName?: string;
  /** 昵称，显示在呼叫界面 */
  nickName?: string;
  /** 头像地址，显示在呼叫界面 */
  headImage?: string;
  /** 成员列表，显示在呼叫界面，数组中每一项为 object，包含字段：openid（用户openid）、nickName（用户昵称）、headImage（头像地址） */
  memberList?: Array<{ openid?: string; nickName?: string; headImage?: string }>;
  /** 打开组件时触发 */
  onLoad?: (event: GenericEvent) => any;
  /** 组件关闭时触发 */
  onClose?: (event: GenericEvent) => any;
  /** 组件异常时触发 */
  onError?: (event: GenericEvent) => any;
  /** 成员进入房间时触发 */
  onJoinRoom?: (event: GenericEvent) => any;
  /** 成员离开房间时触发 */
  onLeaveRoom?: (event: GenericEvent) => any;
  /** 成员上麦时触发 */
  onSpeak?: (event: GenericEvent) => any;
}

export const VoipChat: React.ComponentType<VoipChatProps> = createHostComponent<VoipChatProps>('voip-chat');
