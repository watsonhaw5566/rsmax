import createPageTemplate, { createBaseTemplate } from './createTemplate';
import createTurboTemplate from './createTurboTemplate';
import createManifest from './createManifest';
import getModules from '../../../utils/modules';
import SourceCache from '../../../../SourceCache';
import createIsolatedTemplate from './createIsolatedTemplate';
import Builder from '../../../Builder';
import { Compiler, Compilation, Chunk } from '@rspack/core';
import PageEntry from '../../../entries/PageEntry';

const PLUGIN_NAME = 'RsmaxPageAssetPlugin';

interface ProcessPageOptions {
  page: PageEntry;
  chunk: Chunk;
  compilation: Compilation;
  modules: string[];
}

export default class PageAssetPlugin {
  private readonly builder: Builder;
  private readonly cache: SourceCache;
  private readonly chunkMap: Map<string, Chunk>;

  constructor(builder: Builder) {
    this.builder = builder;
    this.cache = new SourceCache();
    this.chunkMap = new Map();
  }

  /**
   * 处理单个页面的资源生成
   * @param options 处理页面所需的选项
   * @returns Promise<void>
   */
  private async processPage({ page, chunk, compilation, modules }: ProcessPageOptions): Promise<void> {
    try {
      const { options } = this.builder;
      const meta = this.builder.api.getMeta();

      // 创建页面清单
      createManifest(this.builder, page, compilation, this.cache);

      if (options.turboRenders) {
        // 处理 turbo 页面
        await createTurboTemplate(this.builder.api, options, page, modules, meta, compilation);
        await createIsolatedTemplate(meta, compilation);
      } else {
        // 处理普通页面
        await createPageTemplate(this.builder.api, options, page, meta, compilation, this.cache);
      }
    } catch (error) {
      console.error(`Error processing page ${page.name}:`, error);
      throw error;
    }
  }

  /**
   * 初始化 chunk 映射
   * @param compilation 编译上下文
   */
  private initChunkMap(compilation: Compilation): void {
    this.chunkMap.clear();
    for (const chunk of compilation.chunks) {
      this.chunkMap.set(chunk.name!, chunk);
    }
  }

  /**
   * 获取页面对应的 chunk
   * @param pageName 页面名称
   * @returns Chunk | undefined
   */
  private getChunk(pageName: string): Chunk | undefined {
    return this.chunkMap.get(pageName);
  }

  apply(compiler: Compiler): void {
    // 使用 tapPromise 替代 tap，以更好地处理异步操作
    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.processAssets.tapPromise(PLUGIN_NAME, async () => {
        try {
          const { options } = this.builder;
          const meta = this.builder.api.getMeta();
          const { entries } = this.builder.entryCollection;

          // 初始化 chunk 映射以提高查找效率
          this.initChunkMap(compilation);

          // 创建基础模板
          await createBaseTemplate(entries, options, meta, compilation, this.cache);

          // 并行处理所有页面
          const pageEntries = Array.from(entries.values()).filter(
            (entry): entry is PageEntry => entry instanceof PageEntry
          );

          await Promise.all(
            pageEntries.map(async page => {
              const chunk = this.getChunk(page.name);
              if (!chunk) {
                console.warn(`No chunk found for page: ${page.name}`);
                return;
              }

              const modules = [...getModules(chunk, compilation), page.filename];
              await this.processPage({ page, chunk, compilation, modules });
            })
          );
        } catch (error) {
          console.error('Error in PageAssetPlugin:', error);
          throw error;
        }
      });
    });
  }
}
