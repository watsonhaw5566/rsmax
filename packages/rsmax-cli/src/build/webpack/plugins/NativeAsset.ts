import { type Compilation, type Compiler, sources } from '@rspack/core';
import type Builder from '../../Builder';
import NativeEntry from '../../entries/NativeEntry';

const PLUGIN_NAME = 'NativeAssetPlugin';

export default class NativeAssetPlugin {
  builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.finishMake.tapAsync(PLUGIN_NAME, async (compilation, callback) => {
      const entries = this.builder.entryCollection.nativeComponentEntries;
      const processEntries = async () => {
        for (const entry of entries.values()) {
          // 处理依赖的组件
          for (const component of entry.getDependentEntries().values()) {
            entries.set(component.filename, component);
            await component.addToWebpack(compiler, compilation);
          }
          // 更新并添加入口
          entry.updateSource();
          await entry.addToWebpack(compiler, compilation);
        }
      };
      await processEntries();
      callback();
    });

    compiler.hooks.watchRun.tap(PLUGIN_NAME, () => {
      this.builder.entryCollection.entries.forEach(entry => {
        if (entry instanceof NativeEntry) {
          entry.updateSource();
        }
      });
    });

    compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, (assets, callback) => {
        this.builder.entryCollection.entries.forEach(entry => {
          if (entry instanceof NativeEntry) {
            this.createAssets(compilation, entry);
          }
        });
        this.builder.entryCollection.nativeComponentEntries.forEach(entry => {
          this.createAssets(compilation, entry);
        });
        const { appEntry } = this.builder.entryCollection;
        if (appEntry instanceof NativeEntry) {
          appEntry.getAssets().forEach(asset => {
            compilation.assets[asset.output] = new sources.RawSource(asset.content);
          });
        }
        callback();
      });
    });
  }

  createAssets(compilation: Compilation, entry: NativeEntry) {
    const assets = entry.getAssets();
    assets.forEach(asset => {
      compilation.assets[asset.output] = new sources.RawSource(asset.content);
    });
    const manifestContent = Buffer.from(JSON.stringify(entry.getManifest(), null, 2));
    compilation.assets[`${entry.name}.json`] = new sources.RawSource(manifestContent);
  }
}
