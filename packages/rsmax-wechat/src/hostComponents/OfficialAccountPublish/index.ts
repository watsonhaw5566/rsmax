import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps, GenericEvent } from '../../types/component';

export interface OfficialAccountPublishProps extends BaseProps {
  /** 话题名称，最多20字，默认使用小程序名称 3.9.3 */
  topic?: string;
  /** 小程序页面内最多展示的图文数量，上限10条 3.10.3 */
  limit?: number;
  /** 发表图文后，点击来源小程序跳转的页面 3.11.1 */
  path?: string;
  /** 图文组件的背景颜色 3.9.3 */
  backgroundColor?: string;
  /** 是否需要色彩统一，话题名称颜色与图文卡片背景颜色对齐 3.9.3 */
  colorUnity?: boolean;
  /** 无内容时的占位文案 3.10.2 */
  placeholder?: string;
  /** 列表拉取失败时触发 3.9.3 */
  onError?: (event: GenericEvent) => void;
  /** 列表拉取为空时触发 3.9.3 */
  onEmpty?: (event: GenericEvent) => void;
}

/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/official-account-publish.html
 */
export const OfficialAccountPublish: React.ComponentType<OfficialAccountPublishProps> =
  createHostComponent<OfficialAccountPublishProps>('official-account-publish');

OfficialAccountPublish.defaultProps = {
  limit: 4,
  backgroundColor: '#f7f7f7',
  colorUnity: false,
  placeholder: '来写下第一条吧',
};
