import type * as t from '@babel/types';
import type React from 'react';
import type WebpackConfig from 'rspack-chain';
import type yargs from 'yargs';

export type LogLevel = 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'silent';

export type Platform = 'web' | 'wechat' | 'ali' | 'toutiao';

export type BuildType = 'miniapp' | 'miniplugin' | 'minicomponent' | 'webapp';

export type WebOptions = {
  mpa: boolean;
  excludeNodeModulesTransform: boolean;
};

export interface PluginOptions {
  errorScreen: boolean;
  spm: boolean;
}

export interface BuildOptions {
  pxToRpx: boolean;
  cwd: string;
  progress: boolean;
  input?: string[] | string | { [key: string]: string };
  output: string;
  rootDir: string;

  UNSAFE_wechatTemplateDepth: number | { [key: string]: number };
  configWebpack?: (params: { config: WebpackConfig; rspack: any }) => void;
  plugins: Plugin[];
  port?: number;
  notify?: boolean;
  watch?: boolean;
  target?: Platform;

  devtools?: boolean;
  type?: BuildType;
  component?: any;
  web?: WebOptions;

  loglevel?: LogLevel;
}

export type Options = BuildOptions & PluginOptions;

export type Config = Partial<Options>;

export interface EntryInfo {
  name: string;
  filename: string;
  component?: boolean;
}

export interface Entries {
  app: EntryInfo;
  pages: EntryInfo[];
}

export interface AppConfigPlugins {
  [key: string]: {
    version: string;
    provider: string;
  };
}

export interface AppConfig {
  pages: string[];
  subpackages?: Array<{
    root: string;
    pages: string[];
    plugins?: AppConfigPlugins;
  }>;
  subPackages?: Array<{
    root: string;
    pages: string[];
    plugins?: AppConfigPlugins;
  }>;
  tabBar?: {
    items?: Array<{ icon: string; activeIcon: string }>;
    list?: Array<{ iconPath: string; selectedIconPath: string }>;
  };
  plugins?: AppConfigPlugins;
}

// Wechat AppConfig
interface WechatTabItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
}

export interface WechatAppConfig {
  entryPagePath?: string;
  pages: string[];
  window?: {
    navigationBarBackgroundColor?: string;
    navigationBarTextStyle?: 'white' | 'black';
    navigationBarTitleText?: string;
    navigationStyle?: 'default' | 'custom';
    backgroundColor?: string;
    backgroundTextStyle?: 'dark' | 'light';
    backgroundColorTop?: string;
    backgroundColorBottom?: string;
    enablePullDownRefresh?: boolean;
    onReachBottomDistance?: number;
    pageOrientation?: 'auto' | 'portrait' | 'landscape';
  };
  tabBar?: {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    borderStyle?: 'black' | 'white';
    list: WechatTabItem[];
    position?: 'bottom' | 'top';
    custom?: boolean;
  };
  networkTimeout?: {
    request?: number;
    connectSocket?: number;
    uploadFile?: number;
    downloadFile?: number;
  };
  debug?: boolean;
  functionalPages?: boolean;
  subpackages?: Array<{ root: string; name?: string; pages: string[]; independent?: boolean }>;
  workers?: string;
  requiredBackgroundModes?: string[];
  plugins?: Record<string, any>;
  preloadRule?: Record<string, any>;
  resizable?: boolean;
  navigateToMiniProgramAppIdList?: string[];
  usingComponents?: Record<string, any>;
  permission?: Record<string, any>;
  sitemapLocation?: string;
  style?: string;
  useExtendedLib?: Record<string, any>;
  cloud?: boolean;
  entranceDeclare?: Record<string, any>;
  darkmode?: boolean;
  themeLocation?: string;
  lazyCodeLoading?: string;
  singlePage?: { navigationBarFit?: 'float' | 'squeezed' };
}

// Ali AppConfig
interface AliTabItem {
  pagePath: string;
  name: string;
  icon: string;
  activeIcon?: string;
}

