import type { AppConfig, BuildType, MiniPluginConfig, Options, Platform, ThemeConfig } from '@rsmax/types';
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
  projectThemeConfig: ThemeConfig;
  entryCollection: EntryCollection;
  webpackCompiler: Compiler;
  buildType: BuildType;
  webpackConfig: any;

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
    this.webpackConfig = this.createWebpackConfig();
    this.webpackCompiler = this.createWebpackCompiler();
  }

  abstract run(): Compiler;

  abstract build(): void;

  abstract watch(): void;

  abstract createWebpackConfig(): Configuration;

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

  fetchProjectThemeConfig(): ThemeConfig {
    const configFile = this.projectPath.themeConfigFile();
    this.projectThemeConfig = readManifest(configFile, this.target, false);
    return this.projectThemeConfig;
  }

  createWebpackCompiler(): Compiler {
    // @ts-expect-error rspack 类型兼容问题
    return rspack(this.webpackConfig);
  }
}

export default Builder;
