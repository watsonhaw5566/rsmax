import type React from 'react';
import createHostComponent from '../../createHostComponent';
import type ViewProps from './props';
import defaults from './props/default';

export type { ViewProps };

const View: React.ComponentType<ViewProps> = createHostComponent<ViewProps>('view', null, defaults);

export default View;
