import * as fs from 'node:fs';
import * as path from 'node:path';
import { slash } from '@rsmax/shared';
import * as resolve from 'resolve';
import { targetExtensions } from '../extensions';
import type Builder from './Builder';
import { replaceExtension } from './utils/paths';

export default class ProjectPath {
  builder: Builder;

  constructor(builder: Builder) {
    this.builder = builder;
  }
  outputDir() {
    return slash(path.join(this.builder.options.cwd, this.builder.options.output));
  }

  srcDir() {
    return slash(path.join(this.builder.options.cwd, this.builder.options.rootDir));
  }

  publicDir() {
    return slash(path.join(this.builder.options.cwd, 'public'));
  }

  appConfigFile() {
    return this.searchJSFile(path.join(this.srcDir(), 'app.config')) || this.srcFile('app.json');
  }

  pluginConfigFile() {
    return this.searchJSFile(path.join(this.srcDir(), 'plugin.config')) || this.srcFile('plugin.json');
  }

  themeConfigFile() {
    return this.searchJSFile(path.join(this.srcDir(), 'theme.config')) || this.srcFile('theme.json');
  }

  srcFile(file: string) {
    return path.join(this.srcDir(), file);
  }

  componentConfigFile(componentFile: string) {
    return this.searchJSFile(replaceExtension(componentFile, '.config'));
  }

  resolveAsset(request: string, from: string): string | null {
    if (request.startsWith('/')) {
      return path.join(this.builder.options.cwd, this.builder.options.rootDir, request);
    }
    try {
      return resolve.sync(request, { basedir: path.dirname(from) });
    } catch (e) {
      return null;
    }
  }

  searchJSFile(file: string) {
    for (const e of targetExtensions(this.builder.target)) {
      const extFile = file + e;
      if (fs.existsSync(extFile)) {
        return slash(extFile);
      }
    }

    return '';
  }
}
