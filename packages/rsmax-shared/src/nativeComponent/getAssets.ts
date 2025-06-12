import type { Meta, Options } from '@rsmax/types';
import jsHelper from './jsHelper';
import json from './json';
import jsModule from './modules';
import style from './style';
import template from './template';
import usingComponents from './usingComponents';

export default function getAssets(platformConfig: Meta, resourcePath: string, options: Options) {
  const assets: string[] = [
    ...jsModule(options, resourcePath),
    ...jsHelper(platformConfig, resourcePath),
    ...style(platformConfig, resourcePath),
    ...json(resourcePath),
    ...template(platformConfig, options, resourcePath),
    ...usingComponents(resourcePath, options).reduce<string[]>(
      (acc, id) => [...acc, ...getAssets(platformConfig, id, options)],
      []
    ),
  ];

  return assets;
}
