import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  style: 'style',
  className: 'class',
  width: 'width',
  height: 'height',
  disableScroll: 'disable-scroll',
  type: 'type',
  onClick: 'onTap',
  onTap: 'onTap',
  onTouchStart: 'onTouchStart',
  onTouchMove: 'onTouchMove',
  onTouchEnd: 'onTouchEnd',
  onTouchCancel: 'onTouchCancel',
  onLongTap: 'onLongTap',
  onLongClick: 'onLongTap',
  onReady: 'onReady',
};

export const props = unique(Object.values(alias));
