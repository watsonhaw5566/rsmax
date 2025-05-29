import createPageTemplate, { createBaseTemplate } from './createTemplate';
import createTurboTemplate from './createTurboTemplate';
import createManifest from './createManifest';
import getModules from '../../../utils/modules';
import SourceCache from '../../../../SourceCache';
import createIsolatedTemplate from './createIsolatedTemplate';
import Builder from '../../../Builder';
import { Compiler } from '@rspack/core';
import PageEntry from '../../../entries/PageEntry';
import { clearComponentsCache } from '../getUsingComponents';

const PLUGIN_NAME = 'RsmaxPageAssetPlugin';

export default class PageAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    clearComponentsCache();

    const { entries } = this.builder.entryCollection;

    // add new page entry
    compiler.hooks.done.tap(PLUGIN_NAME, stats => {
      const { compilation } = stats;

      this.builder.fetchProjectConfig();
      this.builder.fetchProjectThemeConfig();
      this.builder.entryCollection.init();

      const nextEntries = this.builder.entryCollection.entries;
      nextEntries.forEach(async entry => {
        if (!entries.get(entry.filename)) {
          entry.updateSource(true);
          await entry.addToWebpack(compiler, compilation);
        }
      });
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      const { options } = this.builder;
      const meta = this.builder.api.getMeta();

      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, async (assets, callback) => {
        // base template
        await createBaseTemplate(entries, options, meta, compilation, this.cache);
        Promise.all(
          Array.from(entries.values()).map(async page => {
            if (!(page instanceof PageEntry)) {
              return Promise.resolve();
            }
            const chunk = Array.from(compilation.chunks).find(c => {
              return c.name === page.name;
            });

            const modules = [...getModules(chunk!, compilation), page.filename];
            createManifest(this.builder, page, compilation, this.cache);

            if (options.turboRenders) {
              // turbo page
              await createTurboTemplate(this.builder.api, options, page, modules, meta, compilation);
              await createIsolatedTemplate(meta, compilation);
            } else {
              // page template
              await createPageTemplate(this.builder.api, options, page, meta, compilation, this.cache);
            }
          })
        ).then(() => {
          callback();
        });
      });
    });
  }
}
