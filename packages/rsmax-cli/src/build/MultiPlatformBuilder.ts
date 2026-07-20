import type { Options, Platform } from '@rsmax/types';
import type { Stats } from '@rspack/core';
import { logger } from '../logger';
import API from '../API';
import MiniBuilder from './MiniBuilder';

export default class MultiPlatformBuilder {
  private builders: MiniBuilder[] = [];

  constructor(private options: Options) {}

  async build(): Promise<void> {
    const targets = this.normalizeTargets(this.options.target);

    logger.info(`开始构建 ${targets.length} 个平台: ${targets.join(', ')}`);

    await this.createBuilders(targets);
    await this.runBuilders(false);

    logger.info('所有平台构建完成!');
  }

  async watch(): Promise<void> {
    const targets = this.normalizeTargets(this.options.target);

    logger.info(`开始监听 ${targets.length} 个平台: ${targets.join(', ')}`);

    await this.createBuilders(targets);
    await this.runBuilders(true);
  }

  private normalizeTargets(target: Options['target']): Platform[] {
    if (!target) {
      return ['ali'];
    }
    if (Array.isArray(target)) {
      return target;
    }
    return [target];
  }

  private async createBuilders(targets: Platform[]): Promise<void> {
    for (const target of targets) {
      const platformApi = new API();
      platformApi.registerAdapterPlugins(target);
      platformApi.registerPlugins(this.options.plugins);

      const platformOptions: Options = {
        ...this.options,
        target,
        output: `${this.options.output}/${target}`,
      };

      const builder = new MiniBuilder(platformApi, platformOptions);
      this.builders.push(builder);
    }
  }

  private async runBuilders(watch: boolean): Promise<void> {
    const promises = this.builders.map(builder => this.runSingleBuilder(builder, watch));

    await Promise.all(promises);
  }

  private async runSingleBuilder(builder: MiniBuilder, watch: boolean): Promise<void> {
    return new Promise((resolve, reject) => {
      const target = builder.target;
      const compiler = builder.rspackCompiler;

      if (watch) {
        compiler.watch({}, (error, stats) => {
          if (error) {
            logger.error(`❌ 平台 ${target} 监听失败: ${error.message}`);
            return;
          }
          this.handleStats(stats, target);
        });
        resolve();
      } else {
        compiler.run((error, stats) => {
          if (error) {
            logger.error(`❌ 平台 ${target} 构建失败: ${error.message}`);
            reject(error);
            return;
          }
          this.handleStats(stats, target);
          resolve();
        });
      }
    });
  }

  private handleStats(stats: Stats | undefined, target: Platform): void {
    if (!stats) return;

    const info = stats.toJson('normal');

    if (stats.hasErrors()) {
      logger.error(`❌ 平台 ${target} 构建失败:`);
      info.errors?.forEach(error => {
        logger.error(`  - ${error.message}`);
      });
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      logger.warn(`⚠️  平台 ${target} 构建警告:`);
      info.warnings?.forEach(warn => {
        logger.warn(`  - ${warn.message}`);
      });
    }
  }
}
