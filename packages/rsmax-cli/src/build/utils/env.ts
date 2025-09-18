import fs from 'node:fs';
import path from 'node:path';
import type { Options } from '@rsmax/types';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

type Env = Record<string, string | undefined>;

export default function getEnvironment(options: Options, target: string) {
  const envFilePath = path.join(options.cwd, '.env');

  const NODE_ENV = process.env.NODE_ENV;

  // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
  const dotenvFiles = [
    `${envFilePath}.${NODE_ENV}.local`,
    `${envFilePath}.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && `${envFilePath}.local`,
    envFilePath,
  ].filter(Boolean) as string[];

  // Load environment variables from .env* files. Suppress warnings using silent
  // if this file is missing. dotenv will never modify any environment variables
  // that have already been set.  Variable expansion is supported in .env files.
  // https://github.com/motdotla/dotenv
  // https://github.com/motdotla/dotenv-expand
  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      dotenvExpand.expand(dotenv.config({ path: dotenvFile }));
    }
  });

  // 注入所有 RSMAX_APP_ 开头的环境变量
  const RSMAX_APP = /^RSMAX_APP_/i;

  const builtiEnv: Env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    RSMAX_PLATFORM: target,
  };

  const raw = Object.keys(process.env)
    .filter(key => RSMAX_APP.test(key))
    .reduce((env: Env, key) => {
      env[key] = process.env[key] as string;
      return env;
    }, builtiEnv);

  const stringified = {
    ...Object.keys(raw).reduce((env: Env, key) => {
      env[`process.env.${key}`] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
}
