import createPageTemplate, { createBaseTemplate } from './createTemplate';
import createTurboTemplate from './createTurboTemplate';
import createManifest from './createManifest';
import getModules from '../../../utils/modules';
import SourceCache from '../../../../SourceCache';
import createIsolatedTemplate from './createIsolatedTemplate';
import Builder from '../../../Builder';
import { Compiler } from 'webpack';
import PageEntry from '../../../entries/PageEntry';

const PLUGIN_NAME = 'RemaxPageAssetPlugin';

export default class PageAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
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
