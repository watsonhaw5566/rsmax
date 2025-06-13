import fs from 'node:fs';
import path from 'node:path';
import { Configuration,rspack } from '@rspack/core';
import Config from 'rspack-chain';
import type Builder from '../Builder';
import FallbackEntry from '../entries/FallbackEntry';
import type VirtualEntry from '../entries/VirtualEntry';
import baseConfig from './baseConfig';
import webBaseConfig from './webBaseConfig';

export default function webpackConfig(builder: Builder): Configuration {
  const config = new Config();

  baseConfig(config, builder);

  const addEntry = (entry: VirtualEntry) => {
    config.entry(entry.name).add(entry.virtualPath);
    config.plugin(`rspack-virtual-modules${entry.name}`).use(entry.virtualModule);
    config.plugin(`html-webpack-plugin${entry.name}`).use(rspack.HtmlRspackPlugin, [
      {
        filename: `${entry.name}.html`,
        chunks: [entry.name],
        template: fs.existsSync(path.join(builder.projectPath.publicDir(), '/index.html'))
          ? path.join(builder.projectPath.publicDir(), '/index.html')
          : path.resolve(__dirname, '../../../template/index.html.ejs'),
        env: process.env.NODE_ENV,
      },
    ]);
  };

  builder.entryCollection.entries.forEach(addEntry);

  // 开发时，增加一个 fallback 路由
  if (builder.options.watch) {
    config.devServer.historyApiFallback({
      rewrites: [{ from: /.*/, to: '/fallback.html' }],
    });
    const fallbackEntry = new FallbackEntry(builder, 'fallback', './_fallback.js');
    addEntry(fallbackEntry);
  }

  config.optimization.splitChunks({
    cacheGroups: {
      vendor: {
        test: /node_modules/,
        name: 'vendor',
        minChunks: 2,
        chunks: 'all',
      },
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
      },
    },
  });
  webBaseConfig(config, builder);

  return config.toConfig();
}