interface AliWindowConfig {
  defaultTitle?: string;
  pullRefresh?: 'NO' | 'YES';
  allowsBounceVertical?: 'YES' | 'NO';
  transparentTitle?: 'none' | 'always' | 'auto';
  titlePenetrate?: 'YES' | 'NO';
  showTitleLoading?: 'YES' | 'NO';
  titleImage?: string;
  titleBarColor?: string;
  backgroundColor?: string;
  backgroundImageColor?: string;
  backgroundImageUrl?: string;
  gestureBack?: 'YES' | 'NO';
  enableScrollBar?: 'YES' | 'NO';
  onReachBottomDistance?: number;
}

export interface AliAppConfig {
  pages: string[];
  window?: AliWindowConfig;
  tabBar?: {
    textColor?: string;
    selectedColor?: string;
    backgroundColor?: string;
    items: AliTabItem[];
  };
  subPackages?: Array<{ root: string; pages: string[] }>;
  plugins?: { [name: string]: { version: string; provider: string } };
}

// Toutiao AppConfig
interface ToutiaoTabItem {
  pagePath: string;
  text: string;
  iconPath?: string;
  selectedIconPath?: string;
}

export interface ToutiaoAppConfig {
  pages: string[];
  window?: {
    navigationBarBackgroundColor?: string;
    navigationBarTextStyle?: 'white' | 'black';
    navigationBarTitleText?: string;
    navigationStyle?: 'default' | 'custom';
    backgroundColor?: string;
    backgroundTextStyle?: 'dark' | 'light';
    backgroundColorTop?: string;
    backgroundColorBottom?: string;
    enablePullDownRefresh?: boolean;
    onReachBottomDistance?: number;
    transparentTitle?: 'none' | 'always' | 'auto';
  };
  tabBar?: {
    color: string;
    selectedColor: string;
    backgroundColor: string;
    borderStyle?: 'black' | 'white';
    list: ToutiaoTabItem[];
    position?: 'bottom' | 'top';
    custom?: boolean;
  };
  navigateToMiniProgramAppIdList?: string[];
  permission?: Record<string, any>;
}

// Web AppConfig
export enum WebRouterType {
  hash = 'hash',
  browser = 'browser',
}

export interface WebAppConfig {
  pages: string[];
  window?: {
    defaultTitle?: string;
    pullRefresh?: boolean;
    onReachBottomDistance?: number;
  };
  tabBar?: {
    textColor?: string;
    selectedColor?: string;
    backgroundColor?: string;
    items: Array<{ url: string; title: string; image: string; activeImage?: string }>;
  };
  router?: { type: WebRouterType };
}

export type PlatformAppConfigMap = {
  wechat: WechatAppConfig;
  ali: AliAppConfig;
  toutiao: ToutiaoAppConfig;
  web: WebAppConfig;
};

export interface PageConfig {
  usingComponents?: { [key: string]: string };
  navigationBarTitleText?: string;
  enablePullDownRefresh?: boolean;
  [key: string]: any;
}

export interface WechatPageConfig {
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
  usingComponents?: Record<string, any>;
}

interface AliWindowConfig {
  defaultTitle?: string;
  pullRefresh?: 'NO' | 'YES';
  allowsBounceVertical?: 'YES' | 'NO';
  transparentTitle?: 'none' | 'always' | 'auto';
  titlePenetrate?: 'YES' | 'NO';
  showTitleLoading?: 'YES' | 'NO';
  titleImage?: string;
  titleBarColor?: string;
  backgroundColor?: string;
  backgroundImageColor?: string;
  backgroundImageUrl?: string;
  gestureBack?: 'YES' | 'NO';
  enableScrollBar?: 'YES' | 'NO';
  onReachBottomDistance?: number;
}

export interface AliPageConfig extends AliWindowConfig {
  optionMenu?: Record<string, any>;
  barButtonTheme?: 'default' | 'light';
}

export interface ToutiaoPageConfig {
  navigationBarBackgroundColor?: string;
  navigationBarTextStyle?: 'black' | 'white';
  navigationBarTitleText?: string;
  navigationStyle?: 'default' | 'custom';
  backgroundColor?: string;
  backgroundTextStyle?: 'dark' | 'light';
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  disableScroll?: boolean;
  disableSwipeBack?: boolean;
  usingComponents?: Record<string, any>;
}

