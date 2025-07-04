import type React from 'react';
import type { TapEvent } from '../../../types';

export { default as defaults } from './default';

interface CommonProps {
  // 通用属性
  readonly dataset?: DOMStringMap;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  /** 文本是否可选 */
  selectable?: boolean;
  children?: React.ReactNode;
}

export default interface TextProps extends CommonProps, React.AriaAttributes {
  onTap?: (event: TapEvent) => void;
}

export interface TextWebProps extends CommonProps, React.HTMLAttributes<HTMLSpanElement> {
  onTap?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}
