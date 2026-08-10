import { declare } from '@babel/helper-plugin-utils';
import hostComponent from './plugins/host-component';
import * as lifecycle from './plugins/lifecycle';

interface PresetOption {
  react?: boolean | { [key: string]: any };
  typescript?: boolean | { [key: string]: any };
  decorators?: any;
  'class-properties'?: any;
  'throw-if-namespace'?: boolean;
  target?: any;
}

function preset(api: any, presetOption: PresetOption) {
  api.assertVersion(7);

  const react = typeof presetOption.react === 'undefined' ? true : presetOption.react;
  const typescript = typeof presetOption.typescript === 'undefined' ? true : presetOption.typescript;
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

  if (typescript) {
    const defaultTsOpt = { isTSX: true, allExtensions: true };
    const tsOpts = typeof typescript === 'boolean' ? defaultTsOpt : Object.assign(defaultTsOpt, typescript);
    presets.push([require.resolve('@babel/preset-typescript'), tsOpts]);
  }

  return {
    presets,
    plugins: [],
  };
}

export default declare(preset);
export { hostComponent, lifecycle };
