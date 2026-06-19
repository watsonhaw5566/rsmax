import { unique } from '@rsmax/shared';

export const alias = {
  className: 'class',
  style: 'style',
};
export const props = unique(Object.values(alias));
