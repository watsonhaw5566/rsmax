import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  url: 'url',
  mode: 'mode',
  autoplay: 'autoplay',
  muted: 'muted',
  enableCamera: 'enable-camera',
  autoFocus: 'auto-focus',
  orientation: 'orientation',
  beauty: 'beauty',
  whiteness: 'whiteness',
  aspect: 'aspect',
  minBitrate: 'min-bitrate',
  maxBitrate: 'max-bitrate',
  audioQuality: 'audio-quality',
  waitingImage: 'waiting-image',
  zoom: 'zoom',
  onPush: 'onPush',
  onStop: 'onStop',
  onError: 'onError',
  onNetStatus: 'onNetStatus',
  onBgmStart: 'onBgmStart',
  onBgmProgress: 'onBgmProgress',
  onBgmComplete: 'onBgmComplete',
  onPictureInPictureModeChanged: 'onPictureInPictureModeChanged',
};

export const props = unique(Object.values(alias));
