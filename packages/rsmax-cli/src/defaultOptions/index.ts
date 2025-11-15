import type { Options } from '@rsmax/types';
import UNSAFE_wechatTemplateDepth from './UNSAFE_wechatTemplateDepth';

export function getDefaultOptions(): Options {
  return {
    pxToRpx: true,
    cwd: process.cwd(),
    progress: true,
    output: 'dist',
    rootDir: 'src',
    UNSAFE_wechatTemplateDepth,
    plugins: [],
    notify: false,
    web: {
      mpa: false,
      excludeNodeModulesTransform: false,
    },
    errorScreen: false,
    spm: false,
  };
}
