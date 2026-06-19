import { unique } from '@rsmax/shared';

export const alias = {
  target: 'target',
  url: 'url',
  args: 'args',
  version: 'version',
  onSuccess: 'onSuccess',
  onFail: 'onFail',
  onCancel: 'onCancel',
};

export const props = unique(Object.values(alias));
