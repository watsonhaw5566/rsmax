import fs from 'node:fs';
import path from 'node:path';
import { slash } from '@rsmax/shared';
import { type Configuration, rspack } from '@rspack/core';
import moduleResolver from 'babel-plugin-module-resolver';
import { lifecycleApp } from 'babel-preset-rsmax';
import ejs from 'ejs';
import { RspackChain as Config } from 'rspack-chain';
import { targetExtensions } from '../../extensions';
import type Builder from '../Builder';
import baseConfig from './baseConfig';
import { addCSSRule, cssConfig } from './config/css';
import * as RsmaxPlugins from './plugins';
import {
  configureSwc,
  configureBabel,
  configureNativeComponent,
  configureAssets,
  configureCommonPlugins,
} from './config/miniShared';

function prepare(api: any) {
  const meta = api.getMeta();
  const publicPath = '/';
  return { meta, publicPath };
}

export default function rspackConfig(builder: Builder): Configuration {
  const config = new Config();

  baseConfig(config, builder);
  const { meta, publicPath } = prepare(builder.api);

  const appEntry = builder.entryCollection.appEntry!;
  config.plugin(`rspack-virtual-modules${appEntry.name}`).use(appEntry.virtualModule);
  config.entry(appEntry.name).add(appEntry.virtualPath);
  builder.entryCollection.entries.forEach((e: any) => {
    config.plugin(`rspack-virtual-modules${e.name}`).use(e.virtualModule);
    config.entry(e.name).add(e.virtualPath);
  });

  config.devtool(false);
  config.resolve.extensions.merge(targetExtensions(builder.target));
  config.output.filename('[name].js');
  config.output.globalObject(meta.global);
  config.output.publicPath(publicPath);
  config.optimization.runtimeChunk({ name: 'runtime' });
  config.optimization.usedExports(true);
  config.optimization.splitChunks({
    cacheGroups: {
      rsmaxStyles: {
        name: 'rsmax-styles',
        test: new RegExp(`(.css|.less|.sass|.scss|.stylus|.styl|${builder.api.meta.style})$`),
        chunks: 'initial',
        minChunks: 2,
        minSize: 0,
      },
      rsmaxVendors: {
        name: 'rsmax-vendors',
        test: /[\\/]node_modules[\\/]|[\\/]packages[\\/]rsmax[^\\/]*[\\/]((esm|cjs)[\\/]|[^\\/]*\.js$)/,
        chunks: 'initial',
        minChunks: 1,
        minSize: 0,
        priority: 2,
      },
    },
  });
  config.optimization.minimize(builder.options.minimize ?? true);

  configureSwc(config);

  configureBabel(config, builder, [
    lifecycleApp({
      test: (file: string) => appEntry!.filename === slash(file),
    }),
    [
      moduleResolver,
      {
        root: [`./${builder.options.rootDir}`],
        alias: {
          '/': './',
        },
      },
    ],
  ]);

  configureNativeComponent(config, builder);

  cssConfig(config, builder, false);

  configureAssets(config);

  const runtimeOptionsTemplate = fs.readFileSync(
    path.resolve(__dirname, '../../../template/app-runtime-options.js.ejs'),
    'utf-8'
  );
  const runtimeOptionsPath = slash('node_modules/@rsmax/apply-runtime-options.js');
  config.entry(appEntry!.name).prepend('@rsmax/apply-runtime-options');

  const runtimeOptions = {
    pxToRpx: builder.options.pxToRpx,
    debug: (builder.options.debug ?? process.env.RSMAX_DEBUG) ? true : false,
    platform: builder.options.target,
    pluginFiles: builder.api.getRuntimePluginFiles(),
    hostComponents: '[]',
    pageEvents: '{}',
    appEvents: '[]',
    renderer: builder.options.renderer || 'classic',
  };

  config.plugin('rspack-virtual-modules').use(rspack.experiments.VirtualModulesPlugin, [
    {
      [runtimeOptionsPath]: ejs.render(runtimeOptionsTemplate, runtimeOptions, {
        debug: false,
      }),
    },
  ]);

  config.plugin('rsmax-app-asset-plugin').use(RsmaxPlugins.AppAsset, [builder]);
  config.plugin('rsmax-theme-asset-plugin').use(RsmaxPlugins.ThemeAsset, [builder]);

  configureCommonPlugins(config, builder);

  if (builder.target === 'wechat') {
    config.plugin('rsmax-wechat-recompile-plugin').use(RsmaxPlugins.WeChatRecompile, [builder]);
  }

  const context = {
    config,
    rspack,
    addCSSRule: (ruleConfig: any) => {
      addCSSRule(config, builder, false, ruleConfig);
    },
  };

  if (typeof builder.options.configRspack === 'function') {
    builder.options.configRspack(context);
  }
  builder.api.configRspack(context);

  const externals = config.get('externals');

  const runtimeOptionsExternal = {
    '/__rsmax_runtime_options__': `require('/__rsmax_runtime_options__')`,
  };

  if (Array.isArray(externals)) {
    config.set('externals', [...externals, runtimeOptionsExternal]);
  } else {
    config.set('externals', {
      ...externals,
      ...runtimeOptionsExternal,
    });
  }

  return config.toConfig();
}
