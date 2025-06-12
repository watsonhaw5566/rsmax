import * as React from 'react';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import type { LabelProps } from './props';

export type { LabelProps };

const Label: React.ForwardRefRenderFunction<any, LabelProps> = (props, ref) => (
  <label {...filterProps(props)} ref={ref} />
);

export default React.forwardRef(Label);
