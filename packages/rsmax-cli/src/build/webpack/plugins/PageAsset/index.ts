import createPageTemplate, { createBaseTemplate } from './createTemplate';
import createTurboTemplate from './createTurboTemplate';
import createManifest from './createManifest';
import getModules from '../../../utils/modules';
import SourceCache from '../../../../SourceCache';
import createIsolatedTemplate from './createIsolatedTemplate';
import Builder from '../../../Builder';
import { Compiler, Chunk, Compilation } from '@rspack/core';
import PageEntry from '../../../entries/PageEntry';
import { clearComponentsCache } from '../getUsingComponents';

const PLUGIN_NAME = 'RsmaxPageAssetPlugin';
const BATCH_SIZE = 50; // 每批处理的页面数量

// 用于存储编译间的缓存
const compilationCache = new Map<
  string,
  {
    chunkMap: Map<string, Chunk>;
    baseTemplateCreated: boolean;
    isolatedTemplateCreated: boolean;
  }
>();

export default class PageAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  /**
   * 创建chunk名称到chunk对象的映射
   */
  createChunkMap(compilation: Compilation): Map<string, Chunk> {
    const chunkMap = new Map<string, Chunk>();
    for (const chunk of compilation.chunks) {
      if (chunk.name) {
        chunkMap.set(chunk.name, chunk);
      }
    }
    return chunkMap;
  }

  /**
   * 将数组分割成指定大小的批次
   */
  batchArray<T>(array: T[], batchSize: number): T[][] {
    const batches: T[][] = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  /**
   * 处理单个页面条目
   */
  async processPageEntry(
    page: PageEntry,
    chunkMap: Map<string, Chunk>,
    compilation: Compilation,
    options: any,
    meta: any
  ): Promise<void> {
    const chunk = chunkMap.get(page.name);
    if (!chunk) {
      console.warn(`[${PLUGIN_NAME}] Chunk not found for page: ${page.name}`);
      return;
    }

    const modules = [...getModules(chunk, compilation), page.filename];

    // 使用缓存创建清单
    createManifest(this.builder, page, compilation, this.cache);

    if (options.turboRenders) {
      // turbo page
      await createTurboTemplate(this.builder.api, options, page, modules, meta, compilation);
      // 注意：createIsolatedTemplate 只需要执行一次，不需要每个页面都执行
    } else {
      // page template
      await createPageTemplate(this.builder.api, options, page, meta, compilation, this.cache);
    }
  }

  apply(compiler: Compiler) {
    // 在编译开始时清除组件缓存
    compiler.hooks.beforeCompile.tap(PLUGIN_NAME, () => {
      clearComponentsCache();
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      const { options } = this.builder;
      const meta = this.builder.api.getMeta();
      const { entries } = this.builder.entryCollection;

      // 清除当前编译的缓存
      const compilationId = compilation.hash || Date.now().toString();
      compilationCache.delete(compilationId);

      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, async (assets, callback) => {
        try {
          // 获取或创建当前编译的缓存
          let cache = compilationCache.get(compilationId);
          if (!cache) {
            cache = {
              chunkMap: this.createChunkMap(compilation),
              baseTemplateCreated: false,
              isolatedTemplateCreated: false,
            };
            compilationCache.set(compilationId, cache);
          }

          // 先创建base template，这只需要执行一次
          if (!cache.baseTemplateCreated) {
            await createBaseTemplate(entries, options, meta, compilation, this.cache);
            cache.baseTemplateCreated = true;
          }

          // 如果使用turboRenders，提前创建isolated template，避免重复创建
          if (options.turboRenders && !cache.isolatedTemplateCreated) {
            await createIsolatedTemplate(meta, compilation);
            cache.isolatedTemplateCreated = true;
          }

          // 过滤出PageEntry类型的条目
          const pageEntries = Array.from(entries.values()).filter(entry => entry instanceof PageEntry) as PageEntry[];

          // 将页面条目分批处理
          const batches = this.batchArray(pageEntries, BATCH_SIZE);

          // 按批次顺序处理
          for (const batch of batches) {
            await Promise.all(
              batch.map(page => this.processPageEntry(page, cache!.chunkMap, compilation, options, meta))
            );
          }

          callback();
        } catch (error) {
          console.error(`[${PLUGIN_NAME}] Error processing assets:`, error);
          callback();
        }
      });

      // 在编译结束时清理不再需要的缓存
      compilation.hooks.afterProcessAssets.tap(PLUGIN_NAME, () => {
        // 保留最近的5个编译缓存，清除旧的缓存
        const keys = Array.from(compilationCache.keys());
        if (keys.length > 5) {
          const keysToDelete = keys.slice(0, keys.length - 5);
          keysToDelete.forEach(key => compilationCache.delete(key));
        }
      });
    });
  }
}
