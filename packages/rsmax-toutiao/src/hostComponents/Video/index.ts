import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps } from '../../types/component';

// docs: https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/media/video
export interface VideoProps extends BaseProps {
  /** 要播放视频的资源地址 */
  src: string;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 视频封面的图片网络资源地址 */
  poster?: string;
  /** 是否显示全部播放控件 */
  controls?: boolean;
  /** 弹幕列表 */
  danmuList?: any[];
  /** 是否显示弹幕按钮 */
  danmuBtn?: boolean;
  /** 是否展示弹幕 */
  enableDanmu?: boolean;
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否静音播放 */
  muted?: boolean;
  /** 指定视频初始播放位置 */
  initialTime?: number;
  /** 是否开启手势 */
  pageGesture?: boolean;
  /** 视频方向 */
  direction?: number;
  /** 是否显示进度条 */
  showProgress?: boolean;
  /** 是否显示全屏按钮 */
  showFullscreenBtn?: boolean;
  /** 是否显示播放按钮 */
  showPlayBtn?: boolean;
  /** 是否显示中间播放按钮 */
  showCenterPlayBtn?: boolean;
  /** 是否开启进度手势 */
  enableProgressGesture?: boolean;
  /** 当视频大小与 video 容器大小不一致时的表现形式 */
  objectFit?: 'contain' | 'fill' | 'cover';
  /** 是否显示静音按钮 */
  showMuteBtn?: boolean;
  /** 视频标题 */
  title?: string;
  /** 播放按钮的位置 */
  playBtnPosition?: 'center' | 'bottom';
  /** 是否开启播放手势 */
  enablePlayGesture?: boolean;
  /** 小程序跳转时是否自动暂停 */
  autoPauseIfNavigate?: boolean;
  /** 小程序跳转进入原生页面时是否自动暂停 */
  autoPauseIfOpenNative?: boolean;
  /** 是否开启竖向滑动手势 */
  vSlideGesture?: boolean;
  /** 全屏时是否开启竖向滑动手势 */
  vSlideGestureInfullscreen?: boolean;
  /** 封面图片与容器大小不一致时的表现形式 */
  posterSize?: string;
  /** 限制视频的最大可播放时长 */
  durationLimit?: number;
  /** 是否展示底部的播放进度条 */
  showBottomProgress?: boolean;
  /** 当开始播放时触发 */
  onPlay?: (event: any) => any;
  /** 当暂停播放时触发 */
  onPause?: (event: any) => any;
  /** 当播放到末尾时触发 */
  onEnded?: (event: any) => any;
  /** 播放进度变化时触发 */
  onTimeUpdate?: (event: any) => any;
  /** 视频进入和退出全屏时触发 */
  onFullscreenChange?: (event: any) => any;
  /** 视频出现缓冲时触发 */
  onWaiting?: (event: any) => any;
  /** 视频播放出错时触发 */
  onError?: (event: any) => any;
  /** 加载进度变化时触发 */
  onProgress?: (event: any) => any;
  /** 切换播放控件显示/隐藏时触发 */
  onControlstoggle?: (event: any) => any;
  /** 视频元数据加载完成时触发 */
  onLoadedmetadata?: (event: any) => any;
  /** seek 完成时触发 */
  onSeekcomplete?: (event: any) => any;
  /** 倍速改变完成时触发 */
  onPlaybackratechange?: (event: any) => any;
  /** 静音状态改变完成时触发 */
  onMutechange?: (event: any) => any;
  /** 点击控件时触发 */
  onControltap?: (event: any) => any;
}

export const Video: React.ComponentType<VideoProps> = createHostComponent<VideoProps>('video');

Video.defaultProps = {
  autoplay: false,
  loop: false,
  showFullscreenBtn: true,
  showPlayBtn: true,
  controls: true,
  objectFit: 'contain',
  playBtnPosition: 'center',
};
