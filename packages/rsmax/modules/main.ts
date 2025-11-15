import type { AppConfig, Config, Platform } from '@rsmax/types';
import type { PageConfig } from '@rsmax/web';
export { createAppConfig, createPageConfig, usePageInstance, useQuery, useNativeEffect } from '@rsmax/web';
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
export function definePageConfig(config: PageConfig): PageConfig;
export function definePageConfig(
  config: Partial<Record<Platform, PageConfig>> & { default?: PageConfig }
): Partial<Record<Platform, PageConfig>> & { default?: PageConfig };
export function definePageConfig(config: any) {
  return config;
}
