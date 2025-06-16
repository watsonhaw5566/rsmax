import { RuntimeOptions } from '@rsmax/framework-shared';
import clsx from 'clsx';
import * as React from 'react';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import type { NavigatorProps } from './props';

export type { NavigatorProps };

const Navigator: React.ForwardRefRenderFunction<any, NavigatorProps> = (props, ref) => {
  const { className, url, action, hoverClassName, hoverStartTime, hoverStayTime, ...restProps } = filterProps(props);
  const navigate = RuntimeOptions.get('navigate');

  function handleTap() {
    switch (action) {
      case 'reLaunch':
        window.location.href = window.location.hostname + url;
        break;
      case 'redirect':
        navigate.replace(url);
        break;
      default:
        navigate.push(url);
        break;
    }
  }

  return <div {...restProps} className={clsx(className)} onClick={handleTap} />;
};
export default React.forwardRef(Navigator);
