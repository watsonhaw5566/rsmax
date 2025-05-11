import * as path from 'path';
import VirtualEntry from './VirtualEntry';

export default class AppEntry extends VirtualEntry {
  outputSource() {
    return `
      import { createAppConfig } from '@rsmax/runtime';
      import Entry from './${path.basename(this.filename)}';

      App(createAppConfig(Entry));
    `;
  }
}
