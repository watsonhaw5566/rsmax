import type * as t from '@babel/types';
import type React from 'react';
import type { RspackChain as RspackChainConfig } from 'rspack-chain';
import type yargs from 'yargs';

// ==================== 基础构建类型 ====================

export type LogLevel = 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'silent';

export type Platform = 'wechat' | 'ali' | 'toutiao';

export type Target = Platform | Platform[];

export type BuildType = 'miniapp' | 'miniplugin' | 'minicomponent' | 'webapp';

export type WebOptions = {
  mpa: boolean;
  excludeNodeModulesTransform: boolean;
};

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type PluginOptions = {};

export interface BuildOptions {
  pxToRpx: boolean;
  cwd: string;
  progress: boolean;
  input?: string[] | string | { [key: string]: string };
  output: string;
  rootDir: string;
  compressTemplate?: boolean;
  UNSAFE_wechatTemplateDepth: number | { [key: string]: number };
  configRspack?: (params: { config: RspackChainConfig; rspack: unknown }) => void;
  plugins: Plugin[];
  port?: number;
  watch?: boolean;
  target?: Target;
  analyze?: boolean;
  devtools?: boolean;
  type?: BuildType;
  component?: HostComponent;
  minimize?: boolean;
  loglevel?: LogLevel;
  renderer?: 'classic' | 'light';
  debug?: boolean;
}

export type Options = BuildOptions & PluginOptions;

export type Config = Partial<Options>;

export function defineConfig<T extends Config>(config: T): T;
export function defineConfig<T extends Config>(config: (options: { env: NodeJS.ProcessEnv }) => T): T;
export function defineConfig(config: Config | ((options: { env: NodeJS.ProcessEnv }) => Config)): Config {
  if (typeof config === 'function') {
    return config({ env: process.env });
  }
  return config;
}

// ==================== 入口信息 ====================

export interface EntryInfo {
  name: string;
  filename: string;
  component?: boolean;
}

export interface Entries {
  app: EntryInfo;
  pages: EntryInfo[];
}

// ==================== 通用应用配置类型 ====================

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

