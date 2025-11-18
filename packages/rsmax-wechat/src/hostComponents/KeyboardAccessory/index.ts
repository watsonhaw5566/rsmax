import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../types/component';

export type KeyboardAccessoryProps = BaseProps;

/**
 * @see https://developers.weixin.qq.com/miniprogram/dev/component/keyboard-accessory.html
 */
export const KeyboardAccessory: React.ComponentType<KeyboardAccessoryProps> =
  createHostComponent<KeyboardAccessoryProps>('keyboard-accessory');
