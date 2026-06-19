import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  name: 'name',
  className: 'class',
  style: 'style',
  range: 'range',
  rangeKey: 'range-key',
  value: 'value',
  onChange: 'onChange',
  disabled: 'disabled',
  type: 'type',
  start: 'start',
  end: 'end',
  selectedColor: 'selected-color',
};

export const props = unique(Object.values(alias));