export interface AppConfig {
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

export interface PageConfig extends WindowConfig {
  usingComponents?: Record<string, unknown>;
  disableSwipeBack?: boolean;
  optionMenu?: Record<string, unknown>;
  barButtonTheme?: 'default' | 'light';
}

// ==================== 插件配置 ====================

export interface MiniPluginConfig {
  pages: string[];
  publicComponents: { [key: string]: string };
  publicPages: { [key: string]: string };
  main: string;
}

// ==================== 主题配置 ====================

/**
 * 微信小程序主题配置
 * 参考 https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/theme.html
 */
export interface ThemeConfig {
  /** 浅色主题 */
  light: {
    [key: string]: string;
  };
  /** 深色主题 */
  dark: {
    [key: string]: string;
  };
}

// ==================== 模板/插件元信息 ====================

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

// ==================== 事件类型 ====================

/**
 * 通用事件目标
 * 用于描述事件触发源的属性信息
 * @template Value 事件目标 value 的类型，默认为 unknown（可根据具体组件指定为 string/number 等）
 */
export interface EventTarget<Value = unknown> {
  /** 元素 ID */
  id: string;
  /** 左偏移量 */
  offsetLeft?: number;
  /** 顶部偏移量 */
  offsetTop?: number;
  /** data 对象 */
  dataset: {
    [key: string]: unknown;
  };
  /** 事件目标的值，类型取决于触发事件的组件 */
  value?: Value;
}

/**
 * 当前事件目标（用于事件冒泡阶段）
 */
export interface EventCurrentTarget {
  /** 元素 ID */
  id?: string;
  /** 左偏移量 */
  offsetLeft?: number;
  /** 顶部偏移量 */
  offsetTop?: number;
  /** data 对象 */
  dataset: {
    [key: string]: unknown;
  };
}

/**
 * 触摸点信息
 */
export interface Touch {
  /** 触点相对于可见视区左边沿的的 X 坐标。不包括任何滚动偏移 */
  clientX: number;
  /** 触点相对于可见视区上边沿的的 Y 坐标。不包括任何滚动偏移 */
  clientY: number;
  /** 触点相对于页面左边沿的的 X 坐标。当存在水平滚动的偏移时, 这个值包含了水平滚动的偏移 */
  pageX: number;
  /** 触点相对于页面上边沿的的 Y 坐标。当存在垂直滚动的偏移时, 这个值包含了垂直滚动的偏移 */
  pageY: number;
  /** 一次触摸动作在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程 */
  identifier: number;
}

/**
 * 基础事件对象
 * 所有小程序平台事件的通用属性
 * @template Value target.value 的类型，默认为 unknown
 */
export interface BaseEvent<Value = unknown> {
  /** 事件类型 */
  type: string;
  /** 页面打开到触发事件所经过的毫秒数 */
  timeStamp?: number;
  /** 触发事件的源组件 */
  target: EventTarget<Value>;
  /** 当前组件的一些属性值集合 */
  currentTarget: EventCurrentTarget;
  /** 事件标记数据 */
  mark?: Record<string, unknown>;
  /** 原始事件（内部使用） */
  originalEvent?: unknown;
  /** 原生事件（内部使用） */
  nativeEvent?: unknown;
  /** 阻止事件冒泡 */
  stopPropagation?: () => void;
}

/**
 * 自定义事件对象
 * @template Detail 事件详情类型
 * @template Value target.value 的类型，默认为 unknown
 */
export interface GenericEvent<Detail = unknown, Value = unknown> extends BaseEvent<Value> {
  /** 额外的信息 */
  detail: Detail;
}

/**
 * 触摸事件对象
 * @template T 触摸点类型
 */
export interface TouchEvent<T = Touch> extends BaseEvent {
  /** 触摸事件，当前停留在屏幕中的触摸点信息的数组 */
  touches: T[];
  /** 触摸事件，当前变化的触摸点信息的数组 */
  changedTouches: T[];
}

/** 触摸开始事件 */
export type TouchStartEvent = TouchEvent;
/** 触摸移动事件 */
export type TouchMoveEvent = TouchEvent;
/** 触摸结束事件 */
export type TouchEndEvent = TouchEvent;
/** 触摸取消事件 */
export type TouchCancelEvent = TouchEvent;

/** 点击事件 */
export interface TapEvent extends BaseEvent {
  stopPropagation: () => void;
}

/** 图片加载事件 */
export type ImageLoadEvent = BaseEvent;
/** 图片错误事件 */
export type ImageErrorEvent = BaseEvent;

/** 输入事件（value 必为 string） */
export interface InputEvent extends BaseEvent {
  target: EventTarget<string> & { value: string };
}
/** 表单事件（value 必为 string） */
export interface FormEvent extends BaseEvent {
  target: EventTarget<string> & { value: string };
}

// ==================== 组件属性类型 ====================

/**
 * 小程序内置组件公共属性
 * 所有小程序平台组件的通用属性
 */
export interface BaseProps {
  children?: React.ReactNode;
  /** 自定义属性: 组件上触发的事件时，会发送给事件处理函数 */
  readonly dataset?: DOMStringMap;
  /** 组件的唯一标示: 保持整个页面唯一 */
  id?: string;
  /** 组件的样式类: 在对应的样式文件中定义的样式类 */
  className?: string;
  /** 组件的内联样式: 可以动态设置的内联样式 */
  style?: React.CSSProperties;
  /** 组件是否显示: 所有组件默认显示 */
  hidden?: boolean;
  /** 动画对象: 由平台 createAnimation 创建（部分平台支持 boolean 控制是否启用动画） */
  animation?: Array<Record<string, unknown>> | boolean;
}

/**
 * 包含常用事件的组件公共属性
 */
export interface CommonProps extends BaseProps {
  /** 点击时触发 */
  onTap?: (event: TouchEvent) => void;
  /** 点击时触发 */
  onClick?: (event: TouchEvent) => void;
  /** 手指触摸动作开始 */
  onTouchStart?: (event: TouchEvent) => void;
  /** 手指触摸后移动 */
  onTouchMove?: (event: TouchEvent) => void;
  /** 手指触摸动作被打断，如来电提醒，弹窗 */
  onTouchCancel?: (event: TouchEvent) => void;
  /** 手指触摸动作结束 */
  onTouchEnd?: (event: TouchEvent) => void;
  /** 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发 */
  onLongPress?: (event: TouchEvent) => void;
  /** 手指触摸后，超过350ms再离开（推荐使用longpress事件代替） */
  onLongTap?: (event: TouchEvent) => void;
  /** 会在过渡或动画结束后触发 */
  onTransitionEnd?: (event: GenericEvent) => void;
  /** 会在动画开始时触发 */
  onAnimationStart?: (event: GenericEvent) => void;
  /** 会在动画一次迭代结束时触发 */
  onAnimationiteration?: (event: GenericEvent) => void;
  /** 会在动画完成时触发 */
  onAnimationEnd?: (event: GenericEvent) => void;
  /** 在支持 3D Touch 的设备，重按时会触发 */
  onTouchForceChange?: (event: TouchEvent) => void;
  /** 点击时触发同时阻止事件冒泡 */
  catchClick?: (event: unknown) => unknown;
}

// ==================== 组件注册相关 ====================

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

// ==================== 插件接口 ====================

export interface Plugin {
  /** 插件名称 */
  meta?: Meta;
  hostComponents?: Map<string, HostComponent>;
  /**
   * 自定义组件属性
   */
  processProps?: (options: ProcessPropsOptions) => string[];
  /**
   * 是否注册组件
   */
  shouldHostComponentRegister?: (options: ShouldHostComponentRegister) => boolean;

