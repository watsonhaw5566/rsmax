import fs from 'node:fs';
import path from 'node:path';
import { execute } from '@rsdoctor/cli';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { Options } from '@rsmax/types';
import { type Configuration, rspack } from '@rspack/core';
import hostComponent from 'babel-plugin-rsmax-host-component';
import * as Lifecycle from 'babel-plugin-rsmax-lifecycle';
import fixRegeneratorRuntime from 'babel-plugin-rsmax-regenerator-runtime';
import * as TurboRender from 'babel-plugin-rsmax-turbo-render';
import ejs from 'ejs';
import { logger } from 'rslog';
import Config from 'rspack-chain';
import { moduleMatcher, targetExtensions } from '../../extensions';
import type Builder from '../Builder';
import NativeEntry from '../entries/NativeEntry';
import baseConfig from './baseConfig';
import { type RuleConfig, addCSSRule, cssConfig } from './config/css';
import * as RsmaxPlugins from './plugins';

function resolveBabelConfig(options: Options) {
  if (fs.existsSync(path.join(options.cwd, 'babel.config.js'))) {
    return path.join(options.cwd, 'babel.config.js');
  }
  return false;
}

export default function webpackConfig(builder: Builder): Configuration {
  const config = new Config();

  baseConfig(config, builder);

  const meta = builder.api.getMeta();

  const { entries } = builder.entryCollection;

  entries.forEach(e => {
    config.plugin(`rspack-virtual-modules${e.name}`).use(e.virtualModule);
    config.entry(e.name).add(e.virtualPath);
  });

  config.devtool(false);

  config.resolve.extensions.merge(targetExtensions(builder.target));

  config.output.filename('[name].js');
  config.output.globalObject(meta.global);
  config.output.publicPath('/');
  config.output.libraryTarget('commonjs2');
  config.optimization.runtimeChunk({ name: 'runtime' });
  config.optimization.moduleIds('deterministic');
  config.optimization.chunkIds('deterministic');
  config.optimization.splitChunks({
    cacheGroups: {
      rsmaxVendors: {
        name: 'rsmax-vendors',
        test: moduleMatcher,
        chunks: 'initial',
        minChunks: 2,
        minSize: 0,
      },
    },
  });
  config.optimization.minimize(false);

  if (builder.options.turboRenders) {
    const options = {
      isHostComponentPackage: (pkg: string) => pkg.startsWith('rsmax'),
    };
    // turbo pages
    config.module
      .rule('turbo-page')
      .pre()
      .test(moduleMatcher)
      .exclude.add(/react-reconciler/)
      .end()
      .use('turbo-page-render')
      .loader('babel')
      .options({
        usePlugins: [TurboRender.extractTemplate(options)],
        reactPreset: false,
      })
      .end()
      .use('turbo-page-preprocess')
      .loader('babel')
      .options({
        usePlugins: [TurboRender.preprocess(options)],
        reactPreset: false,
      });
  }

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
    .options({
      babelrc: false,
      configFile: resolveBabelConfig(builder.options),
      usePlugins: [
        Lifecycle.page({
          test: (file: any) => {
            const importer = slash(file);
            const root = builder.projectPath.srcDir();
            return importer.startsWith(root);
          },
        }),
        hostComponent({
          target: builder.target,
          hostComponents: Store.registeredHostComponents,
          skipHostComponents: Store.skipHostComponents,
          skipProps: [TurboRender.LEAF, TurboRender.ENTRY],
          includeProps: [TurboRender.TEMPLATE_ID],
        }),
        fixRegeneratorRuntime(),
      ],
      reactPreset: true,
      api: builder.api,
      compact: process.env.NODE_ENV === 'production',
    });

  config.module.rule('native-component').test(moduleMatcher).use('native-component').loader('nativeComponent').options({
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
    path.resolve(__dirname, '../../../template/component-runtime-options.js.ejs'),
    'utf-8'
  );
  const runtimeOptionsPath = slash('node_modules/@rsmax/apply-runtime-options.js');

  entries.forEach(entry => {
    if (!(entry instanceof NativeEntry)) {
      config.entry(entry.name).prepend('@rsmax/apply-runtime-options');
    }
  });

  const runtimeOptions = {
    pxToRpx: builder.options.pxToRpx,
    debug: !!process.env.RSMAX_DEBUG,
    platform: builder.target,
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

  config.externals([
    {
      '/__rsmax_runtime_options__': './__rsmax_runtime_options__',
    },
  ]);

  config.plugin('rspackbar').use(rspack.ProgressPlugin);
  config.plugin('mini-css-extract-plugin').use(rspack.CssExtractRspackPlugin, [{ filename: `[name]${meta.style}` }]);
  config.plugin('rsmax-optimize-entries-plugin').use(RsmaxPlugins.OptimizeEntries, [meta]);
  config.plugin('rsmax-runtime-options-plugin').use(RsmaxPlugins.RuntimeOptions, [builder]);
  config.plugin('rsmax-page-asset-plugin').use(RsmaxPlugins.PageAsset, [builder]);
  config.plugin('rsmax-coverage-ignore-plugin').use(RsmaxPlugins.CoverageIgnore);
  config.plugin('rsmax-component-asset-plugin').use(RsmaxPlugins.ComponentAsset, [builder]);
  config.plugin('rsmax-native-asset-plugin').use(RsmaxPlugins.NativeAsset, [builder]);

  if (builder.options.analyze) {
    config.plugin('rspack-bundle-analyzer').use(RsdoctorRspackPlugin, [
      {
        disableClientServer: true,
      },
    ]);
    setTimeout(() => {
      execute('analyze', {
        profile: `./${builder.options.output}/.rsdoctor/manifest.json`,
      }).then(r => {
        logger.success('已生成分析报告');
      });
    }, 5000);
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

  return config.toConfig();
}
