import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export interface StoreHomeProps extends BaseProps {
  /** 小店 appid */
  appid: string;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/store-home.html */
export const StoreHome: React.ComponentType<StoreHomeProps> = createHostComponent<StoreHomeProps>('store-home');
