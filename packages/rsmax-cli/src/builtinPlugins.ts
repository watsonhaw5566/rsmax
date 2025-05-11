import errorScreen from '@rsmax/plugin-error-screen';
// import devtools from '@rsmax/plugin-devtools';
import type { Options, Plugin } from '@rsmax/types';

export const builtinPlugins = (
  options: Options
): Array<{
  optionKey: string;
  init: (...args: any[]) => Plugin;
}> => {
  // const isDev = process.env.NODE_ENV !== 'production';
  const plugins = [
    {
      optionKey: 'errorScreen',
      init: errorScreen,
    },
  ];
  // if (options.target !== 'web' && isDev && options.devtools) {
  //   plugins.push({
  //     optionKey: 'devtools',
  //     init: devtools,
  //   });
  // }
  return plugins;
};
