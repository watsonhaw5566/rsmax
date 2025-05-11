import * as path from 'path';
import { Compilation, Compiler, sources } from 'webpack';
import { slash } from '@rsmax/shared';

const PLUGIN_NAME = 'RemaxOptimizeEntriesPlugin';

interface Meta {
  style: string;
}

class OptimizeEntriesPlugin {
  constructor(private meta: Meta) {}

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, (assets, callback) => {
        compilation.chunkGroups.forEach(group => {
          group.chunks.reverse().forEach(chunk => {
            this.requireChunks(compilation, chunk, group);
            this.requireStyles(compilation, chunk, group);
          });
        });
        callback();
      });
    });
  }

  requireChunks(compilation: Compilation, chunk: any, group: any) {
    // require 相关的 chunk
    if (chunk.name !== group.name) {
      const requires: string[] = [];
      const files: string[] = Array.from(chunk.files);
      files.forEach(file => {
        if (file.endsWith('.js')) {
          const relativePath = slash(path.relative(path.dirname(group.name), file));
          requires.push(`require('./${relativePath}');\n`);
        }
      });
      const assetPath = group.name + '.js';
      const source: sources.Source | string = compilation.assets[assetPath] || '';
      compilation.assets[assetPath] = new sources.ConcatSource(...requires, source);
    }
  }

  requireStyles(compilation: Compilation, chunk: any, group: any) {
    const assetPath = group.name + this.meta.style;
    // require 相关的 styles
    const files: string[] = Array.from(chunk.files);
    const requires = files
      .filter(file => file.endsWith(this.meta.style) && assetPath !== file)
      .map(file => {
        const relativePath = slash(path.relative(path.dirname(group.name), file));
        return `@import "./${relativePath}";\n`;
      });
    const source: sources.Source | string = compilation.assets[assetPath] || '';
    compilation.assets[assetPath] = new sources.ConcatSource(...requires, source);
  }
}

export default OptimizeEntriesPlugin;
