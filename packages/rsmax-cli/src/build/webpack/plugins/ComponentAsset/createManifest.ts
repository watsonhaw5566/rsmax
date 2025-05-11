import { Compilation, sources } from 'webpack';
import path from 'path';
import SourceCache from '../../../../SourceCache';
import { getUsingComponents } from '../getUsingComponents';
import Builder from '../../../Builder';
import ComponentEntry from '../../../entries/ComponentEntry';

export default function createManifest(
  builder: Builder,
  component: ComponentEntry,
  compilation: Compilation,
  cache: SourceCache
) {
  const { options } = builder;
  const manifestPath = component.name + '.json';
  const config = component.getManifest();

  const prePath = path.relative(
    path.join('./', options.output, path.dirname(manifestPath)),
    path.join('./', options.output)
  );
  const usingComponents: Record<string, string> = {};

  getUsingComponents(component.filename, compilation, options, prePath).forEach(component => {
    let compentPath = component.path;
    if (!compentPath.startsWith('.')) {
      compentPath = './' + compentPath;
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
