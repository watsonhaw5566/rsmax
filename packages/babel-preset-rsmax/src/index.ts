import { declare } from '@babel/helper-plugin-utils';
import type { Platform } from '@rsmax/types';
import hostComponent from './plugins/hostComponent';
import * as Lifecycle from './plugins/lifecycle';

interface HostComponentOptions {
  target: Platform;
  hostComponents: Map<string, any>;
  skipHostComponents: string[];
  skipProps: string[];
  includeProps: string[];
}

interface LifecycleOptions {
  app?: {
    test: (file: string) => boolean;
  };
  page?: {
    test: (file: string) => boolean;
  };
}

interface PresetOption {
  react?: boolean | { [key: string]: any };
  decorators?: any;
  'class-properties'?: any;
  'throw-if-namespace'?: boolean;
  target?: any;
  hostComponent?: false | HostComponentOptions;
  lifecycle?: false | LifecycleOptions;
}

function preset(api: any, presetOption: PresetOption) {
  api.assertVersion(7);

  const react = typeof presetOption.react === 'undefined' ? true : presetOption.react;
  const throwIfNamespace =
    typeof presetOption['throw-if-namespace'] === 'undefined' ? false : presetOption['throw-if-namespace'];
  const targets =
    typeof presetOption.target === 'undefined'
      ? ['chrome >= 49', 'firefox >= 64', 'ios >= 8', 'Android > 4.4']
      : presetOption.target;

  const presets: any[] = [[require.resolve('@babel/preset-env'), { targets }]];

  if (react) {
    const defaultReactOpt = { throwIfNamespace, runtime: 'automatic' };
    const reactOpts = typeof react === 'boolean' ? defaultReactOpt : Object.assign(defaultReactOpt, react);
    presets.push([require.resolve('@babel/preset-react'), reactOpts]);
  }

  const plugins: any[] = [];

  if (presetOption.lifecycle !== false) {
    const lifecycleOpts = presetOption.lifecycle || {};
    if (lifecycleOpts.app) {
      plugins.push(Lifecycle.app(lifecycleOpts.app));
    }
    if (lifecycleOpts.page) {
      plugins.push(Lifecycle.page(lifecycleOpts.page));
    }
  }

  if (presetOption.hostComponent !== false && presetOption.hostComponent) {
    plugins.push(hostComponent(presetOption.hostComponent));
  }

  return {
    presets,
    plugins,
  };
}

export default declare(preset);

export { default as hostComponent } from './plugins/hostComponent';
export { app as lifecycleApp, page as lifecyclePage } from './plugins/lifecycle';
