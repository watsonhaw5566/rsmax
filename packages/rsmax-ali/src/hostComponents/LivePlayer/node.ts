import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  src: 'src',
  mode: 'mode',
  autoplay: 'autoplay',
  muted: 'muted',
  orientation: 'orientation',
  objectFit: 'object-fit',
  background: 'background',
  minCache: 'min-cache',
  maxCache: 'max-cache',
  livePause: 'livePause',
  pictureInPictureMode: 'picture-in-picture-mode',
  soundMode: 'sound-mode',
  enableAutoRotation: 'enable-auto-rotation',
  onPlay: 'onPlay',
  onPause: 'onPause',
  onStop: 'onStop',
  onEnded: 'onEnded',
  onError: 'onError',
  onTimeUpdate: 'onTimeUpdate',
  onLoading: 'onLoading',
  onLoadedMetaData: 'onLoadedMetaData',
  onFullScreenChange: 'onFullScreenChange',
  onPictureInPictureModeChanged: 'onPictureInPictureModeChanged',
  onClick: 'onTap',
  onTap: 'onTap',
};

export const props = unique(Object.values(alias));
