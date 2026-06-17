import * as path from 'node:path';
import { type Compilation, sources } from '@rspack/core';
import type SourceCache from '../../../../SourceCache';
import type Builder from '../../../Builder';
import type PageEntry from '../../../entries/PageEntry';
import { getUsingComponents } from '../getUsingComponents';

export default function createManifest(
  builder: Builder,
  page: PageEntry,
  compilation: Compilation,
  cache: SourceCache
) {
  const { options, api } = builder;
  const manifestPath = `${page.name}.json`;
  const config = page.getManifest();

  const prefixPath = path.relative(
    path.join('./', options.output, path.dirname(manifestPath)),
    path.join('./', options.output)
  );

  const usingComponents: Record<string, string> = {};

  getUsingComponents(page.filename, compilation, options, prefixPath).forEach(component => {
    usingComponents[component.id] = component.path;
  });

  config.usingComponents = {
    ...(config.usingComponents || {}),
    ...usingComponents,
  };

  const source = JSON.stringify(
    api.onPageConfig({
      page: page.name,
      config,
    }),
    null,
    2
  );

  cache.invalid(manifestPath, source, () => {
    compilation.assets[manifestPath] = new sources.RawSource(source);
  });
}
