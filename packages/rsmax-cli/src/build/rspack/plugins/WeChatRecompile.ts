import * as fs from 'node:fs';
import * as path from 'node:path';
import { type Compiler } from '@rspack/core';
import { logger } from 'rslog';
import type Builder from '../../Builder';

const PLUGIN_NAME = 'RsmaxWeChatRecompilePlugin';
const TOUCH_MARK_REGEX = /\/\* rsmax-touch \d+ \*\/\s*$/;

export default class WeChatRecompile {
  private builder: Builder;
  private debug: boolean;
  private shouldTouch = false;

  constructor(builder: Builder) {
    this.builder = builder;
    this.debug = !!process.env.RSMAX_DEBUG;
  }

  apply(compiler: Compiler) {
    const srcDir = this.normalize(this.builder.projectPath.srcDir());
    const outDir = this.normalize(this.builder.projectPath.outputDir());
    const cwd = this.normalize(this.builder.options.cwd);

    compiler.hooks.watchRun.tap(PLUGIN_NAME, c => {
      const modified = c.modifiedFiles;
      const removed = c.removedFiles;
      if (!modified && !removed) return;

      const collect = (set?: ReadonlySet<string> | null): boolean => {
        if (!set) return false;
        for (const raw of set) {
          const p = this.normalize(raw);
          if (!p.startsWith(cwd)) continue;
          if (/[/\\]node_modules[/\\]/.test(p)) continue;
          const rel = path.relative(srcDir, p).replace(/\\/g, '/');
          if (/^(app\.[^/]+|app\.config\.[^/]+)$/.test(rel)) continue;
          if (this.debug) {
            logger.debug(`[${PLUGIN_NAME}] modified: ${path.relative(cwd, p)}`);
          }
          return true;
        }
        return false;
      };

      if (collect(modified) || collect(removed)) {
        this.shouldTouch = true;
      }
    });

    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      try {
        if (!this.shouldTouch) return;
        const appJsPath = path.join(outDir, 'app.js');
        if (!fs.existsSync(appJsPath)) {
          if (this.debug) logger.debug(`[${PLUGIN_NAME}] app.js not found in ${outDir}`);
          return;
        }
        this.touchAppJs(appJsPath);
        if (this.debug) {
          logger.debug(`[${PLUGIN_NAME}] touched app.js to trigger wechat devtools reload`);
        }
      } finally {
        this.shouldTouch = false;
      }
    });
  }

  private touchAppJs(filePath: string) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cleaned = content.replace(TOUCH_MARK_REGEX, '').replace(/\s+$/, '');
      fs.writeFileSync(filePath, `${cleaned}\n/* rsmax-touch ${Date.now()} */\n`);
    } catch (err) {
      if (this.debug) {
        logger.debug(`[${PLUGIN_NAME}] failed to touch ${filePath}: ${(err as Error).message}`);
      }
    }
  }

  private normalize(p: string): string {
    return p.replace(/\\/g, '/');
  }
}
