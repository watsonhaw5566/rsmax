import type { Options } from '@rsmax/types';
import type { Configuration } from '@rspack/core';
import { logger } from 'rslog';
import type API from '../API';
import Builder from './Builder';
import rspackConfig from './rspack/config.miniPlugin';

export default class MiniPluginBuilder extends Builder {
  constructor(api: API, options: Options) {
    super(api, options, 'miniplugin');
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

  watch() {
    this.rspackCompiler.watch({}, (error, stats) => {
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
        info?.warnings?.forEach(warning => {
          logger.warn(warning);
        });
      }
    });
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
        info?.warnings?.forEach(warning => {
          logger.warn(warning);
        });
      }
    });
  }
}
