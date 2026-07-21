import type React from 'react';
import type {
  TouchEvent,
  TapEvent,
  InputEvent,
  FormEvent,
  ImageLoadEvent,
  ImageErrorEvent,
  GenericEvent,
} from './event';

export type { TouchEvent, GenericEvent };

export interface BaseProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties | string;
  hidden?: boolean;
  dataset?: Record<string, any>;
  children?: React.ReactNode;
}

export interface PlatformConfig {
  wechat?: Record<string, any>;
  ali?: Record<string, any>;
  toutiao?: Record<string, any>;
}

export type Platform = 'wechat' | 'ali' | 'toutiao';

export interface ViewProps extends BaseProps {
  hoverClass?: string;
  hoverStopPropagation?: boolean;
  hoverStartTime?: number;
  hoverStayTime?: number;
  disableScroll?: boolean;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchCancel?: (event: TouchEvent) => void;
  onTap?: (event: TapEvent) => void;
  onLongTap?: (event: TapEvent) => void;
}

export interface TextProps extends BaseProps {
  selectable?: boolean;
  userSelect?: boolean;
  space?: string;
  decode?: boolean;
  onTap?: (event: TapEvent) => void;
}

export interface ImageProps extends BaseProps {
  src?: string;
  mode?:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';
  lazyLoad?: boolean;
  showMenuByLongpress?: boolean;
  webp?: boolean;
  loop?: boolean;
  onLoad?: (event: ImageLoadEvent) => void;
  onError?: (event: ImageErrorEvent) => void;
}

export interface ButtonProps extends BaseProps {
  size?: 'default' | 'mini';
  type?: 'primary' | 'default' | 'warn';
  plain?: boolean;
  disabled?: boolean;
  loading?: boolean;
  formType?: 'submit' | 'reset';
  openType?: 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' | 'launchApp' | 'openSetting' | 'feedback';
  appParameter?: string;
  hoverClass?: string;
  hoverStopPropagation?: boolean;
  hoverStartTime?: number;
  hoverStayTime?: number;
  lang?: 'zh_CN' | 'zh_TW' | 'en';
  sessionFrom?: string;
  sendMessageTitle?: string;
  sendMessagePath?: string;
  sendMessageImg?: string;
  showMessageCard?: boolean;
  onTap?: (event: TapEvent) => void;
}

export interface InputProps extends BaseProps {
  value?: string;
  type?: 'text' | 'number' | 'idcard' | 'digit';
  password?: boolean;
  placeholder?: string;
  placeholderStyle?: string;
  placeholderClass?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
  confirmHold?: boolean;
  cursor?: number;
  selectionStart?: number;
  selectionEnd?: number;
  adjustPosition?: boolean;
  keyboardHeight?: number;
  onChange?: (event: InputEvent) => void;
  onInput?: (event: InputEvent) => void;
  onConfirm?: (event: InputEvent) => void;
  onFocus?: (event: InputEvent) => void;
  onBlur?: (event: InputEvent) => void;
}

export interface TextareaProps extends BaseProps {
  value?: string;
  placeholder?: string;
  placeholderStyle?: string;
  placeholderClass?: string;
  disabled?: boolean;
  maxlength?: number;
  autoFocus?: boolean;
  focus?: boolean;
  adjustPosition?: boolean;
  cursor?: number;
  showConfirmBar?: boolean;
  selectionStart?: number;
  selectionEnd?: number;
  autoHeight?: boolean;
  fixed?: boolean;
  onChange?: (event: InputEvent) => void;
  onInput?: (event: InputEvent) => void;
  onConfirm?: (event: InputEvent) => void;
  onFocus?: (event: InputEvent) => void;
  onBlur?: (event: InputEvent) => void;
}

export interface FormProps extends BaseProps {
  reportSubmit?: boolean;
  onSubmit?: (event: FormEvent) => void;
  onReset?: (event: FormEvent) => void;
}

export interface LabelProps extends BaseProps {
  for?: string;
}

