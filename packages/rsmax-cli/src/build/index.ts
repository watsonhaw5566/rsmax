import type { Options } from '@rsmax/types';
import type { Compiler } from '@rspack/core';
import { logger, setupLogger } from '../logger';
import API from '../API';

const version = require('../../package.json').version;

export function run(options: Options, api: API): Compiler {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  setupLogger(options.loglevel);
  api.onBuildStart(options);

  const MiniBuilder = require('./MiniBuilder').default;
  return new MiniBuilder(api, options).run();
}

export function buildMini(options: Options, api?: API) {
  const finalApi = api || new API();
  if (!api) {
    finalApi.registerPlugins(options.plugins);
  }
  return internalBuildApp(options, finalApi);
}

export function internalBuildApp(options: Options, api: API) {
  const { target } = options;
  process.env.RSMAX_PLATFORM = target;

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);
  logger.start('🚀 构建应用');
  return run(options, api);
}

export function buildMiniPlugin(options: Options) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const { target } = options;
  process.env.RSMAX_PLATFORM = target;

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);
  logger.start('🔨 构建插件');

  const api = new API();
  api.registerPlugins([]);

  const MiniPluginBuilder = require('./MiniPluginBuilder').default;
  return new MiniPluginBuilder(api, options).run();
}

export function buildMiniComponent(options: Options) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const { target } = options;
  process.env.RSMAX_PLATFORM = target;

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);
  logger.start('🔨 构建组件');

  const api = new API();
  api.registerPlugins([]);

  const MiniComponentBuilder = require('./MiniComponentBuilder').default;
  return new MiniComponentBuilder(api, options).run();
}
