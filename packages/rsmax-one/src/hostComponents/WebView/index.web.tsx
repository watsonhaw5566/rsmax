import clsx from 'clsx';
import React from 'react';
import { filterProps } from '../../utils/isPlatformSpecifyProp';

export interface WebViewProps extends React.AriaAttributes {
  id?: string;
  src: string;
  onMessage?: (event: Event) => void;
  className?: string;
  style?: React.CSSProperties;
}

const WebView: React.ForwardRefRenderFunction<any, WebViewProps> = (props, ref) => {
  const { onMessage, ...restProps } = filterProps(props);
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (typeof onMessage === 'function') {
        onMessage(event);
      }
    };

    window.addEventListener('message', listener, false);

    return () => window.removeEventListener('message', listener);
  }, [onMessage]);

  return <iframe {...restProps} className={clsx('remax-web-view', props.className)} ref={ref} />;
};

export default React.forwardRef(WebView);
