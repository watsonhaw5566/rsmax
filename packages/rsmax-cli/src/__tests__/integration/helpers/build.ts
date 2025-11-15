import path from 'node:path';
import fs from 'node:fs';
import nodeExternals from 'webpack-node-externals';
import { slash } from '@rsmax/shared';
import API from '../../../API';
import getConfig from '../../../getConfig';
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
  const api = new API();

  api.registerPlugins(config.plugins);

  const externals: any = [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../../../../../node_modules'),
      allowlist: [...(options.externalsIgnore || []), /@swc\/helpers.*/],
    }),
  ];

  const remaxOptions = {
    ...config,
    target,
    configWebpack(context: any) {
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .resolve.alias.merge({
          '@components': path.resolve(cwd, 'src/components'),
          '@c': path.resolve(cwd, 'src/components'),
        })
        .end()
        .end()
        .externals([...(context.config.get('externals') || []), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);
      if (typeof config.configWebpack === 'function') {
        config.configWebpack(context);
      }
    },
    ...extraRemaxOptions,
  };

  const builder = target === 'web' ? new WebBuilder(api, remaxOptions) : new MiniBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise(resolve => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        info?.errors?.forEach(err => {
          console.error(err.message);
        });
        throw new Error(info?.errors?.join('\n'));
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          console.warn(warning.message);
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
      console.error(error.message);
      throw error;
    });
  });
}

export async function buildMiniPlugin(app: string, target: Platform = 'ali', options: Partial<Options> = {}): Promise<OutputFile[]> {
  const cwd = path.resolve(__dirname, `../fixtures/${app}`);
  process.chdir(cwd);
  process.env.NODE_ENV = 'test';
  process.env.RSMAX_PLATFORM = target;

  const config = getConfig();
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
    configWebpack(context: { config: Config; rspack: any }) {
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .externals([...context.config.get('externals'), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);

      if (typeof config.configWebpack === 'function') {
        config.configWebpack(context);
      }
    },
  };

  const builder = new MiniPluginBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise(resolve => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        throw new Error(info?.errors?.join('\n'));
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          console.warn(warning);
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
      console.error(error.message);
      throw error;
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
    configWebpack(context: { config: Config; rspack: any }) {
      context.config
        .mode('none')
        .plugins.delete('rspackbar')
        .end()
        .externals([...context.config.get('externals'), ...externals])
        .optimization.moduleIds('deterministic')
        .minimize(false);

      if (typeof config.configWebpack === 'function') {
        config.configWebpack(context);
      }
    },
  };

  const builder = new MiniComponentBuilder(api, remaxOptions);
  const compiler = builder.run();

  return new Promise(resolve => {
    compiler.hooks.done.tap('done', stats => {
      const info = stats.toJson();

      if (stats.hasErrors()) {
        console.error(info.errors);
        throw new Error(info?.errors?.join('\n'));
      }

      if (stats.hasWarnings()) {
        info?.warnings?.forEach(warning => {
          console.warn(warning);
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
      console.error(error.message);
      throw error;
    });
  });
}

export const JEST_BUILD_TIMEOUT = 5 * 1000;
