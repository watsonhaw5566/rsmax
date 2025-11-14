import path from 'node:path';
import type { ConfigItem, PartialConfig } from '@babel/core';
import babelLoader from 'babel-loader';
import { merge } from 'lodash';
import type API from '../../../API';

interface CustomOptions {
  reactPreset: boolean;
  usePlugins: any[];
  api: API;
}

function processPresets(presets: ConfigItem[], babel: any, react: boolean) {
  const remaxPresetIndex = presets.findIndex(preset =>
    preset.file?.resolved.includes(`${path.sep}babel-preset-rsmax${path.sep}`)
  );

  if (!react) {
    return presets;
  }

  const defaultOptions = {
    react,
    targets: {},
  };

  const existOptions = remaxPresetIndex !== -1 ? presets[remaxPresetIndex].options : {};

  const remaxPreset = babel.createConfigItem(
    [require.resolve('babel-preset-rsmax'), merge({}, defaultOptions, existOptions)],
    {
      type: 'preset',
    }
  );

  if (remaxPresetIndex === -1) {
    presets.unshift(remaxPreset);
  } else {
    presets[remaxPresetIndex] = remaxPreset;
  }

  return presets;
}

export default babelLoader.custom((babelCore: any) => ({
  customOptions({ reactPreset, usePlugins, api, ...loaderOptions }: CustomOptions) {
    return {
      custom: {
        reactPreset,
        usePlugins,
        api,
      },
      loader: loaderOptions,
    };
  },

  config(cfg: PartialConfig, { customOptions }: { customOptions: CustomOptions }) {
    const { reactPreset, api, usePlugins } = customOptions;
    const presets = processPresets(cfg.options.presets as ConfigItem[], babelCore, reactPreset);
    const config = {
      ...cfg.options,
      presets,
      plugins: [...(cfg.options.plugins || []), ...(usePlugins || [])],
    };

    if (api) {
      api.configBabel({ config });
    }

    return config;
  },
}));
