import { Chunk, Compilation, Module } from '@rspack/core';

interface ExtendedModule extends Module {
  resource?: string;
  rootModule?: {
    resource?: string;
  };
  modules?: ExtendedModule[];
  _modules?: ExtendedModule[];
}

/**
 * 获取模块的资源路径
 */
function getModuleResource(module: ExtendedModule): string {
  if (!module) return '';

  // 跳过 CSS 模块
  if (module.constructor.name === 'CssModule') return '';

  return module.resource || module.rootModule?.resource || '';
}

/**
 * 从模块依赖图中收集所有相关模块的资源路径
 */
function collectModuleResources(module: ExtendedModule, visited: Set<string>, compilation: Compilation): Set<string> {
  const resource = getModuleResource(module);
  if (!resource || visited.has(resource)) return visited;

  visited.add(resource);

  // 处理模块依赖
  for (const dependency of module.dependencies) {
    const dependentModule = compilation.moduleGraph.getModule(dependency) as ExtendedModule;
    if (dependentModule) {
      collectModuleResources(dependentModule, visited, compilation);
    }
  }

  return visited;
}

/**
 * 获取 chunk 相关的所有模块资源路径
 */
function getModules(chunk: Chunk, compilation: Compilation): string[] {
  if (!chunk) return [];

  const modules = compilation.chunkGraph.getChunkModules(chunk) as ExtendedModule[];
  const resourceSet = new Set<string>();

  // 收集常规模块资源
  modules.forEach(module => {
    collectModuleResources(module, resourceSet, compilation);
  });

  // 处理入口模块
  const entryModule = modules.find(m => m.rootModule) as ExtendedModule;
  if (entryModule) {
    const entryModules = [...(entryModule.modules || []), ...(entryModule._modules || [])];
    entryModules.forEach(m => {
      const resource = getModuleResource(m);
      if (resource) resourceSet.add(resource);
    });
  }

  return Array.from(resourceSet).sort();
}

export default getModules;
