import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  name: 'name',
  min: 'min',
  max: 'max',
  step: 'step',
  disabled: 'disabled',
  value: 'value',
  showValue: 'show-value',
  activeColor: 'active-color',
  backgroundColor: 'background-color',
  trackSize: 'track-size',
  handleSize: 'handle-size',
  handleColor: 'handle-color',
  onChange: 'onChange',
  onChanging: 'onChanging',
};

export const props = unique(Object.values(alias));
