import path from 'node:path';
import fs from 'node:fs';
import { Configuration } from '@rspack/core';
import Config from 'rspack-chain';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './baseConfig';
import webBaseConfig from './webBaseConfig';
import Builder from '../Builder';
import SpaEntry from '../entries/SpaEntry';

export default function webpackConfig(builder: Builder): Configuration {
  const config = new Config();

  config.output.publicPath('/');

  baseConfig(config, builder);

  const spaEntry = new SpaEntry(builder, 'index', './_index.js');
  config.entry(spaEntry.name).add(spaEntry.virtualPath);
  config.plugin('rspack-virtual-modules').use(spaEntry.virtualModule);

  config.optimization.splitChunks({
    cacheGroups: {
      remaxStyles: {
        name: 'remax-styles',
        test: new RegExp(`(.css|.less|.sass|.scss|.stylus|.styl|${builder.api.meta.style})$`),
        chunks: 'all',
        minChunks: 2,
        minSize: 0,
      },
    },
  });

  config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [
    {
      template: fs.existsSync(path.join(builder.projectPath.publicDir(), '/index.html'))
        ? path.join(builder.projectPath.publicDir(), '/index.html')
        : path.resolve(__dirname, '../../../template/index.html.ejs'),
      env: process.env.NODE_ENV,
    },
  ]);

  webBaseConfig(config, builder);

  return config.toConfig();
}
