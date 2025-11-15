import type { EntryInfo, Meta, Options } from '@rsmax/types';
import { type Compilation } from '@rspack/core';
import type API from '../../../../API';

export default async function createTurboTemplate(
  api: API,
  options: Options,
  page: EntryInfo,
  modules: string[],
  meta: Meta,
  compilation: Compilation
) {
  return Promise.resolve();
}
