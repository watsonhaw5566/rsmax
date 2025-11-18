import { createHostComponent } from '@rsmax/runtime';
import type * as React from 'react';
import type { BaseProps } from '../../types/component';

/**
 * Skyline 内联元素混排组件（文本与 image/navigator 混排）
 * https://developers.weixin.qq.com/miniprogram/dev/component/span.html
 */
export interface SpanProps extends BaseProps {}

export const Span: React.ComponentType<SpanProps> = createHostComponent<SpanProps>('span');
