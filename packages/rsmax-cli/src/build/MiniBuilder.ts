import type { Options } from '@rsmax/types';
import type { Configuration } from '@rspack/core';
import { logger } from 'rslog';
import type API from '../API';
import BaseBuilder from './Builder';
import watch from './watch';
import webpackConfig from './webpack/config.mini';

export default class MiniBuilder extends BaseBuilder {
  constructor(api: API, options: Options) {
    super(api, options, 'miniapp');
  }

  createWebpackConfig(): Configuration {
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
    });
    watch(this, watcher, true);
    return watcher;
  }
}
