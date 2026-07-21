import type { Platform } from './component';

export interface PlatformSpecificConfig {
  wechat?: Record<string, unknown>;
  ali?: Record<string, unknown>;
  toutiao?: Record<string, unknown>;
}

export interface AppConfigPlugins {
  [key: string]: {
    version: string;
    provider: string;
  };
}

export interface SubPackage {
  root: string;
  name?: string;
  pages: string[];
  plugins?: AppConfigPlugins;
  independent?: boolean;
}

export interface TabBarItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
  icon?: string;
  activeIcon?: string;
}

export interface TabBar {
  color: string;
  selectedColor: string;
  backgroundColor: string;
  borderStyle?: 'black' | 'white';
  list?: TabBarItem[];
  items?: TabBarItem[];
  position?: 'bottom' | 'top';
  custom?: boolean;
  textColor?: string;
}

export interface WindowConfig {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText?: string;
  navigationStyle?: 'default' | 'custom';
  backgroundColor?: string;
  backgroundTextStyle?: 'dark' | 'light';
  backgroundColorTop?: string;
  backgroundColorBottom?: string;
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  pageOrientation?: 'auto' | 'portrait' | 'landscape';
  disableScroll?: boolean;
  transparentTitle?: 'none' | 'always' | 'auto';
  titlePenetrate?: 'YES' | 'NO';
  showTitleLoading?: 'YES' | 'NO';
  titleImage?: string;
  titleBarColor?: string;
  backgroundImageColor?: string;
  backgroundImageUrl?: string;
  gestureBack?: 'YES' | 'NO';
  enableScrollBar?: 'YES' | 'NO';
  defaultTitle?: string;
  pullRefresh?: 'NO' | 'YES';
  allowsBounceVertical?: 'YES' | 'NO';
  disableSwipeBack?: boolean;
  entryPagePath?: string;
}

export interface AppConfig extends PlatformSpecificConfig {
  pages: string[];
  window?: WindowConfig;
  subpackages?: SubPackage[];
  subPackages?: SubPackage[];
  tabBar?: TabBar;
  plugins?: AppConfigPlugins;
  networkTimeout?: {
    request?: number;
    connectSocket?: number;
    uploadFile?: number;
    downloadFile?: number;
  };
  debug?: boolean;
  functionalPages?: boolean;
  workers?: string;
  requiredBackgroundModes?: string[];
  preloadRule?: Record<string, unknown>;
  resizable?: boolean;
  navigateToMiniProgramAppIdList?: string[];
  usingComponents?: Record<string, unknown>;
  permission?: Record<string, unknown>;
  sitemapLocation?: string;
  style?: string;
  useExtendedLib?: Record<string, unknown>;
  cloud?: boolean;
  entranceDeclare?: Record<string, unknown>;
  darkmode?: boolean;
  themeLocation?: string;
  lazyCodeLoading?: string;
  singlePage?: {
    navigationBarFit?: 'float' | 'squeezed';
  };
  optionMenu?: Record<string, unknown>;
  barButtonTheme?: 'default' | 'light';
}

export interface PageConfig extends WindowConfig, PlatformSpecificConfig {
  usingComponents?: Record<string, unknown>;
  disableSwipeBack?: boolean;
  optionMenu?: Record<string, unknown>;
  barButtonTheme?: 'default' | 'light';
}

export interface ThemeConfig extends PlatformSpecificConfig {
  light?: {
    [key: string]: string;
  };
  dark?: {
    [key: string]: string;
  };
}

export type SpecificPlatformConfig<P extends Platform, C> = Omit<C, keyof PlatformSpecificConfig> & {
  [K in P]?: Record<string, unknown>;
};

export type WechatAppConfig = SpecificPlatformConfig<'wechat', AppConfig>;
export type WechatPageConfig = SpecificPlatformConfig<'wechat', PageConfig>;
export type WechatThemeConfig = SpecificPlatformConfig<'wechat', ThemeConfig>;

export type AliAppConfig = SpecificPlatformConfig<'ali', AppConfig>;
export type AliPageConfig = SpecificPlatformConfig<'ali', PageConfig>;
export type AliThemeConfig = SpecificPlatformConfig<'ali', ThemeConfig>;

export type ToutiaoAppConfig = SpecificPlatformConfig<'toutiao', AppConfig>;
export type ToutiaoPageConfig = SpecificPlatformConfig<'toutiao', PageConfig>;
export type ToutiaoThemeConfig = SpecificPlatformConfig<'toutiao', ThemeConfig>;
