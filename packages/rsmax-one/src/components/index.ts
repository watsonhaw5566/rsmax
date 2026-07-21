import { createUnifiedComponent } from './ComponentFactory';
import type {
  ViewProps,
  TextProps,
  ImageProps,
  ButtonProps,
  InputProps,
  TextareaProps,
  FormProps,
  LabelProps,
  NavigatorProps,
  WebViewProps,
  ScrollViewProps,
  SwiperProps,
  SwiperItemProps,
  SwitchProps,
  RadioProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  PickerProps,
  PickerViewProps,
  PickerViewColumnProps,
  SliderProps,
  ProgressProps,
  VideoProps,
  CanvasProps,
  CameraProps,
  MapProps,
  RichTextProps,
  CoverViewProps,
  CoverImageProps,
  MovableAreaProps,
  MovableViewProps,
  IconProps,
  MatchMediaProps,
  PageContainerProps,
  ShareElementProps,
  RootPortalProps,
  PageMetaProps,
  AdProps,
} from '../types';

export const View = createUnifiedComponent<ViewProps>('View');
export const Text = createUnifiedComponent<TextProps>('Text');
export const Image = createUnifiedComponent<ImageProps>('Image');
export const Button = createUnifiedComponent<ButtonProps>('Button');
export const Input = createUnifiedComponent<InputProps>('Input');
export const Textarea = createUnifiedComponent<TextareaProps>('Textarea');
export const Form = createUnifiedComponent<FormProps>('Form');
export const Label = createUnifiedComponent<LabelProps>('Label');
export const Navigator = createUnifiedComponent<NavigatorProps>('Navigator');
export const WebView = createUnifiedComponent<WebViewProps>('WebView');
export const ScrollView = createUnifiedComponent<ScrollViewProps>('ScrollView');
export const Swiper = createUnifiedComponent<SwiperProps>('Swiper');
export const SwiperItem = createUnifiedComponent<SwiperItemProps>('SwiperItem');
export const Switch = createUnifiedComponent<SwitchProps>('Switch');
export const Radio = createUnifiedComponent<RadioProps>('Radio');
export const RadioGroup = createUnifiedComponent<RadioGroupProps>('RadioGroup');
export const Checkbox = createUnifiedComponent<CheckboxProps>('Checkbox');
export const CheckboxGroup = createUnifiedComponent<CheckboxGroupProps>('CheckboxGroup');
export const Picker = createUnifiedComponent<PickerProps>('Picker');
export const PickerView = createUnifiedComponent<PickerViewProps>('PickerView');
export const PickerViewColumn = createUnifiedComponent<PickerViewColumnProps>('PickerViewColumn');
export const Slider = createUnifiedComponent<SliderProps>('Slider');
export const Progress = createUnifiedComponent<ProgressProps>('Progress');
export const Video = createUnifiedComponent<VideoProps>('Video');
export const Canvas = createUnifiedComponent<CanvasProps>('Canvas');
export const Camera = createUnifiedComponent<CameraProps>('Camera');
export const Map = createUnifiedComponent<MapProps>('Map');
export const RichText = createUnifiedComponent<RichTextProps>('RichText');
export const CoverView = createUnifiedComponent<CoverViewProps>('CoverView');
export const CoverImage = createUnifiedComponent<CoverImageProps>('CoverImage');
export const MovableArea = createUnifiedComponent<MovableAreaProps>('MovableArea');
export const MovableView = createUnifiedComponent<MovableViewProps>('MovableView');
export const Icon = createUnifiedComponent<IconProps>('Icon');
export const MatchMedia = createUnifiedComponent<MatchMediaProps>('MatchMedia');
export const PageContainer = createUnifiedComponent<PageContainerProps>('PageContainer');
export const ShareElement = createUnifiedComponent<ShareElementProps>('ShareElement');
export const RootPortal = createUnifiedComponent<RootPortalProps>('RootPortal');
export const PageMeta = createUnifiedComponent<PageMetaProps>('PageMeta');
export const Ad = createUnifiedComponent<AdProps>('Ad');

export type {
  ViewProps,
  TextProps,
  ImageProps,
  ButtonProps,
  InputProps,
  TextareaProps,
  FormProps,
  LabelProps,
  NavigatorProps,
  WebViewProps,
  ScrollViewProps,
  SwiperProps,
  SwiperItemProps,
  SwitchProps,
  RadioProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  PickerProps,
  PickerViewProps,
  PickerViewColumnProps,
  SliderProps,
  ProgressProps,
  VideoProps,
  CanvasProps,
  CameraProps,
  MapProps,
  RichTextProps,
  CoverViewProps,
  CoverImageProps,
  MovableAreaProps,
  MovableViewProps,
  IconProps,
  MatchMediaProps,
  PageContainerProps,
  ShareElementProps,
  RootPortalProps,
  PageMetaProps,
  AdProps,
};

export { createUnifiedComponent, componentConfigs, platformComponentProps, currentPlatform } from './ComponentFactory';
