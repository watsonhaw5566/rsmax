import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface SpanProps extends BaseProps {
  // 用于支持内联文本和 image / navigator 的混排（Skyline 渲染引擎）
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/span.html */
export const Span: React.ComponentType<SpanProps> = createHostComponent<SpanProps>('span');
