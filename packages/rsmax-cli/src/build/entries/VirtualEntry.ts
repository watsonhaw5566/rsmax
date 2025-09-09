import fs from 'node:fs';
import path from 'node:path';
import { type Compilation, type Compiler, EntryPlugin, rspack } from '@rspack/core';
import type Builder from '../Builder';
import { replaceExtension } from '../utils/paths';
import NormalEntry from './NormalEntry';

export default class VirtualEntry extends NormalEntry {
  originalSource: string;
  virtualPath: string;
  virtualModule: any;

  constructor(builder: Builder, name: string, filename: string) {
    super(builder, name, filename);
    this.originalSource = fs.existsSync(this.filename) ? fs.readFileSync(this.filename).toString() : '';
    this.virtualPath = path.resolve(
      replaceExtension(this.filename, this.filename.endsWith('.ts') ? '.entry.ts' : '.entry.js')
    );
    this.virtualModule = new rspack.experiments.VirtualModulesPlugin({
      [this.virtualPath]: this.outputSource(),
    });
  }

  outputSource() {
    return this.originalSource;
  }

  updateSource(force = false) {
    const source = fs.readFileSync(this.filename).toString();
    if (!force && source === this.originalSource) {
      return;
    }
    this.originalSource = source;
    this.virtualModule.writeModule(this.virtualPath, this.outputSource());
  }

  addToWebpack(compiler: Compiler, compilation: Compilation) {
    return new Promise<void>((resolve, reject) => {
      if (!this.virtualModule._compiler) {
        this.virtualModule.apply(compiler);
        this.virtualModule.writeModule(this.virtualPath, this.outputSource());
      }
      fs.writeFileSync(this.virtualPath, this.outputSource());
      const dep = EntryPlugin.createDependency(this.virtualPath);
      compilation.addEntry('', dep, { name: this.name }, err => {
        if (err) {
          console.error(err);
          reject(err);
        }
        resolve();
      });
    });
  }
}
