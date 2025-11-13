import path from 'node:path';
import chokidar from 'chokidar';
import type Builder from './Builder';

let isRunning = true;

export default function watch(builder: Builder, watcher: any, addEntry = false) {
  // 监听额外的文件
  const { entries } = builder.entryCollection;
  chokidar
    .watch(
      [
        `${builder.options.rootDir}/app.config.js`,
        `${builder.options.rootDir}/app.config.ts`,
        `${builder.options.rootDir}/theme.config.js`,
        `${builder.options.rootDir}/theme.config.ts`,
      ],
      {
        cwd: builder.options.cwd,
      }
    )
    .on('change', () => {
      if (isRunning) return;
      if (addEntry) {
        builder.fetchProjectConfig();
        builder.fetchProjectThemeConfig();
        builder.entryCollection.init();
        const nextEntries = builder.entryCollection.entries;
        nextEntries.forEach(entry => {
          if (!entries.get(entry.filename)) {
            entry.virtualModule.apply(builder.webpackCompiler);
            entry.updateSource(true);
          }
        });
      }
      watcher.invalidate();
    });

  chokidar
    .watch(builder.options.rootDir, {
      cwd: builder.options.cwd,
      ignored: (p, s) => {
        const name = path.basename(p);
        if (s?.isDirectory()) return false;
        const isConfig = /\.config\.(js|ts)$/.test(name);
        const isExcluded = /^app\.config\.(js|ts)$/.test(name) || /^theme\.config\.(js|ts)$/.test(name);
        return !(isConfig && !isExcluded);
      },
    })
    .on('all', () => {
      if (isRunning) return;
      watcher.invalidate();
    });

  builder.webpackCompiler.hooks.watchRun.tap('watchRun', () => {
    isRunning = true;
  });

  builder.webpackCompiler.hooks.done.tap('done', () => {
    isRunning = false;
  });

  return watcher;
}
