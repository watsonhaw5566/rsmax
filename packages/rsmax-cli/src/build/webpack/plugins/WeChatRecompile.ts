import fs from 'node:fs';
import path from 'node:path';
import { type Compiler } from '@rspack/core';
import type Builder from '../../Builder';

const PLUGIN_NAME = 'RsmaxWeChatRecompilePlugin';

export default class WeChatRecompile {
  private builder: Builder;
  private shouldTouchApp = false;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.watchRun.tap(PLUGIN_NAME, c => {
      const m = c.modifiedFiles;
      if (!m) return;
      for (const f of m) {
        const p = f.replace(/\\/g, '/');
        const src = this.builder.projectPath.srcDir().replace(/\\/g, '/');
        if (p.startsWith(`${src}/pages/`) && /\.(js|ts|jsx|tsx)$/.test(p)) {
          this.shouldTouchApp = true;
          break;
        }
      }
    });

    compiler.hooks.done.tap(PLUGIN_NAME, () => {
      if (!this.shouldTouchApp) return;
      this.shouldTouchApp = false;
      const outDir = this.builder.projectPath.outputDir();
      let file = path.join(outDir, 'app.js');
      if (!fs.existsSync(file)) {
        const candidates = fs.readdirSync(outDir).filter(f => /^app.*\.js$/.test(f));
        if (candidates.length === 0) return;
        file = path.join(outDir, candidates[0]);
      }
      try {
        const now = new Date();
        fs.utimesSync(file, now, now);
      } catch (e) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const withoutTouch = content.replace(/\n\/\* rsmax touch \d+ \*\/\n?$/, '');
          fs.writeFileSync(file, `${withoutTouch}\n/* rsmax touch ${Date.now()} */\n`);
        } catch (err) {
          console.error(`Failed to touch ${file}:`, err);
        }
      }
    });
  }
}
