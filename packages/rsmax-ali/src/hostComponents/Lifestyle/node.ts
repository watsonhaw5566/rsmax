import { unique } from '@rsmax/shared';

export const alias = {
  publicId: 'public-id',
  onFollow: 'onFollow',
  onUnfollow: 'onUnfollow',
  onClose: 'onClose',
};

export const props = unique(Object.values(alias));
