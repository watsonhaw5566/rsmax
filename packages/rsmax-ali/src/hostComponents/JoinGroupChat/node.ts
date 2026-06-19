import { unique } from '@rsmax/shared';

export const alias = {
  templateId: 'template-id',
  onComplete: 'onComplete',
  onError: 'onError',
};

export const props = unique(Object.values(alias));
