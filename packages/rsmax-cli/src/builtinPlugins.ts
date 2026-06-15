import errorScreen from '@rsmax/plugin-error-screen';
import type { Options, Plugin } from '@rsmax/types';

export const builtinPlugins = (
  options: Options
): Array<{
  optionKey: string;
  init: (...args: any[]) => Plugin;
}> => {
  const plugins = [
    {
      optionKey: 'errorScreen',
      init: errorScreen,
    },
  ];
  return plugins;
};
