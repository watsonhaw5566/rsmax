import Store, { type ExtractedTemplate } from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import type { EntryInfo, Meta, Options } from '@rsmax/types';
import { type Compilation, sources } from '@rspack/core';
import * as TurboRender from 'babel-plugin-rsmax-turbo-render';
import ejs from 'ejs';
import { sortBy } from 'lodash';
import type API from '../../../../API';
import { createRenderOptions } from './createTemplate';

export default async function createTurboTemplate(
  api: API,
  options: Options,
  page: EntryInfo,
  modules: string[],
  meta: Meta,
  compilation: Compilation
) {
  const renderOptions: any = createRenderOptions(page.filename, compilation, options, true);
  const fileName = slash(`${page.name}${meta.template.extension}`);
  const extractedTemplates = Array.from(Store.extractedTemplates.values());
  const templates: ExtractedTemplate[] = [];
  extractedTemplates.forEach(t => {
    if (modules.includes(t.module)) {
      templates.push(t);
      t.isolated = false;
    }
  });
  const entries = extractedTemplates.filter(
    (template: any) => template.isEntry && slash(template.module) === page.filename
  );

  renderOptions.templates = sortBy(templates, 'id');
  renderOptions.entries = entries;
  renderOptions.TEMPLATE_ID = TurboRender.TEMPLATE_ID;
  renderOptions.sortBy = sortBy;
  renderOptions.skipComponents = Store.skipHostComponents;
  renderOptions.renderIsolatedTemplates = true;

  // 可以进入到 static compiler 中的都是配置好 staticEjs 的平台
  let source: string = await ejs.renderFile(meta.staticEjs!.page, renderOptions, {
    rmWhitespace: options.compressTemplate,
  });

  if (page.component !== true) {
    source = api.onPageTemplate({ template: source, page: page.name });
  }

  // TODO 用 uglify 替代 compressTemplate
  /* istanbul ignore next */
  if (options.compressTemplate) {
    source = source.replace(/^\s*$(?:\r\n?|\n)/gm, '').replace(/\r\n|\n/g, ' ');
  }

  compilation.assets[fileName] = new sources.RawSource(source);
}
