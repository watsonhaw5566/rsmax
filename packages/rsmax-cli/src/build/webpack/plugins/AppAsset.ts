import { Compilation, Compiler, sources } from '@rspack/core';
import SourceCache from '../../../SourceCache';
import type Builder from '../../Builder';

const PLUGIN_NAME = 'RsmaxAppAssetPlugin';

export default class AppAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS
        },
        () => {
          this.createManifest(compilation);
        }
      );
    });
  }

  createManifest(compilation: Compilation) {
    const source = Buffer.from(JSON.stringify(this.builder.projectConfig, null, 2));

    const fileName = 'app.json';

    this.cache.invalid(fileName, source.toString(), () => {
      compilation.assets[fileName] = new sources.RawSource(source);
    });
  }
}
