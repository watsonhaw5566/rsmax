import { createHostComponent } from '@rsmax/runtime';

export interface CheckboxProps {
  readonly dataset?: DOMStringMap;
  id?: string;
  name?: string;
  className?: string;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  onChange?: (e: any) => void;
}

export const Checkbox = createHostComponent<CheckboxProps>('checkbox') as React.ComponentType<CheckboxProps>;
