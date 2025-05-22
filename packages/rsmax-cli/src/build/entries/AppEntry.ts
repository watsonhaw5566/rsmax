import VirtualEntry from './VirtualEntry';

export default class AppEntry extends VirtualEntry {
  outputSource() {
    return `
      import { createAppConfig } from '@rsmax/runtime';
      import Entry from '${this.filename}';

      App(createAppConfig(Entry));
    `;
  }
}
