import fs from 'node:fs';
import path from 'node:path';
import { execute } from '@rsdoctor/cli';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import type { Compiler, RspackPluginInstance } from '@rspack/core';
import { logger } from '../../../logger';

const PLUGIN_NAME = 'RsmaxRsdoctorPlugin';

export interface RsdoctorAnalyzePluginOptions {
  output: string;
  timeout?: number;
  interval?: number;
  disableClientServer?: boolean;
}

export default class RsdoctorAnalyzePlugin implements RspackPluginInstance {
  private options: Required<RsdoctorAnalyzePluginOptions>;

  constructor(options: RsdoctorAnalyzePluginOptions) {
    this.options = {
      timeout: 15000,
      interval: 200,
      disableClientServer: true,
      ...options,
    };
  }

  apply(compiler: Compiler) {
    new RsdoctorRspackPlugin({
      disableClientServer: this.options.disableClientServer,
    }).apply(compiler);

    const manifestPath = path.resolve(
      compiler.context,
      `.${path.sep}${this.options.output}`,
      '.rsdoctor',
      'manifest.json'
    );

    const onDone = () => {
      this.waitForManifest(manifestPath).then(exists => {
        if (!exists) {
          logger.warn(`未找到 manifest 文件: ${manifestPath}, 已跳过分析报告生成`);
          return;
        }
        execute('analyze', {
          profile: `./${this.options.output}/.rsdoctor/manifest.json`,
        })
          .then(() => {
            logger.success('已生成分析报告');
          })
          .catch(err => {
            logger.error(err);
          });
      });
    };

    compiler.hooks.done.tap(PLUGIN_NAME, onDone);
  }

  private waitForManifest(manifestPath: string): Promise<boolean> {
    const { timeout, interval } = this.options;
    const start = Date.now();

    return new Promise<boolean>(resolve => {
      const check = () => {
        if (fs.existsSync(manifestPath)) {
          resolve(true);
          return;
        }
        if (Date.now() - start >= timeout) {
          resolve(false);
          return;
        }
        setTimeout(check, interval);
      };
      check();
    });
  }
}
