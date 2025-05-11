import * as path from 'path';
import VirtualEntry from './VirtualEntry';

export default class ComponentEntry extends VirtualEntry {
  outputSource() {
    return `
      import { createComponentConfig } from '@rsmax/runtime';
      import Entry from './${path.basename(this.filename)}';

      Component(createComponentConfig(Entry));
    `;
  }
}
