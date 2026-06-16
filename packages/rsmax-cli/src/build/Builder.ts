import type { AppConfig, BuildType, MiniPluginConfig, Options, Platform } from '@rsmax/types';
import type { Compiler, Configuration } from '@rspack/core';
import { rspack } from '@rspack/core';
import type API from '../API';
import readManifest from '../readManifest';
import EntryCollection from './EntryCollection';
import ProjectPath from './ProjectPath';

abstract class Builder {
  api: API;
  options: Options;
  target: Platform;
  projectPath: ProjectPath;
  projectConfig: AppConfig | MiniPluginConfig;
  projectThemeConfig: any;
  entryCollection: EntryCollection;
  rspackCompiler: Compiler;
  buildType: BuildType;
  rspackConfig: any;

  protected constructor(api: API, options: Options, buildType: BuildType) {
    this.api = api;
    this.options = options;
    this.target = options.target!;
    this.buildType = buildType;

    if (this.target !== 'web') {
      api.registerAdapterPlugins(this.target);
    }

    this.projectPath = new ProjectPath(this);
    this.projectConfig = this.fetchProjectConfig();
    this.projectThemeConfig = this.fetchProjectThemeConfig();
    this.entryCollection = new EntryCollection(this);
    this.entryCollection.init();
    this.rspackConfig = this.createRspackConfig();
    this.rspackCompiler = this.createRspackCompiler();
  }

  abstract run(): Compiler;

  abstract build(): void;

  abstract watch(): void;

  abstract createRspackConfig(): Configuration;

  fetchProjectConfig() {
    const configFile =
      this.buildType === 'miniplugin' ? this.projectPath.pluginConfigFile() : this.projectPath.appConfigFile();
    const config = readManifest(configFile, this.target, false);
    const finalConfig = ['miniapp', 'webapp'].includes(this.buildType) ? this.api.onAppConfig(config) : config;

    if (this.buildType === 'miniapp') {
      if (!finalConfig.pages || finalConfig.pages.length === 0) {
        throw new Error('app.config.js|ts 并未配置页面参数');
      }
    }

    this.projectConfig = finalConfig;
    return this.projectConfig;
  }

  fetchProjectThemeConfig() {
    const configFile =
      this.buildType === 'miniplugin' ? this.projectPath.pluginConfigFile() : this.projectPath.themeConfigFile();
    const config = readManifest(configFile, this.target, false);
    this.projectThemeConfig = ['miniapp'].includes(this.buildType) ? this.api.onThemeConfig(config) : config;
    return this.projectThemeConfig;
  }

  createRspackCompiler(): Compiler {
    const cfg = this.rspackConfig;

    const index = cfg.plugins.findIndex((e: any) => e.constructor.name === 'CssExtractRspackPlugin');
    const cssPlugin = cfg.plugins[index];

    if (cssPlugin) {
      cfg.plugins[index] = cssPlugin;
    }
    // @ts-expect-error
    return rspack(cfg);
  }
}

export default Builder;
