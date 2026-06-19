import fs from 'node:fs';
import { slash } from '@rsmax/shared';
import type { LoaderContext } from '@rspack/core';
import { logger } from '../../logger';
import type Builder from '../Builder';
import NativeAssets from '../NativeAssets';
import { getNativeAssetOutputPath, replaceExtension } from '../utils/paths';
import VirtualEntry from './VirtualEntry';

interface Manifest {
  // JSON 中 usingComponents 的值在运行时可能为 null/number/object，
  // 因此在此处声明为 unknown，由调用点进行类型检查而非依赖静态类型
  usingComponents?: Record<string, unknown>;
}

function normalizeName(name: string) {
  return name.replace(/@/g, '_');
}

export default class NativeEntry extends VirtualEntry {
  dependentEntries: NativeEntry[] = [];
  assets: NativeAssets;

  constructor(builder: Builder, name: string, filename: string) {
    super(builder, normalizeName(name), filename);
    this.assets = new NativeAssets(builder, filename);
  }

  getManifest() {
    const dependentEntries = this.getDependentEntries();
    const rawManifest = this.readRawManifest();
    const usingComponents: Manifest['usingComponents'] = rawManifest.usingComponents ?? {};
    dependentEntries.forEach((entry, name) => {
      usingComponents[name] = `/${entry.name}`;
    });
    return {
      ...rawManifest,
      usingComponents,
    };
  }

  getDependentEntries() {
    const { usingComponents = {} } = this.readRawManifest();
    return Object.keys(usingComponents).reduce((acc: Map<string, NativeEntry>, name: string) => {
      const rawRequest = usingComponents[name];
      // JSON 中的值可能不是字符串（例如 null/number/object），
      // 在调用 startsWith 前必须进行类型检查，避免清单格式问题导致构建崩溃
      if (typeof rawRequest !== 'string') {
        logger.warn(
          `Invalid usingComponents value for "${name}" in ${this.name}: expected string, got ${typeof rawRequest}`
        );
        return acc;
      }
      const request: string = rawRequest;
      if (request.startsWith('plugin://')) {
        return acc;
      }
      // 1) 裸模块名 (如 "moduleC")：先尝试用 resolve.sync 直接解析，
      //    让 node 标准包解析机制在 node_modules 中查找
      // 2) 相对/绝对路径：按原逻辑尝试 request + .js / .ts
      const isBareModule = !request.startsWith('.') && !request.startsWith('/');
      let entry: NativeEntry | undefined;

      if (isBareModule) {
        const resolved = this.builder.projectPath.resolveAsset(request, this.filename);
        if (resolved && fs.existsSync(resolved)) {
          entry = this.builder.entryCollection.nativeComponentEntries.get(resolved);
          if (entry) {
            entry.updateSource();
          } else {
            const output = getNativeAssetOutputPath(replaceExtension(resolved, ''), this.builder.options);
            entry = new NativeEntry(this.builder, output, resolved);
          }
          acc.set(name, entry);
          return acc;
        }
      }

      const fileExist = ['.js', '.ts'].some(ext => {
        const filename = this.builder.projectPath.resolveAsset(request + ext, this.filename);
        if (filename && fs.existsSync(filename)) {
          if (slash(filename) === slash(this.filename)) {
            return true;
          }
          entry = this.builder.entryCollection.nativeComponentEntries.get(filename);
          if (entry) {
            entry.updateSource();
          } else {
            const output = getNativeAssetOutputPath(replaceExtension(filename, ''), this.builder.options);
            entry = new NativeEntry(this.builder, output, filename);
          }
          acc.set(name, entry);
          return true;
        }
        return false;
      });

      if (!fileExist) {
        logger.warn(`${request} can not be resolved in ${this.name}'s \`usingComponents\`.`);
      }

      return acc;
    }, new Map());
  }

  getAssets() {
    return this.assets.getAll();
  }

  watchAssets(loaderContext: LoaderContext<any>) {
    this.assets.getAll().forEach(asset => {
      loaderContext.addDependency(asset.filename);
    });
    loaderContext.addDependency(this.rawManifestFile);
    loaderContext.addDependency(this.filename);
  }

  get rawManifestFile() {
    return replaceExtension(this.filename, '.json');
  }

  private readRawManifest(): Manifest {
    const manifestFile = this.rawManifestFile;
    if (fs.existsSync(manifestFile)) {
      try {
        return JSON.parse(fs.readFileSync(manifestFile).toString());
      } catch (e) {
        return {};
      }
    }
    return {};
  }
}
