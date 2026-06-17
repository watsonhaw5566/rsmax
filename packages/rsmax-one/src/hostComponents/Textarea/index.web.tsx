import clsx from 'clsx';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import useWebPlaceholderStyle from '../../useWebPlaceholderStyle';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import type { TextareaWebProps } from './props';

const Textarea: React.ForwardRefRenderFunction<any, TextareaWebProps> = (props, ref) => {
  const { onConfirm, onKeyDown, autoHeight, className, placeholderStyle, ...restProps } = filterProps(props);
  const [placeholderStyleClassName] = useWebPlaceholderStyle(placeholderStyle);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && typeof onConfirm === 'function') {
      onConfirm(e);
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(e);
    }
  }

  const textareaClassName = clsx('remax-textarea', className, placeholderStyleClassName);

  if (autoHeight) {
    const TextareaAutoSize = TextareaAutosize as unknown as React.ComponentType<
      React.TextareaHTMLAttributes<HTMLTextAreaElement> & { ref?: React.Ref<HTMLTextAreaElement> }
    >;
    return (
      <TextareaAutoSize
        {...restProps}
        className={textareaClassName}
        ref={ref as React.Ref<HTMLTextAreaElement>}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return <textarea {...restProps} className={textareaClassName} ref={ref} onKeyDown={handleKeyDown} />;
};
export default React.forwardRef(Textarea);
