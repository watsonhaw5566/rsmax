import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

export interface AdProps extends BaseProps {
  // 广告位 id，必填。需要预先在「小程序管理后台 > 流量主模块」配置生成。
  unitId: string;
  // 广告加载成功的回调方法 1.19.0
  onLoad?: (event: GenericEvent) => any;
  // 广告加载失败的回调方法 1.26.2
  onError?: (event: GenericEvent) => any;
  // 广告关闭的回调方法 1.31.0
  onClose?: (event: GenericEvent) => any;
  fixed?: boolean;
  type?: 'video' | 'large' | 'lImg' | 'rImg';
  scale?: number;
}

export const Ad: React.ComponentType<AdProps> = createHostComponent<AdProps>('ad');

Ad.defaultProps = {
  scale: 100,
};
