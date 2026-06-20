import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  width: 'width',
  height: 'height',
  scaleArea: 'scale-area',
};

export const props = unique(Object.values(alias));
