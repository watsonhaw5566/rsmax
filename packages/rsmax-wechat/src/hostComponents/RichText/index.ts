import React from 'react';
import { createHostComponent } from '@rsmax/runtime';
import { BaseProps } from '../../types/component';

export interface RichTextProps extends BaseProps {
  /** 节点列表/HTML String 1.4.0 */
  nodes?: any[] | string;
  /** 显示连续空格 2.4.1 */
  space?: 'ensp' | 'emsp' | 'nbsp';
  /**
   * 2.24.0
   * 文本是否可选，该属性会使节点显示为 block
   */
  userSelect?: boolean;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html
 */
export const RichText: React.ComponentType<RichTextProps> = createHostComponent<RichTextProps>('rich-text');

RichText.defaultProps = {
  nodes: [],
};
