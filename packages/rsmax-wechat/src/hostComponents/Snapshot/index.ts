import React from 'react';
import { createHostComponent } from '@rsmax/runtime';
import { BaseProps } from '../../types/component';

/**
 * 基础库 3.0.1 开始支持，低版本需做兼容处理。
 *
 * 渲染框架支持情况：Skyline （使用最新 Nighly 工具调试）
 *
 * https://developers.weixin.qq.com/miniprogram/dev/component/snapshot.html
 */
export interface SnapshotProps extends BaseProps {
  /**
   * 渲染模式
   */
  mode?: 'view' | 'picture';
}

export const Snapshot: React.ComponentType<SnapshotProps> = createHostComponent<SnapshotProps>('snapshot');

Snapshot.defaultProps = {
  mode: 'view',
};
