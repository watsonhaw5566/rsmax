import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface StoreHomeProps extends BaseProps {
  /** 小店appid 3.5.5 */
  appid?: string;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/store-home.html
 */
export const StoreHome: React.ComponentType<StoreHomeProps> = createHostComponent<StoreHomeProps>('store-home');
