import { unique } from '@rsmax/shared';

export const alias = {
  templateId: 'template-id',
  onComplete: 'onComplete',
};

export const props = unique(Object.values(alias));
