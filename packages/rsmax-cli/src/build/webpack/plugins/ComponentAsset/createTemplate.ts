import path from 'node:path';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { Meta, Options } from '@rsmax/types';
import { type Compilation, sources } from '@rspack/core';
import ejs from 'ejs';
import { sortBy } from 'lodash';
import type SourceCache from '../../../../SourceCache';
import type ComponentEntry from '../../../entries/ComponentEntry';
import { getUsingComponents } from '../getUsingComponents';

export function createRenderOptions(componentPath: string, compilation: Compilation, options: Options) {
  const components = new Map(Store.getCollectedComponents());

  getUsingComponents(componentPath, compilation, options).forEach(component => {
    components.set(component.id, {
      id: component.id,
      props: component.props,
      type: 'native',
    });
  });

  return {
    components,
    skipComponents: Store.skipHostComponents,
    slotView: {
      props: [...new Set(Store.slotView.props || [])].sort(),
    },
  };
}

export default async function createComponentTemplate(
  component: ComponentEntry,
  options: Options,
  meta: Meta,
  compilation: Compilation,
  cache: SourceCache
) {
  const fileName = slash(`${component.name}${meta.template.extension}`);

  let baseTemplate = `/base${meta.template.extension}`;

  // 如果是组件构建，生成相对路径
  if (component.builder.buildType === 'minicomponent') {
    baseTemplate = slash(path.relative(path.dirname(`./${fileName}`), `.${baseTemplate}`));
  }

  const ejsOptions: { [props: string]: any } = {
    ...createRenderOptions(component.filename, compilation, options),
    renderIsolatedTemplates: false,
    baseTemplate,
    sortBy,
  };

  let source: string = await ejs.renderFile(meta.ejs.page, ejsOptions, {
    rmWhitespace: false,
  });

  cache.invalid(fileName, source, () => {
    compilation.assets[fileName] = new sources.RawSource(source);
  });
}
