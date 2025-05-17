import * as path from 'node:path';
import * as fs from 'node:fs';
import Config from 'webpack-5-chain';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type { Options } from '@rsmax/types';
import { slash } from '@rsmax/shared';
import Builder from '../../Builder';

export interface RuleConfig {
  name: string;
  test: RegExp;
  loader?: string;
  options?: any;
}

function resolvePostcssConfig(options: Options) {
  if (fs.existsSync(path.join(options.cwd, 'postcss.config.js'))) {
    return options.cwd;
  }
  return slash(path.resolve(__dirname, '../../../..'));
}

export function addCSSRule(webpackConfig: Config, builder: Builder, web: boolean, ruleConfig: RuleConfig) {
  const { options } = builder;
  const rule = webpackConfig.module.rule(ruleConfig.name).test(ruleConfig.test);

  function applyLoaders(rule: Config.Rule<Config.Rule<Config.Module>>, cssModules: boolean) {
    if (options.watch && web) {
      rule.use('style-loader').loader(require.resolve('style-loader'));
    } else {
      rule.use('mini-css-extract-loader').loader(MiniCssExtractPlugin.loader);
    }
    rule
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        importLoaders: ruleConfig.loader ? 2 : 1,
        modules: cssModules
          ? {
              localIdentName: '[local]___[hash:base64:5]',
            }
          : false,
        url: {
          filter: (url: string) => {
            // Don't parse absolute URLs
            // ref: https://github.com/webpack-contrib/css-loader#url
            return !url.startsWith('/');
          },
        },
      });
    rule
      .use('postcss-loader')
      .loader(require.resolve('postcss-loader'))
      .options({
        postcssOptions: {
          path: resolvePostcssConfig(options),
          plugins: {
            [require.resolve('postcss-noop')]: {},
            [require.resolve('postcss-preset-env')]: web && {
              browsers: ['chrome >= 49', 'edge >= 13', 'ios >= 8', 'Android >= 4.4'],
            },
            [require.resolve('@rsmax/postcss-px2units')]:
              options.pxToRpx &&
              (web
                ? {
                    targetUnits: 'rem',
                    divisor: 100,
                  }
                : {}),
            [require.resolve('@rsmax/postcss-tag')]: web && {},
          },
        },
      });

    if (ruleConfig.loader) {
      rule.use(ruleConfig.loader).loader(require.resolve(ruleConfig.loader)).options(ruleConfig.options);
    }
  }

  applyLoaders(rule.oneOf('modules').resourceQuery(/modules/), true);
  applyLoaders(rule.oneOf('normal'), false);
}

export function cssConfig(webpackConfig: Config, builder: Builder, web: boolean) {
  addCSSRule(webpackConfig, builder, web, {
    name: 'css',
    test: /\.css$/i,
  });

  if (!web && builder.options.target !== 'xhs') {
    const { style } = builder.api.getMeta();
    webpackConfig.module
      .rule(style)
      .test(file => file.endsWith(style))
      .use('mini-css-extract-loader')
      .loader(MiniCssExtractPlugin.loader)
      .end()
      .use('css-loader')
      .loader(require.resolve('css-loader'))
      .options({
        url: {
          filter: (url: string) => {
            // Don't parse absolute URLs
            // ref: https://github.com/webpack-contrib/css-loader#url
            return !url.startsWith('/');
          },
        },
      });
  }
}
