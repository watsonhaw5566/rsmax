import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  minWidth: 'min-width',
  maxWidth: 'max-width',
  width: 'width',
  minHeight: 'min-height',
  maxHeight: 'max-height',
  height: 'height',
  orientation: 'orientation',
};

export const props = unique(Object.values(alias));
