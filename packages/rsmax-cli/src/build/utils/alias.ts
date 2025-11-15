import * as path from 'node:path';
import { slash } from '@rsmax/shared';
import type { Options, Platform } from '@rsmax/types';

interface Alias {
  [key: string]: string;
}

const resolveReact = (options: Options): string => {
  let react: string;
  const isSilent = process.env.NODE_ENV === 'test' || process.env.RSMAX_SILENT === 'true';
  try {
    react = require.resolve(`${options.cwd}/node_modules/react/`);
  } catch (e) {
    react = require.resolve('react');
    if (!isSilent) {
      console.warn(`Can't resolve react in ${options.cwd}!`);
    }
  }
  return path.dirname(slash(react));
};

export default (options: Options, target: Platform) => {
  const config: Alias = {
    // 防止 link 开发时加载多个 React
    '@': path.resolve(options.cwd, options.rootDir),
    react: resolveReact(options),
    'react-reconciler': 'react-reconciler/cjs/react-reconciler.production.min.js',
    '@rsmax/runtime': require.resolve('@rsmax/runtime'),
    '@rsmax/shared': require.resolve('@rsmax/shared'),
  };

  if (target !== 'web') {
    config['react-dom'] = '@rsmax/runtime';
  }

  return config;
};