export interface NavigatorProps extends BaseProps {
  url?: string;
  openType?: 'navigate' | 'redirect' | 'switchTab' | 'reLaunch' | 'navigateBack';
  delta?: number;
  appId?: string;
  path?: string;
  extraData?: Record<string, any>;
  version?: 'release' | 'trial';
  hoverClass?: string;
  hoverStopPropagation?: boolean;
  hoverStartTime?: number;
  hoverStayTime?: number;
}

export interface WebViewProps extends BaseProps {
  src?: string;
  onMessage?: (event: GenericEvent) => void;
}

export interface ScrollViewProps extends BaseProps {
  scrollX?: boolean;
  scrollY?: boolean;
  upperThreshold?: number;
  lowerThreshold?: number;
  scrollTop?: number;
  scrollLeft?: number;
  scrollIntoView?: string;
  scrollWithAnimation?: boolean;
  enableBackToTop?: boolean;
  enhanced?: boolean;
  showScrollbar?: boolean;
  bounces?: boolean;
  pagingEnabled?: boolean;
  enableFlex?: boolean;
  scrollBoundary?: 'both' | 'start' | 'end';
  onScroll?: (event: GenericEvent) => void;
  onScrollToUpper?: (event: GenericEvent) => void;
  onScrollToLower?: (event: GenericEvent) => void;
}

export interface SwiperProps extends BaseProps {
  indicatorDots?: boolean;
  indicatorColor?: string;
  indicatorActiveColor?: string;
  autoplay?: boolean;
  interval?: number;
  duration?: number;
  circular?: boolean;
  vertical?: boolean;
  previousMargin?: string;
  nextMargin?: string;
  snapToEdge?: boolean;
  displayMultipleItems?: number;
  skipHiddenItemLayout?: boolean;
  onChange?: (event: GenericEvent) => void;
}

export interface SwiperItemProps extends BaseProps {}

export interface SwitchProps extends BaseProps {
  type?: 'switch' | 'checkbox';
  checked?: boolean;
  color?: string;
  onChange?: (event: GenericEvent) => void;
}

export interface RadioProps extends BaseProps {
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

export interface RadioGroupProps extends BaseProps {
  onChange?: (event: GenericEvent) => void;
}

export interface CheckboxProps extends BaseProps {
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
}

export interface CheckboxGroupProps extends BaseProps {
  onChange?: (event: GenericEvent) => void;
}

export interface PickerProps extends BaseProps {
  mode?: 'selector' | 'multiSelector' | 'time' | 'date' | 'region';
  range?: string[] | any[];
  rangeKey?: string;
  value?: number | number[];
  defaultValue?: number | number[];
  disabled?: boolean;
  indicatorStyle?: string;
  indicatorClassName?: string;
  maskStyle?: string;
  maskClassName?: string;
  onChange?: (event: GenericEvent) => void;
  onColumnChange?: (event: GenericEvent) => void;
}

export interface PickerViewProps extends BaseProps {
  value?: number[];
  indicatorStyle?: string;
  indicatorClassName?: string;
  maskStyle?: string;
  maskClassName?: string;
  onChange?: (event: GenericEvent) => void;
}

export interface PickerViewColumnProps extends BaseProps {}

export interface SliderProps extends BaseProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  value?: number;
  activeColor?: string;
  backgroundColor?: string;
  blockSize?: number;
  blockColor?: string;
  showValue?: boolean;
  onChange?: (event: GenericEvent) => void;
  onChanging?: (event: GenericEvent) => void;
}

export interface ProgressProps extends BaseProps {
  percent?: number;
  showInfo?: boolean;
  strokeWidth?: number;
  color?: string;
  activeColor?: string;
  backgroundColor?: string;
  active?: boolean;
  activeMode?: 'backwards' | 'forwards';
}

