import fs from 'node:fs';
import path from 'node:path';

import { type Configuration, rspack } from '@rspack/core';

import { slash } from '@rsmax/shared';
import ejs from 'ejs';
import Config from 'rspack-chain';
import type API from '../../API';
import { moduleMatcher, targetExtensions } from '../../extensions';
import type Builder from '../Builder';
import baseConfig from './baseConfig';
import { getBabelLoaderOptions } from './config/babel';
import { type RuleConfig, addCSSRule, cssConfig } from './config/css';
import * as RsmaxPlugins from './plugins';

function prepare(api: API) {
  const meta = api.getMeta();

  const publicPath = '/';

  return {
    meta,
    publicPath,
  };
}

export default function webpackConfig(builder: Builder): Configuration {
  const config = new Config();

  baseConfig(config, builder);
  const { meta, publicPath } = prepare(builder.api);

  const appEntry = builder.entryCollection.appEntry!;
  config.plugin(`rspack-virtual-modules${appEntry.name}`).use(appEntry.virtualModule);
  config.entry(appEntry.name).add(appEntry.virtualPath);
  builder.entryCollection.entries.forEach(e => {
    config.plugin(`rspack-virtual-modules${e.name}`).use(e.virtualModule);
    config.entry(e.name).add(e.virtualPath);
  });
  config.devtool(false);
  config.resolve.extensions.merge(targetExtensions(builder.target));
  config.output.filename('[name].js');
  config.output.globalObject(meta.global);
  config.output.publicPath(publicPath);
  config.optimization.runtimeChunk({ name: 'runtime' });
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
        test: moduleMatcher,
        chunks: 'initial',
        minChunks: 2,
        minSize: 0,
        priority: 2,
      },
    },
  });
  config.optimization.minimize(false);

  config.module
    .rule('swc-js')
    .type('javascript/auto')
    .test(/\.(js|jsx|mjs)$/)
    .exclude.add(/react-reconciler/)
    .end()
    .use('swc-loader')
    .loader('builtin:swc-loader')
    .options({
      jsc: {
        parser: {
          syntax: 'ecmascript',
          jsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
        target: 'es2015',
        loose: true,
        externalHelpers: true,
        keepClassNames: true,
      },
    });

  config.module
    .rule('swc-ts')
    .type('javascript/auto')
    .test(/\.(ts|tsx)$/)
    .exclude.add(/react-reconciler/)
    .end()
    .use('swc-loader')
    .loader('builtin:swc-loader')
    .options({
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: true,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          react: {
            runtime: 'automatic',
          },
        },
        target: 'es2015',
        loose: true,
        externalHelpers: true,
        keepClassNames: true,
      },
    });

  config.module
    .rule('js')
    .test(moduleMatcher)
    .exclude.add(/react-reconciler/)
    .end()
    .use('babel')
    .loader('babel')
    .options(getBabelLoaderOptions(builder, true))
    .end()
    .use('native-component')
    .loader('nativeComponent')
    .options({
      builder,
    });

  cssConfig(config, builder, false);

  config.module
    .rule('image-sources')
    .test(/\.(png|jpe?g|gif|svg)$/i)
    .type('asset')
    .parser({
      dataUrlCondition: {
        maxSize: 8 * 1024,
      },
    });
  config.module
    .rule('font-sources')
    .test(/\.(ttf|eot|woff|woff2)$/)
    .type('asset/resource');

  const runtimeOptionsTemplate = fs.readFileSync(
    path.resolve(__dirname, '../../../template/app-runtime-options.js.ejs'),
    'utf-8'
  );
  const runtimeOptionsPath = slash('node_modules/@rsmax/apply-runtime-options.js');
  config.entry(appEntry!.name).prepend('@rsmax/apply-runtime-options');

  const runtimeOptions = {
    pxToRpx: builder.options.pxToRpx,
    debug: !!process.env.RSMAX_DEBUG,
    platform: builder.options.target,
    pluginFiles: builder.api.getRuntimePluginFiles(),
    hostComponents: '[]',
    pageEvents: '{}',
    appEvents: '[]',
  };

  const virtualModules = new rspack.experiments.VirtualModulesPlugin({
    [runtimeOptionsPath]: ejs.render(runtimeOptionsTemplate, runtimeOptions, { debug: false }),
  });
  config.plugin('rspack-virtual-modules').use(virtualModules);

  if (fs.existsSync(builder.projectPath.publicDir())) {
    config.plugin('rspack-copy-plugin').use(rspack.CopyRspackPlugin, [
      {
        patterns: [
          {
            from: builder.projectPath.publicDir(),
            to: builder.projectPath.outputDir(),
          },
        ],
      },
    ]);
  }
  config.plugin('rspackbar').use(rspack.ProgressPlugin);
  config.plugin('mini-css-extract-plugin').use(rspack.CssExtractRspackPlugin, [{ filename: `[name]${meta.style}` }]);
  config.plugin('rsmax-optimize-entries-plugin').use(RsmaxPlugins.OptimizeEntries, [meta]);
  config.plugin('rsmax-app-asset-plugin').use(RsmaxPlugins.AppAsset, [builder]);
  config.plugin('rsmax-page-asset-plugin').use(RsmaxPlugins.PageAsset, [builder]);
  config.plugin('rsmax-theme-asset-plugin').use(RsmaxPlugins.ThemeAsset, [builder]);
  config.plugin('rsmax-runtime-options-plugin').use(RsmaxPlugins.RuntimeOptions, [builder]);
  config.plugin('rsmax-coverage-ignore-plugin').use(RsmaxPlugins.CoverageIgnore);
  config.plugin('rsmax-native-asset-plugin').use(RsmaxPlugins.NativeAsset, [builder]);
  if (builder.target === 'wechat') {
    config.plugin('rsmax-wechat-recompile-plugin').use(RsmaxPlugins.WeChatRecompile, [builder]);
  }

  const context = {
    config,
    rspack,
    addCSSRule: (ruleConfig: RuleConfig) => {
      addCSSRule(config, builder, false, ruleConfig);
    },
  };

  if (typeof builder.options.configWebpack === 'function') {
    builder.options.configWebpack(context);
  }
  builder.api.configWebpack(context);

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
