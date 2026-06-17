import * as fs from 'node:fs';
import * as path from 'node:path';
import { type Compiler } from '@rspack/core';
import type Builder from '../../Builder';

const PLUGIN_NAME = 'RsmaxWeChatRecompilePlugin';
const TOUCH_MARK = /\/\* rsmax-touch \d+ \*\/\s*$/;

export default class WeChatRecompile {
  private builder: Builder;
  private shouldTouch = false;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    const srcDir = this.builder.projectPath.srcDir().replace(/\\/g, '/');
    const outDir = this.builder.projectPath.outputDir().replace(/\\/g, '/');
    const cwd = this.builder.options.cwd.replace(/\\/g, '/');

    compiler.hooks.watchRun.tap(PLUGIN_NAME, c => {
      if (!c.modifiedFiles && !c.removedFiles) return;
      this.shouldTouch ||=
        this.hasRelevantChange(c.modifiedFiles, srcDir, cwd) || this.hasRelevantChange(c.removedFiles, srcDir, cwd);
    });

    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      try {
        if (!this.shouldTouch) return;
        const appJs = path.join(outDir, 'app.js');
        if (fs.existsSync(appJs)) this.touch(appJs);
      } finally {
        this.shouldTouch = false;
      }
    });
  }

  private hasRelevantChange(set: ReadonlySet<string> | null | undefined, srcDir: string, cwd: string): boolean {
    if (!set) return false;
    for (const raw of set) {
      const p = raw.replace(/\\/g, '/');
      if (!p.startsWith(cwd)) continue;
      if (/[/\\]node_modules[/\\]/.test(p)) continue;
      const rel = path.relative(srcDir, p).replace(/\\/g, '/');
      if (/^(app\.[^/]+|app\.config\.[^/]+)$/.test(rel)) continue;
      return true;
    }
    return false;
  }

  private touch(filePath: string) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cleaned = content.replace(TOUCH_MARK, '').replace(/\s+$/, '');
      fs.writeFileSync(filePath, `${cleaned}\n/* rsmax-touch ${Date.now()} */\n`);
    } catch (e) {
      /* ignore */
    }
  }
}
