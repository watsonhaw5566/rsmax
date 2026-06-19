import path from 'node:path';
import fs from 'node:fs';
import nodeExternals from 'webpack-node-externals';
import { slash } from '@rsmax/shared';
import API from '../../../API';
import getConfig from '../../../getConfig';
import { logger } from '../../../logger';
import type { Platform } from '@rsmax/types';
import Config from 'rspack-chain';
import MiniBuilder from '../../../build/MiniBuilder';
import MiniPluginBuilder from '../../../build/MiniPluginBuilder';
import WebBuilder from '../../../build/WebBuilder';
import MiniComponentBuilder from '../../../build/MiniComponentBuilder';

export interface OutputFile {
  fileName: string;
  code: Buffer;
}

function getFilesInDir(root: string, fsPath: string) {
  const list = fs.readdirSync(fsPath);
  let outputs: OutputFile[] = [];

  list.forEach((fileName: any) => {
    const filePath = path.join(fsPath, fileName);
    if (fs.statSync(filePath).isDirectory()) {
      outputs = outputs.concat(getFilesInDir(root, filePath));
    } else {
      outputs.push({
        fileName: slash(filePath).replace(slash(root), ''),
        code: fs.readFileSync(filePath) as Buffer,
      });
    }
  });

  return outputs;
}

interface Options {
  include: string[];
  exclude: string[];
  externalsIgnore: string[];
}

function cleanOutput(cwd: string, outputDir: string) {
  const target = path.join(cwd, outputDir);
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

export async function buildApp(
  app: string,
  target: Platform,
  options: Partial<Options> = {},
  extraRemaxOptions?: any
): Promise<OutputFile[]> {
  const cwd = path.resolve(__dirname, `../fixtures/${app}`);
  process.chdir(cwd);
  process.env.NODE_ENV = 'test';
  process.env.RSMAX_PLATFORM = target;

  const config = getConfig();
  cleanOutput(cwd, config.output || 'dist');

  const api = new API();

  api.registerPlugins(config.plugins);

  const externals: any = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../../../../node_modules'),
      allowlist: options.externalsIgnore,
    }),
  ];

  const remaxOptions = {
    ...config,
    target,
    configRspack(context: any) {
      const fakeModules = path.resolve(cwd, 'fake_modules');
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .resolve.modules.merge(
          fs.existsSync(fakeModules) ? [fakeModules, 'node_modules'] : ['node_modules']
        )
        .end()
        .alias.merge({
          '@components': path.resolve(cwd, 'src/components'),
          '@c': path.resolve(cwd, 'src/components'),
        })
        .end()
        .end()
        .externals([...(context.config.get('externals') || []), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);
      if (typeof config.configRspack === 'function') {
        config.configRspack(context);
      }
    },
    ...extraRemaxOptions,
  };

  const builder = target === 'web' ? new WebBuilder(api, remaxOptions) : new MiniBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        info?.errors?.forEach(err => {
          const msg = (err && typeof err === 'object') ? (err.message ?? JSON.stringify(err).slice(0, 3000)) : String(err);
          logger.error('ERROR-PREVIEW:', msg);
        });
        reject(new Error(info?.errors?.map((e: any) => (e && e.message) || String(e)).join('\n')));
        return;
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          logger.warn(warning.message);
        });
      }

      const exclude = options.exclude || ['node_modules'];
      const include = options.include || [];
      const includeRegExp = new RegExp(`(${include.join('|')})`);
      const excludeRegExp = new RegExp(`(${exclude.join('|')})`);
      const outputDir = path.join(remaxOptions.cwd, remaxOptions.output);

      const output = getFilesInDir(outputDir + '/', outputDir).filter(
        c =>
          (include.length > 0 && includeRegExp.test(c.fileName)) ||
          (exclude.length > 0 && !excludeRegExp.test(c.fileName))
      );

      resolve(output);
    });

    compiler.hooks.failed.tap('failed', error => {
      logger.error(error.message);
      reject(error);
    });
  });
}

