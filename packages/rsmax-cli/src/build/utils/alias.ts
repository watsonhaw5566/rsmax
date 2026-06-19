import * as path from 'node:path';
import { slash } from '@rsmax/shared';
import type { Options, Platform } from '@rsmax/types';
import { logger } from 'rslog';

interface Alias {
  [key: string]: string;
}

const resolveReact = (options: Options): string => {
  let react: string;
  try {
    react = require.resolve(`${options.cwd}/node_modules/react/`);
  } catch (e) {
    react = require.resolve('react');
    logger.debug(`Can't resolve react in ${options.cwd}, fallback to global react.`);
  }
  return path.dirname(slash(react));
};

export default (options: Options, target: Platform) => {
  const config: Alias = {
    'regenerator-runtime': require.resolve('regenerator-runtime'),
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
