import { type Compiler, EntryPlugin } from '@rspack/core';
import SourceCache from '../../../../SourceCache';
import type Builder from '../../../Builder';
import PageEntry from '../../../entries/PageEntry';
import getModules from '../../../utils/modules';
import { clearComponentsCache } from '../getUsingComponents';
import createIsolatedTemplate from './createIsolatedTemplate';
import createManifest from './createManifest';
import createPageTemplate, { createBaseTemplate } from './createTemplate';
import createTurboTemplate from './createTurboTemplate';

const PLUGIN_NAME = 'RsmaxPageAssetPlugin';

export default class PageAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    clearComponentsCache();

    // add new page entry
    const { entries } = this.builder.entryCollection;
    compiler.hooks.finishMake.tap(PLUGIN_NAME, compilation => {
      const nextEntries = this.builder.entryCollection.entries;
      nextEntries.forEach(async entry => {
        if (!entries.get(entry.filename)) {
          const dep = EntryPlugin.createDependency(entry.virtualPath);
          compilation.addEntry('', dep, { name: entry.name }, err => {
            if (err) {
              console.error(err);
            }
          });
        }
      });
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      const { options } = this.builder;
      const meta = this.builder.api.getMeta();
      const { entries } = this.builder.entryCollection;

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
