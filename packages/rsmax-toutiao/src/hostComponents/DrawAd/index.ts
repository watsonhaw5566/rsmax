import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface DrawAdProps extends BaseProps {
  /** 广告位 ID，需在「小程序管理后台 > 流量主模块」配置生成 */
  unitId: string;
  /** 控制视频流广告是否铺满开发者自定义屏幕区域，不支持动态变更 */
  fullScreen?: boolean;
  /** 广告高度/宽度比例，取值范围 1.5~2.2，仅在 fullScreen 为 false 时生效，不支持动态变更 */
  scale?: number;
  /** 广告加载失败时触发 */
  onError?: (event: GenericEvent) => any;
  /** 组件开始播放时触发 */
  onPlay?: (event: GenericEvent) => any;
  /** 组件停止播放时触发 */
  onStop?: (event: GenericEvent) => any;
}

/**
 * draw-ad 视频流广告
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-capacity/draw-ad
 */
export const DrawAd: React.ComponentType<DrawAdProps> = createHostComponent<DrawAdProps>('draw-ad');

DrawAd.defaultProps = {
  fullScreen: false,
  scale: 1.5,
};
