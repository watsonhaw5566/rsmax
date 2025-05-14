import * as path from 'node:path';
import VirtualEntry from './VirtualEntry';

export default class MpaEntry extends VirtualEntry {
  outputSource() {
    const config = this.builder.api.onPageConfig({
      page: this.name,
      config: this.getManifest(),
    });

    return `
      import '@rsmax/web/assets/normalize.css';
      import '@rsmax/web/assets/app.css';
      import App from '@/app';
      import Page from './${path.basename(this.filename)}';
      import { bootstrapMpa } from '@rsmax/web';

      bootstrapMpa({
        appComponent: App,
        pageComponent: Page,
        page: ${JSON.stringify(
          {
            route: this.name,
            config,
          },
          null,
          2
        )},
        appConfig: ${JSON.stringify(this.builder.projectConfig, null, 2)},
        plugins: [
          ${this.builder.api
            .getRuntimePluginFiles()
            .map(file => `require('${file}')`)
            .join(',')}
        ]
      });
    `;
  }
}