  onBuildStart?: (params: { config: Options }) => void;

  /**
   * 修改 rspack 配置
   */
  configRspack?: (params: { config: RspackChainConfig }) => void;

  /**
   * 修改 babel 配置
   */
  configBabel?: (params: { config: unknown }) => void;

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

  unstable_onEntries?: (params: { entries: unknown }) => unknown;
  /**
   * 扩展命令行
   */
  extendCLI?: (params: { cli: yargs.Argv }) => unknown;
}

export type PluginConstructor = <T = unknown>(options?: T) => Plugin;

// ==================== 运行时插件 ====================

/**
 * 运行时插件接口
 * 注意：这里使用 `any` 而不是 `unknown`，因为插件机制接收/返回任意组件类型，
 * 由调用方（PluginDriver）通过泛型进行类型约束。
 */
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
    context: unknown;
  }) => React.ComponentType<any>;
  onCreateHostComponent?: ({
    component,
  }: {
    component: React.ForwardRefExoticComponent<any> | React.ComponentType<any>;
  }) => React.ForwardRefExoticComponent<any> | React.ComponentType<any>;
  onCreateHostComponentElement?: ({ element }: { element: React.ReactElement<any> }) => React.ReactElement<any>;
}

// ==================== 页面/组件实例类型 ====================

/**
 * 小程序页面实例
 */
export interface PageInstance {
  /** 页面配置 */
  config?: PageConfig;
  /** 页面组件 */
  component: React.ComponentType<unknown>;
}

/**
 * 自定义组件实例
 */
export interface ComponentInstance {
  /** 组件配置 */
  config?: Record<string, unknown>;
  /** 组件 */
  component: React.ComponentType<unknown>;
}

// ==================== 工具类型 ====================

/**
 * 从对象类型中提取可选字段
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? K : never;
}[keyof T];

/**
 * 从对象类型中提取必填字段
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

/**
 * 简化 React 组件的 props 类型（用于从平台组件向 web 组件转换）
 */
export type Simplify<T> = { [P in keyof T]: T[P] } & unknown;
