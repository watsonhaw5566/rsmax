import React from 'react';
import { createHostComponent } from '@rsmax/runtime';

export interface ShareElementProps {
  /** 映射标记  */
  key: string;
  /** 是否进行动画  */
  transform?: boolean;
  /** 动画时长，单位毫秒  */
  duration?: number;
  /** css缓动函数  */
  easingFunction?: string;
}

/** @see https://opendocs.alipay.com/mini/04y2ya?pathHash=a4fa18ca */
export const ShareElement: React.ComponentType<ShareElementProps> =
  createHostComponent<ShareElementProps>('share-element');
ShareElement.defaultProps = {
  transform: false,
  duration: 300,
  easingFunction: 'ease-out',
};
