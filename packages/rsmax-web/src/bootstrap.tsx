import { createRoot } from 'react-dom/client';
import hd from 'umi-hd';
import createApp from './createApp';
import type { BootstrapOptions } from './types';

export default function bootstrap(options: BootstrapOptions) {
  hd();
  const container = document.getElementById('rsmax-app');
  if (!container) throw new Error('Failed to find the root element');
  const root = createRoot(container);
  root.render(createApp(options));
}
