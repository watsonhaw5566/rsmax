import { type Compilation, type Compiler, sources } from '@rspack/core';
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
    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      // app.json
      setTimeout(() => {
        this.createManifest(compilation);
      }, 500);
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
