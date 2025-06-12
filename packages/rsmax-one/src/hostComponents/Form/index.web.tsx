import * as React from 'react';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import type { FormWebProps } from './props';

export type FormProps = FormWebProps;

const Form: React.ForwardRefRenderFunction<any, FormWebProps> = (props, ref) => (
  <form {...filterProps(props)} ref={ref} />
);

export default React.forwardRef(Form);
