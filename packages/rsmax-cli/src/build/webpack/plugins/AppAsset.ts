import { Compiler, Compilation, sources } from 'webpack';
import SourceCache from '../../../SourceCache';
import Builder from '../../Builder';

const PLUGIN_NAME = 'RemaxAppAssetPlugin';

export default class AppAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      // app.json
      this.createManifest(compilation);
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
