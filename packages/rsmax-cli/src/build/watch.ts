import chokidar from 'chokidar';
import Builder from './Builder';

let isRunning = true;

export default function watch(builder: Builder, watcher: any) {
  // 监听额外的文件
  chokidar
    .watch([`${builder.options.rootDir}/app.config.{js,ts}`, `${builder.options.rootDir}/theme.config.{js,ts}`], {
      cwd: builder.options.cwd,
    })
    .on('change', () => {
      if (isRunning) return;
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
