import { type Compilation, type Compiler, sources } from '@rspack/core';
import SourceCache from '../../../SourceCache';
import type Builder from '../../Builder';

const PLUGIN_NAME = 'RsmaxPluginAssetPlugin';

export default class PluginAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      // plugin.json
      this.createManifest(compilation);
    });
  }

  createManifest(compilation: Compilation) {
    const source = Buffer.from(JSON.stringify(this.builder.projectConfig, null, 2));
    const fileName = 'plugin.json';
    this.cache.invalid(fileName, source.toString(), () => {
      compilation.assets[fileName] = new sources.RawSource(source);
    });
  }
}
