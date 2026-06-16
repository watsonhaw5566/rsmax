import path from 'node:path';
import { type Compilation, sources } from '@rspack/core';
import type SourceCache from '../../../../SourceCache';
import type Builder from '../../../Builder';
import type ComponentEntry from '../../../entries/ComponentEntry';
import { getUsingComponents } from '../getUsingComponents';

export default function createManifest(
  builder: Builder,
  component: ComponentEntry,
  compilation: Compilation,
  cache: SourceCache
) {
  const { options } = builder;
  const manifestPath = `${component.name}.json`;
  const config = component.getManifest();

  const prePath = path.relative(
    path.join('./', options.output, path.dirname(manifestPath)),
    path.join('./', options.output)
  );
  const usingComponents: Record<string, string> = {};

  getUsingComponents(component.filename, compilation, options, prePath).forEach(component => {
    let compentPath = component.path;
    if (!compentPath.startsWith('.')) {
      compentPath = `./${compentPath}`;
    }
    usingComponents[component.id] = compentPath;
  });

  config.component = true;
  config.usingComponents = {
    ...(config.usingComponents || {}),
    ...usingComponents,
  };

  const source = JSON.stringify(config, null, 2);

  cache.invalid(manifestPath, source, () => {
    compilation.assets[manifestPath] = new sources.RawSource(source);
  });
}
