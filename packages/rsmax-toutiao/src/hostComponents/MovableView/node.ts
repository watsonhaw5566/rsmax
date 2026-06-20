import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  direction: 'direction',
  width: 'width',
  height: 'height',
  x: 'x',
  y: 'y',
  disabled: 'disabled',
  inertia: 'inertia',
  outOfBounds: 'out-of-bounds',
  damping: 'damping',
  friction: 'friction',
  scale: 'scale',
  scaleMin: 'scale-min',
  scaleMax: 'scale-max',
  scaleValue: 'scale-value',
  animation: 'animation',
  onTouchStart: 'bindtouchstart',
  onTouchMove: 'bindtouchmove',
  onTouchEnd: 'bindtouchend',
  onTouchCancel: 'bindtouchcancel',
  onChange: 'bindchange',
  onScale: 'bindscale',
  hTouchMove: 'bindhtouchmove',
  vTouchMove: 'bindvtouchmove',
};

export const props = unique(Object.values(alias));
