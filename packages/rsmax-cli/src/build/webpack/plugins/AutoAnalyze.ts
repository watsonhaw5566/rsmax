import fs from 'node:fs';
import path from 'node:path';
import { execute } from '@rsdoctor/cli';
import type { Compiler } from '@rspack/core';
import { logger } from 'rslog';
import type Builder from '../../Builder';

export default class AutoAnalyze {
  private builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    let doneOnce = false;

    compiler.hooks.done.tap('rsmax-auto-analyze', () => {
      if (this.builder.options.watch && doneOnce) return;
      doneOnce = true;

      const profile = path.join(this.builder.projectPath.outputDir(), '.rsdoctor', 'manifest.json');

      const isTest = process.env.NODE_ENV === 'test';
      if (!fs.existsSync(profile)) {
        if (!isTest) {
          logger.warn(`分析失败: 清单文件不存在 ${profile}`);
        }
        return;
      }

      execute('analyze', { profile })
        .then(() => {
          logger.success('已生成分析报告');
        })
        .catch(err => {
          logger.warn(`分析失败: ${err?.message || err}`);
        });
    });
  }
}
