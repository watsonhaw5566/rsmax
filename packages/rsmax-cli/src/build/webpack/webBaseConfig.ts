import { rspack } from '@rspack/core';
import Config from 'rspack-chain';
import { moduleMatcher, targetExtensions } from '../../extensions';
import { addCSSRule, cssConfig, RuleConfig } from './config/css';
import fs from 'node:fs';
import Builder from '../Builder';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { execute } from '@rsdoctor/cli';
import { logger } from 'rslog';

export default function webBaseConfig(config: Config, builder: Builder) {
  config.devtool(process.env.NODE_ENV === 'development' ? 'cheap-source-map' : false);
  config.resolve.extensions.merge(targetExtensions(builder.target));
  config.output.filename(process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].js' : '[name].js');
  config.optimization.runtimeChunk({
    name: 'runtime',
  });

  config.module
    .rule('js')
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
    .exclude.add(/\.ejs/)
    .end()
    .use('babel')
    .loader('babel')
    .options({
      reactPreset: true,
      api: builder.api,
      compact: process.env.NODE_ENV === 'production',
    });

  if (builder.options?.web?.excludeNodeModulesTransform) {
    config.module.rule('js').exclude.add(/(node_modules)/);
  }

  cssConfig(config, builder, true);

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

  config.plugin('rspack-bar').use(rspack.ProgressPlugin);

  if (builder.options.analyze) {
    config.plugin('rspack-bundle-analyzer').use(RsdoctorRspackPlugin, [
      {
        disableClientServer: true,
      },
    ]);
    setTimeout(() => {
      execute('analyze', {
        profile: './dist/.rsdoctor/manifest.json',
      }).then(r => {
        logger.success('已生成分析报告');
      });
    }, 3000);
  }

  if (!builder.options.watch) {
    config.plugin('mini-css-extract-plugin').use(rspack.CssExtractRspackPlugin, [
      {
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].css' : '[name].css',
      },
    ]);
  }

  const context = {
    config,
    rspack,
    addCSSRule: (ruleConfig: RuleConfig) => {
      addCSSRule(config, builder, true, ruleConfig);
    },
  };

  if (typeof builder.options.configWebpack === 'function') {
    // @ts-ignore
    builder.options.configWebpack(context);
  }
  // @ts-ignore
  builder.api.configWebpack(context);

  return config;
}
