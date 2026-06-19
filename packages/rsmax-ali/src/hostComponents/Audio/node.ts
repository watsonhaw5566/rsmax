import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  src: 'src',
  name: 'name',
  author: 'author',
  poster: 'poster',
  autoplay: 'autoplay',
  controls: 'controls',
  loop: 'loop',
  muted: 'muted',
  obeysMuteSwitch: 'obeys-mute-switch',
  volume: 'volume',
  onAction: 'onAction',
  onPlay: 'onPlay',
  onPause: 'onPause',
  onStop: 'onStop',
  onEnded: 'onEnded',
  onError: 'onError',
  onTimeUpdate: 'onTimeUpdate',
  onLoading: 'onLoading',
  onLoadedData: 'onLoadedData',
};

export const props = unique(Object.values(alias));
