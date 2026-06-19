import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  placeholder: 'placeholder',
  showImgSize: 'show-img-size',
  showImgToolbar: 'show-img-toolbar',
  showImgResize: 'show-img-resize',
  showKeyboard: 'show-keyboard',
  disableScroll: 'disable-scroll',
  readOnly: 'read-only',
  placeholderStyle: 'placeholder-style',
  onReady: 'onReady',
  onFocus: 'onFocus',
  onBlur: 'onBlur',
  onInput: 'onInput',
  onStatuschange: 'onStatuschange',
  onReady2: 'onReady2',
  onTap: 'onTap',
  onClick: 'onTap',
};

export const props = unique(Object.values(alias));
