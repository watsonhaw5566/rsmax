import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  value: 'value',
  name: 'name',
  type: 'type',
  password: 'password',
  placeholder: 'placeholder',
  placeholderStyle: 'placeholder-style',
  placeholderClass: 'placeholder-class',
  placeholderClassName: 'placeholder-class',
  disabled: 'disabled',
  maxlength: 'maxlength',
  focus: 'focus',
  confirmType: 'confirm-type',
  confirmHold: 'confirm-hold',
  cursor: 'cursor',
  selectionStart: 'selection-start',
  selectionEnd: 'selection-end',
  randomNumber: 'randomNumber',
  controlled: 'controlled',
  enableNative: 'enableNative',
  onInput: 'onInput',
  onConfirm: 'onConfirm',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
};

export const props = unique(Object.values(alias));
