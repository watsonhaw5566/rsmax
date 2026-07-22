import type { Platform } from '../../types';

type ComponentProps = Record<string, Record<string, any>>;

export const platformComponentProps: ComponentProps = {
  View: {},
  Text: {},
  Image: { mode: 'aspectFill' },
  Button: { type: 'primary', size: 'default' },
  Input: { type: 'text' },
  Textarea: {},
  Form: {},
  Label: {},
  Navigator: { openType: 'navigate' },
  WebView: {},
  ScrollView: {},
  Swiper: { indicatorDots: false, autoplay: false, circular: false, vertical: false },
  SwiperItem: {},
  Switch: { type: 'switch' },
  Radio: {},
  RadioGroup: {},
  Checkbox: {},
  CheckboxGroup: {},
  Picker: { mode: 'selector' },
  PickerView: {},
  PickerViewColumn: {},
  Slider: { min: 0, max: 100, step: 1 },
  Progress: { percent: 0, showInfo: false, strokeWidth: 6 },
  Video: { controls: true },
  Canvas: {},
  Camera: { mode: 'normal', devicePosition: 'back', flash: 'auto' },
  Map: { scale: 16, showLocation: false },
  RichText: {},
  CoverView: {},
  CoverImage: {},
  MovableArea: {},
  MovableView: { direction: 'all' },
  Icon: {},
  MatchMedia: {},
  PageContainer: { show: false, duration: 300, zIndex: 1000, overlay: true, position: 'bottom' },
  ShareElement: {},
  RootPortal: {},
  PageMeta: {},
  Ad: {},
};

export const currentPlatform: Platform = 'ali';
export default platformComponentProps;
