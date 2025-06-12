import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { EntryInfo, Meta, Options } from '@rsmax/types';
import { type Compilation, sources } from '@rspack/core';
import ejs from 'ejs';
import { sortBy } from 'lodash';
import type API from '../../../../API';
import type SourceCache from '../../../../SourceCache';
import { ensureDepth } from '../../../../defaultOptions/UNSAFE_wechatTemplateDepth';
import type NormalEntry from '../../../entries/NormalEntry';
import PageEntry from '../../../entries/PageEntry';
import { getUsingComponents } from '../getUsingComponents';

export function createRenderOptions(page: string, compilation: Compilation, options: Options, filter = true) {
  const components = new Map(Store.getCollectedComponents());

  if (filter) {
    getUsingComponents(page, compilation, options).forEach(component => {
      components.set(component.id, {
        id: component.id,
        props: component.props,
        type: 'native',
      });
    });
  }

  return {
    components,
    skipComponents: Store.skipHostComponents,
    slotView: {
      props: [...new Set(Store.slotView.props || [])].sort(),
    },
  };
}

export default async function createPageTemplate(
  api: API,
  options: Options,
  page: EntryInfo,
  meta: Meta,
  compilation: Compilation,
  cache: SourceCache
) {
  const fileName = slash(`${page.name}${meta.template.extension}`);

  const ejsOptions: { [props: string]: any } = {
    ...createRenderOptions(page.filename, compilation, options),
    baseTemplate: `/base${meta.template.extension}`,
    sortBy,
  };

  if (meta.jsHelper) {
    ejsOptions.jsHelper = `./${page.name}_helper${meta.jsHelper.extension}`;
  }

  let source: string = await ejs.renderFile(meta.ejs.page, ejsOptions, {
    rmWhitespace: options.compressTemplate,
  });

  source = api.onPageTemplate({ template: source, page: page.name });

  /* istanbul ignore next */
  if (options.compressTemplate) {
    source = source.replace(/^\s*$(?:\r\n?|\n)/gm, '').replace(/\r\n|\n/g, ' ');
  }

  cache.invalid(fileName, source, () => {
    compilation.assets[fileName] = new sources.RawSource(source);
  });
}

export async function createBaseTemplate(
  pages: Map<string, NormalEntry>,
  options: Options,
  meta: Meta,
  compilation: Compilation,
  cache: SourceCache
) {
  if (!meta.ejs.base) {
    return null;
  }

  const components = new Map(Store.getCollectedComponents());

  pages.forEach(page => {
    if (page instanceof PageEntry) {
      getUsingComponents(page.filename, compilation, options).forEach(component => {
        components.set(component.id, {
          id: component.id,
          props: component.props,
          type: 'native',
        });
      });
    }
  });

  const slotView = {
    props: [...new Set(Store.slotView.props || [])].sort(),
  };

  let source: string = await ejs.renderFile(
    meta.ejs.base,
    {
      components,
      skipComponents: Store.skipHostComponents,
      slotView,
      sortBy,
      depth: ensureDepth(options.UNSAFE_wechatTemplateDepth),
    },
    {
      rmWhitespace: options.compressTemplate,
    }
  );

  /* istanbul ignore next */
  if (options.compressTemplate) {
    source = source.replace(/^\s*$(?:\r\n?|\n)/gm, '').replace(/\r\n|\n/g, ' ');
  }

  const fileName = `base${meta.template.extension}`;

  cache.invalid(fileName, source, () => {
    compilation.assets[fileName] = new sources.RawSource(source);
  });
}
