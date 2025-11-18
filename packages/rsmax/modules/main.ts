import type { AppConfig, Config, PageConfig, PlatformAppConfigMap, PlatformPageConfigMap } from '@rsmax/types';
export function defineConfig(config: Config): Config {
  return config;
}
export function defineAppConfig(config: AppConfig): AppConfig;
export function defineAppConfig(
  config: Partial<PlatformAppConfigMap> & { default?: AppConfig }
): Partial<PlatformAppConfigMap> & { default?: AppConfig };
export function defineAppConfig(config: any) {
  return config;
}
export function definePageConfig(config: PageConfig): PageConfig;
export function definePageConfig(
  config: Partial<PlatformPageConfigMap> & { default?: PageConfig }
): Partial<PlatformPageConfigMap> & { default?: PageConfig };
export function definePageConfig(config: any) {
  return config;
}
