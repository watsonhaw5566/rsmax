import fs from 'node:fs';
import path from 'node:path';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { Options } from '@rsmax/types';
import { rspack } from '@rspack/core';
import { hostComponent, lifecyclePage } from 'babel-preset-rsmax';
import babelPluginMacros from 'babel-plugin-macros';
import ejs from 'ejs';
import { RspackChain as Config } from 'rspack-chain';
import { moduleMatcher } from '../../../extensions';
import type Builder from '../../Builder';
import NativeEntry from '../../entries/NativeEntry';
import { addCSSRule, type RuleConfig } from './css';
import * as RsmaxPlugins from '../plugins';

export function resolveBabelConfig(options: Options) {
  if (fs.existsSync(path.join(options.cwd, 'babel.config.js'))) {
    return path.join(options.cwd, 'babel.config.js');
  }
  return false;
}

export function configureSwc(config: Config) {
  config.module
    .rule('swc')
    .type('javascript/auto')
    .test(moduleMatcher)
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
        target: 'es2018',
        loose: true,
        externalHelpers: true,
        keepClassNames: true,
      },
    });
}

export function configureBabel(config: Config, builder: Builder, extraPlugins: any[] = []) {
  const basePlugins = [
    babelPluginMacros,
    lifecyclePage({
      test: (file: string) => {
        const importer = slash(file);
        const root = builder.projectPath.srcDir();
        return importer.startsWith(root);
      },
    }),
    hostComponent({
      target: builder.target,
      hostComponents: Store.registeredHostComponents,
      skipHostComponents: Store.skipHostComponents,
      skipProps: [],
      includeProps: [],
    }),
    ...extraPlugins,
  ];

  config.module
    .rule('js')
    .test(moduleMatcher)
    .exclude.add(/react-reconciler/)
    .end()
    .use('babel')
    .loader('babel')
    .options({
      babelrc: false,
      configFile: resolveBabelConfig(builder.options),
      usePlugins: basePlugins,
      reactPreset: true,
      api: builder.api,
      compact: process.env.NODE_ENV === 'production',
    });
}

export function configureNativeComponent(config: Config, builder: Builder) {
  config.module.rule('native-component').test(moduleMatcher).use('native-component').loader('nativeComponent').options({
    builder,
  });
}

export function configureAssets(config: Config) {
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
}

export function configureRuntimeOptions(config: Config, builder: Builder, templatePath: string) {
  const runtimeOptionsTemplate = fs.readFileSync(templatePath, 'utf-8');
  const runtimeOptionsPath = slash('node_modules/@rsmax/apply-runtime-options.js');

  const runtimeOptions = {
    pxToRpx: builder.options.pxToRpx,
    debug: !!(builder.options.debug ?? process.env.RSMAX_DEBUG),
    platform: builder.target,
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

  builder.entryCollection.entries.forEach((entry: any) => {
    if (!(entry instanceof NativeEntry)) {
      config.entry(entry.name).prepend('@rsmax/apply-runtime-options');
    }
  });
}

export function configureCommonPlugins(config: Config, builder: Builder) {
  const meta = builder.api.getMeta();

  config.plugin('rspackbar').use(rspack.ProgressPlugin);
  config.plugin('mini-css-extract-plugin').use(rspack.CssExtractRspackPlugin, [{ filename: `[name]${meta.style}` }]);
  config.plugin('rsmax-optimize-entries-plugin').use(RsmaxPlugins.OptimizeEntries, [meta]);
  config.plugin('rsmax-runtime-options-plugin').use(RsmaxPlugins.RuntimeOptions, [builder]);
  config.plugin('rsmax-page-asset-plugin').use(RsmaxPlugins.PageAsset, [builder]);
  config.plugin('rsmax-coverage-ignore-plugin').use(RsmaxPlugins.CoverageIgnore);
  config.plugin('rsmax-native-asset-plugin').use(RsmaxPlugins.NativeAsset, [builder]);

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

  if (builder.options.analyze) {
    config.plugin('rsmax-rsdoctor-plugin').use(RsmaxPlugins.RsdoctorAnalyze, [{ output: builder.options.output }]);
  }
}

export function configureConfigRspack(config: Config, builder: Builder) {
  const context = {
    config,
    rspack,
    addCSSRule: (ruleConfig: RuleConfig) => {
      addCSSRule(config, builder, false, ruleConfig);
    },
  };

  if (typeof builder.options.configRspack === 'function') {
    builder.options.configRspack(context);
  }
  builder.api.configRspack(context);
}
