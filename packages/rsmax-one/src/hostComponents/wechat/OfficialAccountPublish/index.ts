import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';
import type { BaseProps } from '../../../types/component';

export interface OfficialAccountPublishProps extends BaseProps {
  /** 话题名称，最多20字，默认使用小程序名称 */
  topic?: string;
  /** 小程序页面内最多展示的贴图数量，超出后需点击"查看更多" (default: 4) */
  limit?: number;
  /** 贴图组件的背景颜色 (default: #f7f7f7) */
  backgroundColor?: string;
  /** 是否需要色彩统一 (default: false) */
  colorUnity?: boolean;
  /** 无内容时的占位文案 (default: 来写下第一条吧) */
  placeholder?: string;
  /** 是否展示相关内容 (default: true) */
  showRelated?: boolean;
  /** 贴图链接卡片跳转页面 */
  recommendPath?: string;
  /** 贴图链接卡片标题 */
  recommendTitle?: string;
  /** 列表拉取失败时触发 */
  onError?: (event: any) => any;
  /** 列表拉取为空时触发 */
  onEmpty?: (event: any) => any;
  /** 发表成功时触发 */
  onPublishSuccess?: (event: any) => any;
  /** 发表失败时触发 */
  onPublishFail?: (event: any) => any;
}

/** @see https://developers.weixin.qq.com/miniprogram/dev/component/official-account-publish.html */
export const OfficialAccountPublish: React.ComponentType<OfficialAccountPublishProps> =
  createHostComponent<OfficialAccountPublishProps>('official-account-publish');

OfficialAccountPublish.defaultProps = {
  limit: 4,
  backgroundColor: '#f7f7f7',
  colorUnity: false,
  placeholder: '来写下第一条吧',
  showRelated: true,
};
