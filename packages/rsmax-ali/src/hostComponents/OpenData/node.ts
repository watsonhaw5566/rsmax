import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  type: 'type',
  openGid: 'open-gid',
  onError: 'onError',
  lang: 'lang',
};

export const props = unique(Object.values(alias));
