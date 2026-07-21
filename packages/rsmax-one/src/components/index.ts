import { createUnifiedComponent, createComponents } from './ComponentFactory';

export { createUnifiedComponent, createComponents };

const components = createComponents();

export const View = components.View;
export const Text = components.Text;
export const Image = components.Image;
export const Button = components.Button;
export const Input = components.Input;
export const Textarea = components.Textarea;
export const Form = components.Form;
export const Label = components.Label;
export const Navigator = components.Navigator;
export const WebView = components.WebView;
