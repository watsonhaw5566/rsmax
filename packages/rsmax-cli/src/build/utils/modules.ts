import { Chunk, Compilation, Module } from '@rspack/core';

function getModuleResource(module: Module): string {
  if (!module) {
    return '';
  }
  // 跳过 css 模块
  if (module.constructor.name === 'CssModule') {
    return '';
  }
  // TODO: 针对不同类型的 module 做处理
  // @ts-expect-error
  return module.resource || module.rootModule?.resource;
}

function getModule(module: Module, modules: string[], compilation: Compilation): string[] {
  const resource = getModuleResource(module);
  if (!resource) {
    return [];
  }
  return Array.from(
    new Set([
      resource,
      ...module.dependencies.reduce((acc: string[], d) => {
        const newModules = [...acc, ...modules];
        const module = compilation.moduleGraph.getModule(d);
        if (!module) {
          return acc;
        }
        const resource = getModuleResource(module);
        if (!resource) {
          return acc;
        }
        if (newModules.includes(resource)) {
          return acc;
        }
        return [...acc, resource, ...getModule(module, [...newModules, resource], compilation)];
      }, []),
    ])
  );
}

function getModules(chunk: Chunk, compilation: Compilation): string[] {
  if (!chunk) {
    return [];
  }
  const modules = compilation.chunkGraph.getChunkModules(chunk);
  const filenames = modules
    .reduce((acc: string[], cur) => [...acc, ...getModule(cur, acc, compilation)], [])
    .filter(Boolean)
    .sort();
  // webpack mode: development production 两种构建模式 chunk 的 modules 有可能不一样
  // fixed: 两种构建模式 chunk 的 modules 数据不一样，导致运行时 pageEvents 数据为空
  // fixed: chunk.entryModule 会导致 构建组件时 出现 multiple entries 的问题
  // @ts-ignore
  const entryModule = modules.find(m => m.rootModule) || {};
  // @ts-ignore
  const m = (entryModule.modules || entryModule._modules || []).map(m => m.resource || m.rootModule?.resource);
  return Array.from(new Set(filenames.concat(m)));
}

export default getModules;