export interface VideoProps extends BaseProps {
  src?: string;
  poster?: string;
  initialTime?: number;
  duration?: number;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  pageGesture?: boolean;
  direction?: number;
  showProgress?: boolean;
  showFullscreenBtn?: boolean;
  showPlayBtn?: boolean;
  showCenterPlayBtn?: boolean;
  enableProgressGesture?: boolean;
  objectFit?: 'contain' | 'fill' | 'cover';
  controlsPosition?: 'bottom' | 'top';
  onPlay?: (event: GenericEvent) => void;
  onPause?: (event: GenericEvent) => void;
  onEnded?: (event: GenericEvent) => void;
  onTimeUpdate?: (event: GenericEvent) => void;
  onFullscreenChange?: (event: GenericEvent) => void;
  onWaiting?: (event: GenericEvent) => void;
  onError?: (event: GenericEvent) => void;
  children?: React.ReactNode;
}

export interface CanvasProps extends BaseProps {
  type?: string;
  canvasId?: string;
  id?: string;
  onTouchStart?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchCancel?: (event: TouchEvent) => void;
}

export interface CameraProps extends BaseProps {
  mode?: 'normal' | 'scanCode';
  devicePosition?: 'front' | 'back';
  flash?: 'auto' | 'on' | 'off';
  frameSize?: 'small' | 'medium' | 'large';
  onStop?: (event: GenericEvent) => void;
  onError?: (event: GenericEvent) => void;
}

export interface MapProps extends BaseProps {
  longitude?: number;
  latitude?: number;
  scale?: number;
  markers?: any[];
  covers?: any[];
  polyline?: any[];
  circle?: any[];
  controls?: any[];
  includePoints?: any[];
  showLocation?: boolean;
  polygons?: any[];
  subKey?: string;
  layerStyle?: number;
  enableZoom?: boolean;
  enableScroll?: boolean;
  enableRotate?: boolean;
  showScale?: boolean;
  enableSatellite?: boolean;
  enableTraffic?: boolean;
  onTap?: (event: GenericEvent) => void;
  onMarkerTap?: (event: GenericEvent) => void;
  onControlTap?: (event: GenericEvent) => void;
  onCalloutTap?: (event: GenericEvent) => void;
  onRegionChange?: (event: GenericEvent) => void;
}

export interface RichTextProps extends BaseProps {
  nodes?: string | any[];
}

export interface CoverViewProps extends BaseProps {}

export interface CoverImageProps extends BaseProps {
  src?: string;
}

export interface MovableAreaProps extends BaseProps {}

export interface MovableViewProps extends BaseProps {
  direction?: 'all' | 'vertical' | 'horizontal';
  inertia?: boolean;
  outOfBounds?: boolean;
  x?: number;
  y?: number;
  damping?: number;
  friction?: number;
  disabled?: boolean;
  scale?: boolean;
  scaleMin?: number;
  scaleMax?: number;
  scaleValue?: number;
  animation?: boolean;
  onChange?: (event: GenericEvent) => void;
  onScale?: (event: GenericEvent) => void;
}

export interface IconProps extends BaseProps {
  type?: string;
  size?: number;
  color?: string;
}

export interface MatchMediaProps extends BaseProps {
  minWidth?: number;
  maxWidth?: number;
  width?: number;
  minHeight?: number;
  maxHeight?: number;
  height?: number;
  orientation?: 'portrait' | 'landscape';
  onChange?: (event: GenericEvent) => void;
}

export interface PageContainerProps extends BaseProps {
  show?: boolean;
  duration?: number;
  zIndex?: number;
  overlay?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left';
  closeOnSlideDown?: boolean;
  onShow?: (event: GenericEvent) => void;
  onHide?: (event: GenericEvent) => void;
}

export interface ShareElementProps extends BaseProps {
  key?: string;
  onTransitionEnd?: (event: GenericEvent) => void;
}

export interface RootPortalProps extends BaseProps {}

export interface PageMetaProps extends BaseProps {
  backgroundTextStyle?: 'dark' | 'light';
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText?: string;
  navigationBarBackgroundColor?: string;
  backgroundColor?: string;
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  pageOrientation?: 'portrait' | 'landscape';
}

export interface AdProps extends BaseProps {
  adUnitId?: string;
  adIntervals?: number;
  onLoad?: (event: GenericEvent) => void;
  onError?: (event: GenericEvent) => void;
  onClose?: (event: GenericEvent) => void;
}
