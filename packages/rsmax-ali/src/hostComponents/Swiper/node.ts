import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  indicatorDots: 'indicator-dots',
  indicatorColor: 'indicator-color',
  indicatorActiveColor: 'indicator-active-color',
  activeClass: 'active-class',
  activeClassName: 'active-class',
  changingClass: 'changing-class',
  changingClassName: 'changing-class',
  autoplay: 'autoplay',
  current: 'current',
  duration: 'duration',
  interval: 'interval',
  circular: 'circular',
  vertical: 'vertical',
  previousMargin: 'previous-margin',
  nextMargin: 'next-margin',
  acceleration: 'acceleration',
  disableProgrammaticAnimation: 'disable-programmatic-animation',
  onChange: 'onChange',
  onTransition: 'onTransition',
  onAnimationEnd: 'onAnimationEnd',
  disableTouch: 'disable-touch',
};

export const props = unique(Object.values(alias));
