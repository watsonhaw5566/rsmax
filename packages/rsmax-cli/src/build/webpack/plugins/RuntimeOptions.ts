import { Compiler, Compilation, Chunk, sources } from 'webpack';
import * as path from 'path';
import { slash } from '@rsmax/shared';
import Store from '@rsmax/build-store';
import getModules from '../../utils/modules';
import Builder from '../../Builder';
import PageEntry from '../../entries/PageEntry';

const PLUGIN_NAME = 'RsmaxRuntimeOptionsPlugin';

type Events = Set<string>;

export const pageClassEvents = new Map<string, Events>();
export const appClassEvents = new Map<string, Events>();

export default class RuntimeOptionsPlugin {
  builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
      compilation.hooks.optimizeChunks.tap(PLUGIN_NAME, chunks => {
        const hostComponents = this.getHostComponents();
        const pageEvents = this.getPageEvents(chunks as Chunk[], compilation);
        const appEvents = this.getAppEvents();

        if (this.builder.buildType === 'minicomponent') {
          this.builder.entryCollection.entries.forEach(entry => {
            const pathArr = entry.name.split('/');
            const assetsPath = pathArr.splice(0, pathArr.length - 1).join('/');
            this.createRuntimeOptions(compilation, hostComponents, pageEvents, appEvents, assetsPath);
          });
        } else {
          this.createRuntimeOptions(compilation, hostComponents, pageEvents, appEvents, '');
        }
      });
    });
  }

  createRuntimeOptions(
    compilation: Compilation,
    hostComponents: any,
    pageEvents: any,
    appEvents: any,
    assetsPath: string
  ) {
    compilation.assets[path.join(assetsPath, '__rsmax_runtime_options__.js')] = new sources.OriginalSource(
      `module.exports = {
      hostComponents: ${JSON.stringify(hostComponents, null, 2)},
      pageEvents: ${JSON.stringify(pageEvents, null, 2)},
      appEvents: ${JSON.stringify(appEvents, null, 2)}
    }`,
      '__rsmax_runtime_options__.js'
    );
  }

  getPageEvents(chunks: Chunk[], compilation: Compilation) {
    const events: any = {};

    const { entries } = this.builder.entryCollection;

    entries.forEach(page => {
      if (!(page instanceof PageEntry)) {
        return;
      }
      const chunk = Array.from(chunks).find(c => {
        return c.name === page.name;
      });

      const modules = getModules(chunk!, compilation);

      events[page.name] = Array.from(
        new Set(
          modules
            .reduce<string[]>((acc, cur) => {
              return [...acc, ...(Store.pageEvents.get(slash(cur)) || []), ...(pageClassEvents.get(slash(cur)) || [])];
            }, [])
            .sort()
        )
      );
    });

    return events;
  }

  getAppEvents() {
    let events: string[] = [];
    for (const key of Store.appEvents.keys()) {
      // 这里 get 不可能为空
      events = events.concat(Array.from(Store.appEvents.get(key)!));
    }

    for (const key of appClassEvents.keys()) {
      // 这里 get 不可能为空
      events = events.concat(Array.from(appClassEvents.get(key)!));
    }

    return Array.from(new Set(events.sort()));
  }

  getHostComponents() {
    return [...Store.registeredHostComponents.keys()].reduce((obj, key) => {
      obj[key] = {
        alias: Store.registeredHostComponents.get(key)?.alias || {},
      };

      return obj;
    }, {} as any);
  }
}
