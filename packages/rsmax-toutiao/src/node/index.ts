import * as path from 'node:path';
import type { PluginConstructor } from '@rsmax/types';
import hostComponents from '../hostComponents/node';

const EJS_TPL_ROOT = path.join(__dirname, '../../templates');

const plugin: PluginConstructor = () => {
  return {
    meta: {
      global: 'tt',
      template: {
        extension: '.ttml',
        tag: 'import',
        src: 'src',
      },
      style: '.ttss',
      jsHelper: {
        extension: '.sjs',
        tag: 'sjs',
        src: 'src',
      },
      ejs: {
        base: path.join(EJS_TPL_ROOT, 'base.ejs'),
        page: path.join(EJS_TPL_ROOT, 'page.ejs'),
      },
    },
    hostComponents,
    skipHostComponents: ['swiper-item'],
  };
};

export default plugin;
