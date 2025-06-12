import type React from 'react';
import createHostComponent from '../../createHostComponent';
import type { FormProps } from './props';
import defaults from './props/default';

export type { FormProps };

const Form: React.ComponentType<FormProps> = createHostComponent<FormProps>('form', null, defaults);

export default Form;
