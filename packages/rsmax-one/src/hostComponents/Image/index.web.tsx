import clsx from 'clsx';
import * as React from 'react';
import { filterProps } from '../../utils/isPlatformSpecifyProp';
import modeStyle from './modeStyle';
import type { ImageWebProps } from './props';

export type ImageProps = ImageWebProps;

const Image: React.ForwardRefRenderFunction<any, ImageWebProps> = (props, ref) => {
  const {
    className,
    src,
    style,
    mode = 'scaleToFill',
    onTap,
    onLoad,
    onError,
    ...restProps
  } = filterProps<ImageWebProps>(props);
  const isWidthFixMode = mode === 'widthFix';

  return (
    <div
      {...restProps}
      onClick={onTap}
      className={clsx('rsmax-image', className)}
      style={{
        ...modeStyle[mode],
        backgroundImage: `url(${src})`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      <img
        src={src}
        ref={ref}
        style={{
          visibility: 'hidden',
          width: isWidthFixMode ? '100%' : undefined,
          height: isWidthFixMode ? 'auto' : '1px',
        }}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
};
export default React.forwardRef(Image);
