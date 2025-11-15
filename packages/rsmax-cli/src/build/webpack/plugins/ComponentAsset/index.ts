import type { Compiler } from '@rspack/core';
import SourceCache from '../../../../SourceCache';
import type Builder from '../../../Builder';
import ComponentEntry from '../../../entries/ComponentEntry';
import createManifest from './createManifest';
import createTemplate from './createTemplate';

const PLUGIN_NAME = 'RsmaxComponentAssetPlugin';

export default class ComponentAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      const { options, api } = this.builder;
      const meta = api.getMeta();

      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, async (assets, callback) => {
        const { entries } = this.builder.entryCollection;
        await Promise.all(
          Array.from(entries.values()).map(async component => {
            if (!(component instanceof ComponentEntry)) {
              return Promise.resolve();
            }

            await Promise.all([
              await createTemplate(component, options, meta, compilation, this.cache),
              createManifest(this.builder, component, compilation, this.cache),
            ]);
          })
        );
        callback();
      });
    });
  }
}
