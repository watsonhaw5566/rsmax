import path from 'node:path';
import { type Configuration } from '@rspack/core';
import { RspackChain as Config } from 'rspack-chain';
import { targetExtensions } from '../../extensions';
import type Builder from '../Builder';
import baseConfig from './baseConfig';
import { cssConfig } from './config/css';
import * as RsmaxPlugins from './plugins';
import {
  configureSwc,
  configureBabel,
  configureNativeComponent,
  configureAssets,
  configureRuntimeOptions,
  configureCommonPlugins,
} from './config/miniShared';

export default function rspackConfig(builder: Builder): Configuration {
  const config = new Config();

  baseConfig(config, builder);

  const meta = builder.api.getMeta();

  const { entries } = builder.entryCollection;

  entries.forEach((e: any) => {
    config.plugin(`rspack-virtual-modules${e.name}`).use(e.virtualModule);
    config.entry(e.name).add(e.virtualPath);
  });

  config.devtool(false);

  config.resolve.extensions.merge(targetExtensions(builder.target));

  config.output.filename('[name].js');
  config.output.globalObject(meta.global);
  config.output.publicPath('/');
  config.output.library({ type: 'commonjs2' });
  config.optimization.runtimeChunk({ name: 'runtime' });
  config.optimization.splitChunks({
    cacheGroups: {
      rsmaxVendors: {
        name: 'rsmax-vendors',
        test: /[\\/]node_modules[\\/]/,
        chunks: 'initial',
        minChunks: 2,
        minSize: 0,
      },
    },
  });
  config.optimization.minimize(false);

  configureSwc(config);
  configureBabel(config, builder);
  configureNativeComponent(config, builder);

  cssConfig(config, builder, false);

  configureAssets(config);

  configureRuntimeOptions(
    config,
    builder,
    path.resolve(__dirname, '../../../template/component-runtime-options.js.ejs')
  );

  config.externals([
    {
      '/__rsmax_runtime_options__': './__rsmax_runtime_options__',
    },
  ]);

  config.plugin('rsmax-component-asset-plugin').use(RsmaxPlugins.ComponentAsset, [builder]);

  configureCommonPlugins(config, builder);

  return config.toConfig();
}
