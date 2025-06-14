import chokidar from 'chokidar';
import type Builder from './Builder';

let isRunning = true;

export default function watch(builder: Builder, watcher: any, addEntry = false) {
  // 监听额外的文件
  const { entries } = builder.entryCollection;
  chokidar
    .watch([`${builder.options.rootDir}/app.config.{js,ts}`, `${builder.options.rootDir}/theme.config.{js,ts}`], {
      cwd: builder.options.cwd,
    })
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
    .watch(
      [`${builder.options.rootDir}/**/!(app).config.{js,ts}`, `${builder.options.rootDir}/**/!(theme).config.{js,ts}`],
      {
        cwd: builder.options.cwd,
      }
    )
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
