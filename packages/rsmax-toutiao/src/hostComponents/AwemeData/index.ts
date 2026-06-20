import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface AwemeDataProps extends BaseProps {
  /** 直播间数据类型 */
  type?: string;
  /** 数据为空时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * aweme-data 直播间状态组件
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-ability/aweme-data
 */
export const AwemeData: React.ComponentType<AwemeDataProps> = createHostComponent<AwemeDataProps>('aweme-data');
