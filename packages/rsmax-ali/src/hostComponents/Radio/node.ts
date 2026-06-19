import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  name: 'name',
  className: 'class',
  style: 'style',
  value: 'value',
  checked: 'checked',
  disabled: 'disabled',
  color: 'color',
  controlled: 'controlled',
};

export const props = unique(Object.values(alias));
