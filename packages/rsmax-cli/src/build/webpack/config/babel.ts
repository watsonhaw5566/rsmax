import fs from 'node:fs';
import path from 'node:path';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { Options } from '@rsmax/types';
import hostComponent from 'babel-plugin-rsmax-host-component';
import * as Lifecycle from 'babel-plugin-rsmax-lifecycle';
import fixRegeneratorRuntime from 'babel-plugin-rsmax-regenerator-runtime';
import type Builder from '../../Builder';

export function resolveBabelConfig(options: Options) {
  if (fs.existsSync(path.join(options.cwd, 'babel.config.js'))) {
    return path.join(options.cwd, 'babel.config.js');
  }
  return false;
}

export function getBabelLoaderOptions(builder: Builder, includeAppLifecycle: boolean) {
  const appEntry = builder.entryCollection.appEntry;
  const srcRoot = builder.projectPath.srcDir();
  const usePlugins: any[] = [];
  if (includeAppLifecycle && appEntry) {
    usePlugins.push(
      Lifecycle.app({
        test: (file: string) => appEntry.filename === slash(file),
      })
    );
  }
  usePlugins.push(
    Lifecycle.page({
      test: (file: string) => {
        const importer = slash(file);
        const root = srcRoot;
        return importer.startsWith(root);
      },
    })
  );
  usePlugins.push(
    hostComponent({
      target: builder.target,
      hostComponents: Store.registeredHostComponents,
      skipHostComponents: Store.skipHostComponents,
      skipProps: [],
      includeProps: [],
    })
  );
  usePlugins.push(fixRegeneratorRuntime());
  return {
    babelrc: false,
    configFile: resolveBabelConfig(builder.options),
    usePlugins,
    reactPreset: true,
    api: builder.api,
    compact: process.env.NODE_ENV === 'production',
  };
}
