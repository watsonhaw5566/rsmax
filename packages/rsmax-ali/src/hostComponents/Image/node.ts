import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  src: 'src',
  mode: 'mode',
  className: 'class',
  style: 'style',
  lazyLoad: 'lazy-load',
  showMenuByLongPress: 'show-menu-by-longpress',
  onLoad: 'onLoad',
  onError: 'onError',
  onTap: 'onTap',
  onTouchStart: 'onTouchStart',
  onTouchMove: 'onTouchMove',
  onTouchEnd: 'onTouchEnd',
  onTouchCancel: 'onTouchCancel',
  onClick: 'onTap',
  catchTap: 'catchTap',
  onLongTap: 'onLongTap',
  onLongClick: 'onLongTap',
};

export const props = unique(Object.values(alias));
