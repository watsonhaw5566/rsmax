import type { Options, Platform } from '@rsmax/types';
import type { Compiler } from '@rspack/core';
import { logger, setupLogger } from '../logger';
import API from '../API';
import MultiPlatformBuilder from './MultiPlatformBuilder';

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

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);

  if (Array.isArray(target) && target.length > 1) {
    const multiBuilder = new MultiPlatformBuilder(options);
    return options.watch ? multiBuilder.watch() : multiBuilder.build();
  }

  const finalTarget = Array.isArray(target) ? target[0] : target;
  process.env.RSMAX_PLATFORM = finalTarget as Platform;
  logger.start('🚀 构建应用');
  return run(options, api);
}

export function buildMiniPlugin(options: Options) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const { target } = options;

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);

  if (Array.isArray(target)) {
    const multiBuilder = new MultiPlatformBuilder({
      ...options,
      type: 'miniplugin',
    });
    return options.watch ? multiBuilder.watch() : multiBuilder.build();
  }

  process.env.RSMAX_PLATFORM = target as Platform;
  logger.start('🔨 构建插件');

  const api = new API();
  api.registerPlugins([]);

  const MiniPluginBuilder = require('./MiniPluginBuilder').default;
  return new MiniPluginBuilder(api, options).run();
}

export function buildMiniComponent(options: Options) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  const { target } = options;
  const platformTarget = Array.isArray(target) ? target[0] : target;
  process.env.RSMAX_PLATFORM = platformTarget;

  setupLogger(options.loglevel);
  logger.greet(`Rsmax v${version}`);
  logger.start('🔨 构建组件');

  const api = new API();
  api.registerPlugins([]);

  const MiniComponentBuilder = require('./MiniComponentBuilder').default;
  return new MiniComponentBuilder(api, options).run();
}
