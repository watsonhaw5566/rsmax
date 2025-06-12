import { RuntimeOptions } from '@rsmax/framework-shared';
import { createBrowserHistory, createHashHistory } from 'history';
import { createRoot } from 'react-dom/client';
import hd from 'umi-hd';
import createApp from './createApp';
import type { BootstrapOptions } from './types';

export default function bootstrap(options: BootstrapOptions) {
  hd();
  const { appConfig } = options;
  const history =
    !appConfig.router || appConfig.router.type !== 'browser' ? createHashHistory() : createBrowserHistory();

  RuntimeOptions.apply({ history, mpa: false });
  const container = document.getElementById('rsmax-app');
  if (!container) throw new Error('Failed to find the root element');
  const root = createRoot(container);
  root.render(createApp(options, history));
}
