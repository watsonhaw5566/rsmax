import path from 'path';
import { Compilation, Compiler, sources, Chunk, ChunkGroup } from '@rspack/core';
import { slash } from '@rsmax/shared';

const PLUGIN_NAME = 'RsmaxOptimizeEntriesPlugin';

interface Meta {
  style: string;
}

class OptimizeEntriesPlugin {
  private readonly meta: Meta;

  constructor(meta: Meta) {
    this.meta = meta;
  }

  apply(compiler: Compiler): void {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      // 使用tapPromise替代tapAsync，更好地处理异步操作
      compilation.hooks.processAssets.tapPromise(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
        },
        async () => {
          try {
            // 使用Set记录已处理的组，避免重复处理
            const processedGroups = new Set<string>();

            for (const group of compilation.chunkGroups) {
              // 跳过已处理的组
              if (processedGroups.has(group.name!)) {
                continue;
              }

              processedGroups.add(group.name!);

              // 处理组内所有chunk
              for (const chunk of group.chunks) {
                this.requireChunks(compilation, chunk, group);
                this.requireStyles(compilation, chunk, group);
              }
            }
          } catch (error) {
            console.error(`[${PLUGIN_NAME}] Error:`, error);
            throw error;
          }
        }
      );
    });
  }

  /**
   * 在入口JS文件中添加对相关chunk的require语句
   * @param compilation 编译对象
   * @param chunk 当前chunk
   * @param group 当前chunk组
   */
  private requireChunks(compilation: Compilation, chunk: Chunk, group: ChunkGroup): void {
    // 只处理非入口chunk
    if (chunk.name !== group.name) {
      const requires: string[] = [];
      const files = Array.from(chunk.files);

      // 收集所有JS文件
      for (const file of files) {
        if (file.endsWith('.js')) {
          const relativePath = slash(path.relative(path.dirname(group.name!), file));
          requires.push(`require('./${relativePath}');\n`);
        }
      }

      // 如果有需要引入的文件，更新资源
      if (requires.length > 0) {
        const assetPath = `${group.name}.js`;
        const existingAsset = compilation.assets[assetPath];

        if (existingAsset) {
          compilation.updateAsset(assetPath, new sources.ConcatSource(...requires, existingAsset));
        } else {
          console.warn(`[${PLUGIN_NAME}] Asset not found: ${assetPath}`);
        }
      }
    }
  }

  /**
   * 在入口样式文件中添加对相关样式的@import语句
   * @param compilation 编译对象
   * @param chunk 当前chunk
   * @param group 当前chunk组
   */
  private requireStyles(compilation: Compilation, chunk: Chunk, group: ChunkGroup): void {
    const assetPath = `${group.name}${this.meta.style}`;
    const files = Array.from(chunk.files);

    // 收集所有样式文件
    const requires = files
      .filter(file => file.endsWith(this.meta.style) && assetPath !== file)
      .map(file => {
        const relativePath = slash(path.relative(path.dirname(group.name!), file));
        return `@import "./${relativePath}";\n`;
      });

    // 如果有需要引入的样式，更新资源
    if (requires.length > 0) {
      const existingAsset = compilation.assets[assetPath];

      if (existingAsset) {
        compilation.updateAsset(assetPath, new sources.ConcatSource(...requires, existingAsset));
      }
      // 样式文件可能不存在，这是正常的，不需要警告
    }
  }
}

export default OptimizeEntriesPlugin;
