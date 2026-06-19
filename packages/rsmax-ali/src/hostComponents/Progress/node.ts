import { unique } from '@rsmax/shared';

export const alias = {
  id: 'id',
  className: 'class',
  style: 'style',
  percent: 'percent',
  showInfo: 'show-info',
  strokeWidth: 'stroke-width',
  activeColor: 'active-color',
  backgroundColor: 'background-color',
  active: 'active',
  borderRadius: 'border-radius',
  duration: 'duration',
  onActiveEnd: 'onActiveEnd',
};

export const props = unique(Object.values(alias));
