import type { Options } from '@rsmax/types';
import API from '../API';
import Builder from './Builder';
import webpackConfig from './webpack/config.miniPlugin';
import webpack from 'webpack';
import { logger } from 'rslog';

export default class MiniPluginBuilder extends Builder {
  constructor(api: API, options: Options) {
    super(api, options, 'miniplugin');
  }

  createWebpackConfig(): webpack.Configuration {
    return webpackConfig(this);
  }

  run() {
    if (this.options.watch) {
      this.watch();
    } else {
      this.build();
    }
    return this.webpackCompiler;
  }

  watch() {
    this.webpackCompiler.watch({}, (error, stats) => {
      if (error) {
        console.log(error);
        logger.error(error.message);
        throw error;
      }

      const info = stats?.toJson();

      if (stats?.hasErrors()) {
        info?.errors?.forEach(error => {
          logger.error(error.message);
        });
      }

      if (stats?.hasWarnings()) {
        console.warn(info?.warnings?.join('\n'));
      }
    });
  }

  build() {
    this.webpackCompiler.run((error, stats) => {
      if (error) {
        logger.error(error.message);
        throw error;
      }

      const info = stats?.toJson();

      if (stats?.hasErrors()) {
        info?.errors?.forEach(error => {
          logger.error(error.message);
        });

        process.exit(1);
      }

      if (stats?.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          console.warn(warning);
        });
      }
    });
  }
}