export async function buildMiniPlugin(app: string, target: Platform = 'ali', options: Partial<Options> = {}): Promise<OutputFile[]> {
  const cwd = path.resolve(__dirname, `../fixtures/${app}`);
  process.chdir(cwd);
  process.env.NODE_ENV = 'test';
  process.env.RSMAX_PLATFORM = target;

  const config = getConfig();
  cleanOutput(cwd, config.output || 'dist');

  const api = new API();

  api.registerPlugins(config.plugins);

  const externals: any = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../../../../node_modules'),
      allowlist: options.externalsIgnore,
    }),
  ];

  const remaxOptions = {
    ...config,
    target,
    configRspack(context: { config: Config; rspack: any }) {
      const fakeModules = path.resolve(cwd, 'fake_modules');
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .resolve.modules.merge(
          fs.existsSync(fakeModules) ? [fakeModules, 'node_modules'] : ['node_modules']
        )
        .end()
        .end()
        .externals([...context.config.get('externals'), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);

      if (typeof config.configRspack === 'function') {
        config.configRspack(context);
      }
    },
  };

  const builder = new MiniPluginBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        logger.error(info.errors);
        reject(new Error(info?.errors?.join('\n')));
        return;
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          logger.warn(warning);
        });
      }

      const exclude = options.exclude || ['node_modules'];
      const include = options.include || [];
      const includeRegExp = new RegExp(`(${include.join('|')})`);
      const excludeRegExp = new RegExp(`(${exclude.join('|')})`);
      const outputDir = path.join(remaxOptions.cwd, remaxOptions.output);

      const output = getFilesInDir(outputDir + '/', outputDir).filter(
        c =>
          (include.length > 0 && includeRegExp.test(c.fileName)) ||
          (exclude.length > 0 && !excludeRegExp.test(c.fileName))
      );

      resolve(output);
    });

    compiler.hooks.failed.tap('failed', error => {
      logger.error(error.message);
      reject(error);
    });
  });
}

export function buildMiniComponent(
  app: string,
  inputs: { [k: string]: string },
  target: Platform,
  options: Partial<Options> = {}
): Promise<OutputFile[]> {
  const cwd = path.resolve(__dirname, `../fixtures/${app}`);
  process.chdir(cwd);
  process.env.NODE_ENV = 'test';
  process.env.RSMAX_PLATFORM = target;

  const config = getConfig();
  cleanOutput(cwd, config.output || 'dist');

  const api = new API();

  api.registerPlugins(config.plugins);

  const externals: any = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../../../../node_modules'),
      allowlist: options.externalsIgnore,
    }),
  ];

  const remaxOptions = {
    ...config,
    input: inputs,
    target,
    configRspack(context: { config: Config; rspack: any }) {
      const fakeModules = path.resolve(cwd, 'fake_modules');
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .resolve.modules.merge(
          fs.existsSync(fakeModules) ? [fakeModules, 'node_modules'] : ['node_modules']
        )
        .end()
        .end()
        .externals([...context.config.get('externals'), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);

      if (typeof config.configRspack === 'function') {
        config.configRspack(context);
      }
    },
  };

  const builder = new MiniComponentBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        logger.error(info.errors);
        reject(new Error(info?.errors?.join('\n')));
        return;
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          logger.warn(warning);
        });
      }

      const exclude = options.exclude || ['node_modules'];
      const include = options.include || [];
      const includeRegExp = new RegExp(`(${include.join('|')})`);
      const excludeRegExp = new RegExp(`(${exclude.join('|')})`);
      const outputDir = path.join(remaxOptions.cwd, remaxOptions.output);

      const output = getFilesInDir(outputDir + '/', outputDir).filter(
        c =>
          (include.length > 0 && includeRegExp.test(c.fileName)) ||
          (exclude.length > 0 && !excludeRegExp.test(c.fileName))
      );

      resolve(output);
    });

    compiler.hooks.failed.tap('failed', error => {
      logger.error(error.message);
      reject(error);
    });
  });
}

export const JEST_BUILD_TIMEOUT = 10 * 1000;
