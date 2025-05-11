import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  src: 'src',
  style: 'style',
  onClick: 'onTap',
  onTap: 'onTap',
};

export const props = unique(Object.values(alias));
