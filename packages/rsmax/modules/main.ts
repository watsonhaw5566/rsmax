import type { AppConfig, Config, Platform } from '@rsmax/types';
export function defineConfig(config: Config): Config {
  return config;
}
export function defineAppConfig(config: AppConfig): AppConfig;
export function defineAppConfig(
  config: Partial<Record<Platform, AppConfig>> & { default?: AppConfig }
): Partial<Record<Platform, AppConfig>> & { default?: AppConfig };
export function defineAppConfig(config: any) {
  return config;
}
