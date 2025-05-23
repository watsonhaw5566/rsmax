import fs from 'node:fs';
import path from 'node:path';
import VirtualModulesPlugin from 'webpack-virtual-modules';
import Builder from '../Builder';
import NormalEntry from './NormalEntry';
import { replaceExtension } from '../utils/paths';
import { Compilation, Compiler, EntryDependency } from '@rspack/core';

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
    this.virtualModule = new VirtualModulesPlugin({
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
      // fs.writeFileSync(this.virtualPath, this.outputSource());
      const dep = new EntryDependency(this.virtualPath);
      // rspack 中 addEntry 不允许加入虚拟文件，所以写入虚拟模块入口时需要先落盘 this.virtualPath 文件
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
