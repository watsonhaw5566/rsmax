import * as path from 'node:path';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import { Compilation, NormalModule } from '@rspack/core';
import { getNativeAssetOutputPath } from '../../utils/paths';

interface Component {
  id: string;
  path: string;
  props: string[];
}

// 模块缓存
const moduleCache = new Map<string, NormalModule>();
// 组件缓存
const compositionComponentsCache = new Map<Compilation, Map<string, Set<string>>>();
// 使用组件缓存
const usingComponentsCache = new Map<string, Map<string, Component>>();

/**
 * 查找模块，使用缓存提高性能
 */
function findModule(compilation: Compilation, file: string) {
  const cacheKey = `${compilation.hash}_${file}`;
  if (moduleCache.has(cacheKey)) {
    return moduleCache.get(cacheKey);
  }

  const module = Array.from(compilation.modules.values()).find((m: any) => slash(m.resource) === file) as NormalModule;

  if (module) {
    moduleCache.set(cacheKey, module);
  }

  return module;
}

/**
 * 计算组合组件，使用缓存提高性能
 */
function compositionComponents(compilation: any) {
  if (compositionComponentsCache.has(compilation)) {
    return compositionComponentsCache.get(compilation)!;
  }

  const cc = new Map<string, Set<string>>();
  Store.compositionComponents.forEach((components, file) => {
    const module = findModule(compilation, file);
    module?.dependencies.forEach((dep: any) => {
      const component = components.get(dep.request);
      const mod = compilation.moduleGraph.getModule(dep);
      if (component && mod) {
        const resource = slash(mod.resource);
        const compositionComponent = cc.get(resource) || new Set<string>();
        component.props.forEach(compositionComponent.add, compositionComponent);
        cc.set(resource, compositionComponent);
      }
    });
  });

  compositionComponentsCache.set(compilation, cc);
  return cc;
}

/**
 * 清除所有缓存，在编译开始时调用
 */
function clearComponentsCache() {
  moduleCache.clear();
  compositionComponentsCache.clear();
  usingComponentsCache.clear();
}

/**
 * 编译小程序自定义组件流程
 *
 * 1. 通过 @babel/plugin-rsmax-host-component 找出每个 module 中从外部 import 的 composition component，放入 Store.compositionComponents；
 * 2. 通过 webpack loader 找出所有小程序自定义组件，放入 Store.nativeComponent；
 * 3. 在 getUsingComponents 方法中通过 compilation.modules 递归遍历所有 page 的 dependencies；
 * 4. 通过 1、2 中的信息从 dependencies 中找出 page 依赖的小程序自定义组件。
 */
function getUsingComponents(page: string, compilation: any, options: any, prefixPath = ''): Map<string, Component> {
  // 生成缓存键
  const cacheKey = `${compilation.hash}_${page}_${prefixPath}`;

  // 检查缓存
  if (usingComponentsCache.has(cacheKey)) {
    return usingComponentsCache.get(cacheKey)!;
  }

  const components = new Map<string, Component>();
  const handledModules = new Set<string>();

  const getComponents = (module: any) => {
    if (!module) {
      return;
    }
    const resource = slash(module.resource);
    // 防止循环依赖
    if (resource) {
      if (handledModules.has(resource)) {
        return;
      }
      handledModules.add(resource);
    }

    // 优化：预先过滤插件组件，避免每次都遍历全部组件
    const pluginComponents = Array.from(Store.pluginComponents.values()).filter(c => c.importers.has(resource));
    pluginComponents.forEach(pluginComponent => {
      components.set(pluginComponent.id, {
        id: pluginComponent.id,
        path: pluginComponent.componentPath,
        props: Array.from(pluginComponent.props.values()),
      });
    });

    // 使用批量处理依赖，减少循环次数
    const dependencies = Array.from(module?.dependencies || []);
    if (dependencies.length === 0) {
      return;
    }

    // 预先获取组合组件，避免在循环中重复调用
    const cc = compositionComponents(compilation);

    dependencies.forEach((dep: any) => {
      const mod = compilation.moduleGraph.getModule(dep);
      if (!mod) return;

      let depModule;
      if (mod.resource) {
        depModule = mod;
      } else if (mod.rootModule) {
        depModule = mod.rootModule;
      } else {
        return;
      }

      const depResource = slash(depModule.resource);
      const nativeComponent = Store.nativeComponents.get(depResource);

      if (nativeComponent) {
        const componentProps = cc.get(depResource);
        const componentPath = slash(path.join(prefixPath, getNativeAssetOutputPath(depResource, options)));
        const props = Array.from(componentProps ? componentProps.values() : []);

        components.set(nativeComponent.id, {
          id: nativeComponent.id,
          path: componentPath.replace(new RegExp(`\\${path.extname(componentPath)}$`), ''),
          props,
        });
      }

      getComponents(depModule);
    });
  };

  const pageModule = findModule(compilation, page);
  getComponents(pageModule);

  // 存入缓存
  usingComponentsCache.set(cacheKey, components);

  return components;
}

export { getUsingComponents, clearComponentsCache };
