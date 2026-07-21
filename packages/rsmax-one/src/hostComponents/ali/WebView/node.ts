import { unique } from '@rsmax/shared';

export const alias = { id: 'id', src: 'src', onMessage: 'onMessage' };

export const props = unique(Object.values(alias));
