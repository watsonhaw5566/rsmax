import Config from 'webpack-5-chain';
import * as webpack from 'webpack';
import { moduleMatcher, targetExtensions } from '../../extensions';
import { addCSSRule, cssConfig, RuleConfig } from './config/css';
import fs from 'node:fs';
import CopyPlugin from 'copy-webpack-plugin';
import WebpackBar from 'webpackbar';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Builder from '../Builder';

export default function webBaseConfig(config: Config, builder: Builder) {
  config.devtool(process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : false);
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
    .loader(require.resolve('swc-loader'))
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
    config.plugin('webpack-copy-plugin').use(CopyPlugin, [
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

  config.plugin('webpack-bar').use(WebpackBar, [{ name: 'web' }]);

  if (builder.options.analyze) {
    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
  }

  if (!builder.options.watch) {
    config.plugin('mini-css-extract-plugin').use(MiniCssExtractPlugin, [
      {
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].css' : '[name].css',
      },
    ]);
  }

  const context = {
    config,
    webpack,
    addCSSRule: (ruleConfig: RuleConfig) => {
      addCSSRule(config, builder, true, ruleConfig);
    },
  };

  if (typeof builder.options.configWebpack === 'function') {
    builder.options.configWebpack(context);
  }

  builder.api.configWebpack(context);

  return config;
}
