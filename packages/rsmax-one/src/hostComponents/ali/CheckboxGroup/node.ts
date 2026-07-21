import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  name: 'name',
  onChange: 'onChange',
};

export const props = unique(Object.values(alias));
