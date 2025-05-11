import { Compilation, Compiler, sources } from 'webpack';
import SourceCache from '../../../SourceCache';
import Builder from '../../Builder';

const PLUGIN_NAME = 'RemaxThemeAssetPlugin';

export default class ThemeAssetPlugin {
  builder: Builder;
  cache: SourceCache = new SourceCache();

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, async compilation => {
      // theme.json
      this.createManifest(compilation);
    });
  }

  createManifest(compilation: Compilation) {
    const source = Buffer.from(JSON.stringify(this.builder.projectThemeConfig, null, 2));
    const fileName = 'theme.json';

    this.cache.invalid(fileName, source.toString(), () => {
      compilation.assets[fileName] = new sources.RawSource(source);
    });
  }
}
