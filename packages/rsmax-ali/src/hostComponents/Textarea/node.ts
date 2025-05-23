import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  name: 'name',
  value: 'value',
  placeholder: 'placeholder',
  placeholderStyle: 'placeholder-style',
  placeholderClass: 'placeholder-class',
  placeholderClassName: 'placeholder-class',
  disabled: 'disabled',
  maxlength: 'maxlength',
  focus: 'focus',
  autoHeight: 'auto-height',
  showCount: 'show-count',
  controlled: 'controlled',
  enableNative: 'enableNative',
  onInput: 'onInput',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
  onConfirm: 'onConfirm',
};

export const props = unique(Object.values(alias));
