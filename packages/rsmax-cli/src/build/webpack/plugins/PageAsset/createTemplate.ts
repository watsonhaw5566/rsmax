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
  // 启用筛选时，仅包含“已使用的宿主组件”；关闭筛选时包含全部宿主组件
  const components = filter ? new Map(Store.collectedComponents) : new Map(Store.getCollectedComponents());

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

// 将默认层级与统计层级合并：finalDepth[id] = min(默认值, 实际使用值)
function computeFinalDepth(options: Options) {
  const base = ensureDepth(options.UNSAFE_wechatTemplateDepth) as Record<string, number>;
  const finalDepth: Record<string, number> = { ...base };
  Store.componentDepth.forEach((used, id) => {
    // 有默认值时按需收敛；没有默认值时直接使用统计值
    finalDepth[id] = Math.min(base[id] ?? used, used);
  });
  return finalDepth;
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
    depth: computeFinalDepth(options),
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

  // 仅聚合“已使用的宿主组件 + 各页面实际使用的原生/插件组件”
  const components = new Map(Store.collectedComponents);

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
      depth: computeFinalDepth(options),
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
