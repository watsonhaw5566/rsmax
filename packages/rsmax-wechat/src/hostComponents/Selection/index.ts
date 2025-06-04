import React from 'react';
import { createHostComponent } from '@rsmax/runtime';
import { BaseProps } from '../../types/component';

export interface SelectionProps extends BaseProps {
  /**
   * 是否隐藏客户端原生文本选区按钮
   */
  disableContextMenu?: boolean;
  onSelectionChange?: (event: any) => any;
}

/**
 * 3.6.4
 * 渲染框架支持情况：WebView
 * https://developers.weixin.qq.com/miniprogram/dev/component/selection.html
 */
export const Selection: React.ComponentType<SelectionProps> = createHostComponent<SelectionProps>('selection');

Selection.defaultProps = {
  disableContextMenu: false,
};
