import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  onTap: 'onTap',
  onClick: 'onTap',
};

export const props = unique(Object.values(alias));
