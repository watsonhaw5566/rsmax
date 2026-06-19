import { logger as rslogLogger, type LogLevel as RslogLogLevel } from 'rslog';
import type { LogLevel } from '@rsmax/types';

const LEVEL_MAP: Record<LogLevel, RslogLogLevel> = {
  debug: 'verbose',
  verbose: 'verbose',
  info: 'info',
  warn: 'warn',
  error: 'error',
  silent: 'error',
};

let initialized = false;

export function setupLogger(level: LogLevel = 'verbose') {
  if (initialized) return;

  if (level === 'silent') {
    rslogLogger.override({
      error: () => {},
      warn: () => {},
      info: () => {},
      start: () => {},
      ready: () => {},
      success: () => {},
      log: () => {},
      debug: () => {},
    });
  } else {
    rslogLogger.level = LEVEL_MAP[level];
  }

  initialized = true;
}

export const logger = rslogLogger;
