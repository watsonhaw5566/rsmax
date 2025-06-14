import clsx from 'clsx';
import * as React from 'react';
import useWebPlaceholderStyle from '../../useWebPlaceholderStyle';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import type { InputWebProps } from './props';

export type InputProps = InputWebProps;

const Input: React.ForwardRefRenderFunction<any, InputWebProps> = (props, ref) => {
  const { password, type, onConfirm, onKeyPress, placeholderStyle, className, ...restProps } = filterProps(props);
  const [placeholderStyleClassName] = useWebPlaceholderStyle(placeholderStyle);

  const inputType = password ? 'password' : type;

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && typeof onConfirm === 'function') {
      onConfirm(e);
    }

    if (typeof onKeyPress === 'function') {
      onKeyPress(e);
    }
  }

  return (
    <input
      {...restProps}
      ref={ref}
      type={inputType}
      onKeyPress={handleKeyPress}
      className={clsx('remax-input', className, placeholderStyleClassName)}
    />
  );
};
export default React.forwardRef(Input);
