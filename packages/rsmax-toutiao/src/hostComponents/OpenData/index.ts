import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

import type { BaseProps, GenericEvent } from '../../types/component';

export interface OpenDataProps extends BaseProps {
  /** 开放数据类型 */
  type?:
    | 'groupName'
    | 'userNickName'
    | 'userAvatarUrl'
    | 'userGender'
    | 'userCity'
    | 'userProvince'
    | 'userCountry'
    | 'userLanguage';
  /** 当 type="groupName" 时生效，群id */
  openGid?: string;
  /** 以哪种语言展示 userInfo，有效值：en、zh_CN、zh_TW */
  lang?: 'en' | 'zh_CN' | 'zh_TW';
  /** 数据为空时的默认文案 */
  defaultText?: string;
  /** 用户头像为空时的默认图片，支持相对路径和网络图片路径 */
  defaultAvatar?: string;
  /** 群名称或用户信息为空时触发 */
  onError?: (event: GenericEvent) => any;
}

/**
 * open-data 开放数据
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/component/open-ability/open-data
 */
export const OpenData: React.ComponentType<OpenDataProps> = createHostComponent<OpenDataProps>('open-data');

OpenData.defaultProps = {
  lang: 'en',
};
