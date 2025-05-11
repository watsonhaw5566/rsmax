import BaseBuilder from './Builder';
import watch from './watch';
import type { Options } from '@rsmax/types';
import API from '../API';
import webpackConfig from './webpack/config.mini';
import webpack from 'webpack';
import { logger } from 'rslog';

export default class MiniBuilder extends BaseBuilder {
  constructor(api: API, options: Options) {
    super(api, options, 'miniapp');
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
        info?.warnings?.forEach(warn => {
          console.warn(warn.message);
        });
      }
    });
  }

  watch() {
    const watcher = this.webpackCompiler.watch({}, (error, stats) => {
      if (error) {
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
        info?.warnings?.forEach(warn => {
          console.warn(warn.message);
        });
      }

      // 适配阿里小程序 IDE
      if (this.options.target === 'ali') {
        logger.info('Watching for changes...');
      }
    });
    watch(this, watcher, true);
    return watcher;
  }
}
