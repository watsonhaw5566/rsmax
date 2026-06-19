import type { Options } from '@rsmax/types';
import type { Configuration } from '@rspack/core';
import { logger } from 'rslog';
import type API from '../API';
import BaseBuilder from './Builder';
import rspackConfig from './rspack/config.mini';
import watch from './watch';

export default class MiniBuilder extends BaseBuilder {
  constructor(api: API, options: Options) {
    super(api, options, 'miniapp');
  }

  createRspackConfig(): Configuration {
    return rspackConfig(this);
  }

  run() {
    if (this.options.watch) {
      this.watch();
    } else {
      this.build();
    }
    return this.rspackCompiler;
  }

  build() {
    this.rspackCompiler.run((error, stats) => {
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
          logger.warn(warn.message);
        });
      }
    });
  }

  watch() {
    const watcher = this.rspackCompiler.watch({}, (error, stats) => {
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
          logger.warn(warn.message);
        });
      }
    });
    watch(this, watcher, true);
    return watcher;
  }
}
