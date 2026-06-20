import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

export interface ButtonProps extends BaseProps {
  size?: 'default' | 'mini';
  type?: 'primary' | 'default';
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  formType?: 'submit' | 'reset';
  openType?: string;
  hoverClassName?: string;
  hoverStartTime?: number;
  hoverStayTime?: number;
  hoverStopPropagation?: boolean;
  lang?: 'en' | 'zh_CN' | 'zh_TW';
  sessionFrom?: string;
  sendMessageTitle?: string;
  sendMessagePath?: string;
  sendMessageImg?: string;
  appParameter?: string;
  showMessageCard?: boolean;
  onClick?: (e: any) => void;
  onGetUserInfo?: (e: any) => void;
  onContact?: (e: any) => void;
  onGetPhoneNumber?: (e: any) => void;
  onError?: (e: any) => void;
  onOpenSetting?: (e: any) => void;
  onLaunchApp?: (e: any) => void;
  onAgreePrivacyAuthorization?: (e: any) => void;
  /** 抖音号 ID，用于 openAwemeUserProfile / openWebcastRoom / privateMessage / authorizePrivateMessage */
  dataAwemeId?: string;
  /** IM 客服的抖音号，用于 open-type="im" */
  dataImId?: string;
  /** IM 卡片类型：goods / order，用于 open-type="im" 或 open-type="byteHi" */
  dataImType?: string;
  /** 商品 ID，用于 im 商品卡片或 lifeIm */
  dataGoodsId?: string;
  /** 商品类型：1 生活服务，2 泛知识，用于 im/byteHi 商品卡片 */
  dataBizLine?: string;
  /** 订单 ID，用于 im 订单卡片 / platformIm / lifeIm */
  dataOrderId?: string;
  /** 平台客服类型，用于 open-type="platformIm" */
  dataPlatformImType?: string;
  /** 视频 ID，用于 open-type="navigateToVideoView" */
  dataVideoId?: string;
  /** 视频类型：share / task，用于 open-type="navigateToVideoView" */
  dataVideoType?: string;
  /** 场景值，用于 open-type="privateMessage" 时设为 "open_card_im" */
  dataScene?: string;
  /** 自定义透传字段，用于 open-type="privateMessage" 或 "authorizePrivateMessage" */
  dataImExtra?: string;
  /** 群聊 ID，用于 open-type="joinGroup" */
  groupId?: string;
  /** 是否开启半屏模式，用于 open-type="joinGroup" */
  dataIsHalfPage?: boolean;
  /** 添加日历参数，用于 open-type="addCalendarEvent" */
  dataCalendarOptions?: {
    title: string;
    description?: string;
    startTime: number;
    endTime?: number;
    location?: string;
    alarm?: boolean;
    alarmOffset?: number;
  };
  /** POI ID，用于 open-type="lifeIm" */
  dataPoiId?: string;
  /** 跳转 IM 客服成功时触发，open-type="im" */
  onIm?: (e: any) => void;
  /** 跳转平台客服成功时触发，open-type="platformIm" */
  onPlatformIm?: (e: any) => void;
  /** 跳转视频播放页结果回调，open-type="navigateToVideoView" */
  onNavigateToVideoView?: (e: any) => void;
  /** 跳转抖音号个人页结果回调，open-type="openAwemeUserProfile" */
  onOpenAwemeUserProfile?: (e: any) => void;
  /** 跳转抖音直播间结果回调，open-type="openWebcastRoom" */
  onOpenWebcastRoom?: (e: any) => void;
  /** 添加到桌面结果回调，open-type="addShortcut" */
  onAddShortcut?: (e: any) => void;
  /** 写入系统日历结果回调，open-type="addCalendarEvent" */
  onAddCalendarEvent?: (e: any) => void;
  /** 跳转私信成功时触发，open-type="privateMessage" */
  onPm?: (e: any) => void;
  /** 授权私信回调，open-type="authorizePrivateMessage" */
  onAuthorizePrivateMessage?: (e: any) => void;
  /** 加群后触发，open-type="joinGroup" */
  onJoinGroup?: (e: any) => void;
  /** 跳转 ByteHi 客服结果回调，open-type="byteHi" */
  onBytehi?: (e: any) => void;
  /** 跳转订阅消息设置页回调，open-type="openSubscribeMessageSetting" */
  onOpenSubscribeMessageSetting?: (e: any) => void;
  /** 跳转来客 IM 成功时触发，open-type="lifeIm" */
  onLifeim?: (e: any) => void;
  children?: React.ReactNode;
}

export const Button: React.ComponentType<ButtonProps> = createHostComponent<ButtonProps>('button');

Button.defaultProps = {
  size: 'default',
  type: 'default',
  disabled: false,
  loading: false,
  hoverClassName: 'button-hover',
  hoverStartTime: 20,
  hoverStayTime: 70,
  hoverStopPropagation: false,
};
