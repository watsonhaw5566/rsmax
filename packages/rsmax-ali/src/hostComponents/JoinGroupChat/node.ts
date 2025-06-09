import { unique } from '@rsmax/shared';

export const alias = {
  templateId: 'template-id',
};

export const props = unique(Object.values(alias));
