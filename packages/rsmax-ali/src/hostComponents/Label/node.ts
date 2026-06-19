import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  for: 'for',
  name: 'name',
};

export const props = unique(Object.values(alias));
