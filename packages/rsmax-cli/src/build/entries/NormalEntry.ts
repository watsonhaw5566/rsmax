import { slash } from '@rsmax/shared';
import readManifest from '../../readManifest';
import type Builder from '../Builder';
import { replaceExtension } from '../utils/paths';

export default class NormalEntry {
  builder: Builder;
  name: string;
  filename: string;

  constructor(builder: Builder, name: string, filename: string) {
    this.builder = builder;
    this.name = name;
    this.filename = slash(filename);
  }

  getManifest() {
    const configFile = this.builder.projectPath.searchJSFile(replaceExtension(this.filename, '.config'));
    return configFile ? readManifest(configFile, this.builder.target) : {};
  }
}
