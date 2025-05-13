import VirtualEntry from './VirtualEntry';

export default class PageEntry extends VirtualEntry {
  outputSource() {
    return `
      import { createPageConfig } from '@rsmax/runtime';
      import Entry from '${this.filename}';

      Page(createPageConfig(Entry, '${this.name}'));
    `;
  }
}