export interface WebPageConfig {
  defaultTitle?: string;
  enablePullDownRefresh?: boolean;
  onReachBottomDistance?: number;
  usingComponents?: Record<string, any>;
}

export type PlatformPageConfigMap = {
  wechat: WechatPageConfig;
  ali: AliPageConfig;
  toutiao: ToutiaoPageConfig;
  web: WebPageConfig;
};

export interface MiniPluginConfig {
  pages: string[];
  publicComponents: { [key: string]: string };
  publicPages: { [key: string]: string };
  main: string;
}

export type Meta = {
  global: string;
  template: {
    extension: string;
    tag: string;
    src: string;
  };
  style: string;
  jsHelper?: {
    extension: string;
    tag: string;
    src: string;
  };
  ejs: {
    base?: string;
    page: string;
    jsHelper?: string;
  };
  staticEjs?: {
    base?: string;
    page: string;
    jsHelper?: string;
    isolatedTemplates?: string;
  };
};

export type MetaOptions = {
  remaxOptions: Options;
};

export type ProcessPropsOptions = {
  componentName: string;
  props: string[];
  node?: t.JSXElement;
  additional?: boolean;
};

export type ShouldHostComponentRegister = {
  componentName: string;
  additional?: boolean;
  phase: 'import' | 'jsx' | 'extra';
};

export interface HostComponent {
  props: string[];
  additional?: boolean;
  alias?: { [key: string]: string };
}

export interface ComponentManifest {
  id: string;
  props: string[];
  additional?: boolean;
  type?: string;
}

export interface Plugin {
  /** 插件名称 */
  meta?: Meta;
  hostComponents?: Map<string, HostComponent>;
  /**
   * 自定义组件属性
   * options.componentName 组件名称
   * options.props 组件属性
   * options.node 组件 babel JSXElement
   * options.additional 是否用户额外创建的 host 组件
   */
  processProps?: (options: ProcessPropsOptions) => string[];
  /**
   * 是否注册组件
   * options.componentName 组件名称
   * options.additional 是否是额外定义的组件
   * options.phase 组件被引入的阶段，import | jsx | extra
   */
  shouldHostComponentRegister?: (options: ShouldHostComponentRegister) => boolean;

  onBuildStart?: (params: { config: Options }) => void;

  /**
   * 修改 webpack 配置
   */
  configWebpack?: (params: { config: WebpackConfig }) => void;

  /**
   * 修改 babel 配置
   */
  configBabel?: (params: { config: any }) => void;

  /**
   * 注册运行时插件
   */
  registerRuntimePlugin?: () => string;

  /**
   * 修改应用配置
   */
  onAppConfig?: (params: { config: any }) => any;

  /**
   * 修改页面配置
   */
  onPageConfig?: (params: { config: any; page: string }) => any;

  /**
   * 修改页面输出的 template
   */
  onPageTemplate?: (params: { template: string; page: string }) => string;

  unstable_onEntries?: (params: { entries: any }) => any;
  /**
   * 扩展命令行
   */
  extendCLI?: (params: { cli: yargs.Argv }) => any;
}

export type PluginConstructor = (options?: any) => Plugin;

export interface RuntimePlugin {
  onAppConfig?: ({ config }: { config: any }) => any;
  onPageConfig?: ({ config, page }: { config: any; page: string }) => any;
  onAppComponent?: ({ component }: { component: React.ComponentType<any> }) => React.ComponentType<any>;
  onPageComponent?: ({
    component,
    page,
  }: {
    component: React.ComponentType<any>;
    page: string;
  }) => React.ComponentType<any>;
  onMiniComponent?: ({
    component,
    context,
  }: {
    component: React.ComponentType<any>;
    context: any;
  }) => React.ComponentType<any>;
  onCreateHostComponent?: ({
    component,
  }: {
    component: React.ForwardRefExoticComponent<any> | React.ComponentType<any>;
  }) => React.ForwardRefExoticComponent<any> | React.ComponentType<any>;
  onCreateHostComponentElement?: ({ element }: { element: React.ReactElement<any> }) => React.ReactElement<any>;
}
