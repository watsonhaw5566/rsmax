import { createHostComponent } from '@rsmax/runtime';
import type React from 'react';

export interface FunctionalPageNavigatorProps {
  target?: string;
  url?: string;
  args?: any;
  version?: 'develop' | 'trial' | 'release';
  onSuccess?: (e: any) => void;
  onFail?: (e: any) => void;
  onCancel?: (e: any) => void;
  children?: React.ReactNode;
}

export const FunctionalPageNavigator = createHostComponent<FunctionalPageNavigatorProps>(
  'functional-page-navigator'
) as React.ComponentType<FunctionalPageNavigatorProps>;

FunctionalPageNavigator.defaultProps = {
  version: 'release',
};
