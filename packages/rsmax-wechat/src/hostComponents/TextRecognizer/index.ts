import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

/**
 * 基础库 3.1.0 开始支持，低版本需做兼容处理。
 *
 * 渲染框架支持情况：WebView
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/text-recognizer.html
 */
export interface TextRecognizerProps extends BaseProps {
  /** 组件加载成功时触发 */
  onLoad?: (event: GenericEvent) => any;
  /** 组件加载失败时触发 */
  onError?: (event: GenericEvent) => any;
}

export const TextRecognizer: React.ComponentType<TextRecognizerProps> =
  createHostComponent<TextRecognizerProps>('text-recognizer');
