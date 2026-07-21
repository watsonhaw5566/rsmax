import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface AdProps {
  /** 广告展位码 */
  unitId: string;
  /** 否	广告查询成功的回调 */
  onLoad?: (e: any) => void;
  /** 广告查询失败的回调 */
  onError?: (e: any) => void;
}

/**
 * Ad 广告组件
 * https://opendocs.alipay.com/mini/0drov4?pathHash=2b0e72a3
 */
export const Ad: React.ComponentType<AdProps> = createHostComponent<AdProps>('ad');
