import { createUnifiedComponent, createComponents } from './ComponentFactory';

import type { ViewProps } from './View/props';
import type { TextProps } from './Text/props';
import type { ImageProps } from './Image/props';
import type { ButtonProps } from './Button/props';
import type { InputProps } from './Input/props';
import type { TextareaProps } from './Textarea/props';
import type { FormProps } from './Form/props';
import type { LabelProps } from './Label/props';
import type { NavigatorProps } from './Navigator/props';
import type { WebViewProps } from './WebView/props';

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
};

export { createUnifiedComponent, createComponents };
