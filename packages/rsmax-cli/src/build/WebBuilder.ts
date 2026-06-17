import type { Options } from '@rsmax/types';
import type { Configuration } from '@rspack/core';
import { RspackDevServer } from '@rspack/dev-server';
import detect from 'detect-port';
import { logger } from 'rslog';
import type API from '../API';
import Builder from './Builder';
import rspackConfig from './rspack/config.web';
import mpaRspackConfig from './rspack/config.web.mpa';
import watch from './watch';

export default class WebBuilder extends Builder {
  constructor(api: API, options: Options) {
    super(api, options, 'webapp');
  }

  createRspackConfig(): Configuration {
    return this.options.web?.mpa ? mpaRspackConfig(this) : rspackConfig(this);
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
    const designatedPort = this.options.port ?? 3000;

    detect(designatedPort, (err, port) => {
      if (err) {
        logger.error(err.message);
        process.exit(1);
      }

      if (designatedPort !== port) {
        logger.warn(` 端口: ${designatedPort} 被占用，系统已分配另一个可用端口：${port}`);
      }

      const server = new RspackDevServer({ port }, this.rspackCompiler);

      this.rspackCompiler.hooks.done.tap('web-dev', stats => {
        console.log(
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            assets: false,
            entrypoints: false,
          })
        );
      });

      server.startCallback(error => {
        if (error) {
          console.error(error);
          process.exit(1);
        }
      });
      watch(this, server);
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
          logger.warn(warning.message);
        });
      }
    });
  }
}
