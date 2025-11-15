import type { ConfigItem, PartialConfig } from '@babel/core';
import babelLoader from 'babel-loader';
import type API from '../../../API';

interface CustomOptions {
  reactPreset: boolean;
  usePlugins: any[];
  api: API;
}

function processPresets(presets: ConfigItem[], babel: any, react: boolean) {
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
