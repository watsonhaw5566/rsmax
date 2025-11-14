import * as fs from 'node:fs';
import path from 'node:path';
import type { Platform } from '@rsmax/types';

function readTypescriptManifest(filePath: string, target: Platform) {
  const j = require('jiti')(process.cwd(), { cache: false });
  const mod = j(filePath);
  return mod[target] || mod.default || mod;
}

function readJavascriptManifest(path: string, target: Platform) {
  delete require.cache[require.resolve(path)];
  return require(path)[target] || require(path).default || require(path);
}

export default function readManifest(filename: string, target: Platform, strict = false) {
  if (!fs.existsSync(filename)) {
    if (strict) {
      throw new Error(`${path}.ts|js 文件不存在，请先创建配置文件，参考 https://remaxjs.org/guide/config/remax`);
    }
    return {};
  }
  if (path.extname(filename) === '.ts') {
    return readTypescriptManifest(filename, target);
  }
  return readJavascriptManifest(filename, target);
}
