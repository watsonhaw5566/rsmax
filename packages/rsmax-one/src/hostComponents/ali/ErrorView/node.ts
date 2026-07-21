import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  fullscreen: 'fullscreen',
  type: 'type',
  message: 'message',
  titleColor: 'title-color',
  messageColor: 'message-color',
  dataUrl: 'data-url',
  dataStatus: 'data-status',
  dataMessage: 'data-message',
};

export const props = unique(Object.values(alias));
