import * as React from 'react';
import { formatDisplayName } from '@rsmax/framework-shared';
import {
  createTapEvent,
  createTouchEvent,
  createImageEvent,
  createInputEvent,
  createFormEvent,
  createCallback,
} from '../createHostComponent';
import memoizeOne from 'memoize-one';
import type { Platform } from '../types/component';

const createTapCallback = memoizeOne(createCallback);
const createTouchStartCallback = memoizeOne(createCallback);
const createTouchMoveCallback = memoizeOne(createCallback);
const createTouchEndCallback = memoizeOne(createCallback);
const createTouchCancelCallback = memoizeOne(createCallback);
const createChangeCallback = memoizeOne(createCallback);
const createInputCallback = memoizeOne(createCallback);
const createConfirmCallback = memoizeOne(createCallback);
const createFocusCallback = memoizeOne(createCallback);
const createBlurCallback = memoizeOne(createCallback);
const createSubmitCallback = memoizeOne(createCallback);
const createResetCallback = memoizeOne(createCallback);
const createImageLoadCallback = memoizeOne(createCallback);
const createImageErrorCallback = memoizeOne(createCallback);

export interface ComponentConfig {
  name: string;
  tagName: string;
  alias?: Record<string, string>;
  defaultProps?: Record<string, any>;
  eventHandlers?: string[];
}

type ComponentProps = Record<string, Record<string, any>>;

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

const buildTarget = process.env.RSMAX_PLATFORM as Platform | undefined;

let currentPlatform: Platform;
let currentPlatformComponentProps: ComponentProps;

function getWechatComponentProps(): ComponentProps {
  return {
    View: {},
    Text: {},
    Image: { mode: 'scaleToFill' },
    Button: { type: 'default', size: 'default' },
    Input: { type: 'text' },
    Textarea: {},
    Form: {},
    Label: {},
    Navigator: { openType: 'navigate' },
    WebView: {},
    ScrollView: {},
    Swiper: { indicatorDots: false, autoplay: false, circular: false, vertical: false },
    SwiperItem: {},
    Switch: { type: 'switch' },
    Radio: {},
    RadioGroup: {},
    Checkbox: {},
    CheckboxGroup: {},
    Picker: { mode: 'selector' },
    PickerView: {},
    PickerViewColumn: {},
    Slider: { min: 0, max: 100, step: 1 },
    Progress: { percent: 0, showInfo: false, strokeWidth: 6 },
    Video: { controls: true },
    Canvas: {},
    Camera: { mode: 'normal', devicePosition: 'back', flash: 'auto' },
    Map: { scale: 16, showLocation: false },
    RichText: {},
    CoverView: {},
    CoverImage: {},
    MovableArea: {},
    MovableView: { direction: 'all' },
    Icon: {},
    MatchMedia: {},
    PageContainer: {
      show: false,
      duration: 300,
      zIndex: 1000,
      overlay: true,
      position: 'bottom',
      closeOnSlideDown: false,
    },
    ShareElement: {},
    RootPortal: {},
    PageMeta: {},
    Ad: { adIntervals: 30 },
  };
}

function getAliComponentProps(): ComponentProps {
  return {
    View: {},
    Text: {},
    Image: { mode: 'aspectFill' },
    Button: { type: 'primary', size: 'default' },
    Input: { type: 'text' },
    Textarea: {},
    Form: {},
    Label: {},
    Navigator: { openType: 'navigate' },
    WebView: {},
    ScrollView: {},
    Swiper: { indicatorDots: false, autoplay: false, circular: false, vertical: false },
    SwiperItem: {},
    Switch: { type: 'switch' },
    Radio: {},
    RadioGroup: {},
    Checkbox: {},
    CheckboxGroup: {},
    Picker: { mode: 'selector' },
    PickerView: {},
    PickerViewColumn: {},
    Slider: { min: 0, max: 100, step: 1 },
    Progress: { percent: 0, showInfo: false, strokeWidth: 6 },
    Video: { controls: true },
    Canvas: {},
    Camera: { mode: 'normal', devicePosition: 'back', flash: 'auto' },
    Map: { scale: 16, showLocation: false },
    RichText: {},
    CoverView: {},
    CoverImage: {},
    MovableArea: {},
    MovableView: { direction: 'all' },
    Icon: {},
    MatchMedia: {},
    PageContainer: { show: false, duration: 300, zIndex: 1000, overlay: true, position: 'bottom' },
    ShareElement: {},
    RootPortal: {},
    PageMeta: {},
    Ad: {},
  };
}

function getToutiaoComponentProps(): ComponentProps {
  return {
    View: {},
    Text: {},
    Image: { mode: 'scaleToFill' },
    Button: { type: 'default', size: 'default' },
    Input: { type: 'text' },
    Textarea: {},
    Form: {},
    Label: {},
    Navigator: { openType: 'navigate' },
    WebView: {},
    ScrollView: {},
    Swiper: { indicatorDots: false, autoplay: false, circular: false, vertical: false },
    SwiperItem: {},
    Switch: { type: 'switch' },
    Radio: {},
    RadioGroup: {},
    Checkbox: {},
    CheckboxGroup: {},
    Picker: { mode: 'selector' },
    PickerView: {},
    PickerViewColumn: {},
    Slider: { min: 0, max: 100, step: 1 },
    Progress: { percent: 0, showInfo: false, strokeWidth: 6 },
    Video: { controls: true },
    Canvas: {},
    Camera: { mode: 'normal', devicePosition: 'back', flash: 'auto' },
    Map: { scale: 16, showLocation: false },
    RichText: {},
    CoverView: {},
    CoverImage: {},
    MovableArea: {},
    MovableView: { direction: 'all' },
    Icon: {},
    MatchMedia: {},
    PageContainer: { show: false, duration: 300, zIndex: 1000, overlay: true, position: 'bottom' },
    ShareElement: {},
    RootPortal: {},
    PageMeta: {},
    Ad: { adIntervals: 30 },
  };
}

if (buildTarget === 'wechat') {
  currentPlatform = 'wechat';
  currentPlatformComponentProps = getWechatComponentProps();
} else if (buildTarget === 'ali') {
  currentPlatform = 'ali';
  currentPlatformComponentProps = getAliComponentProps();
} else if (buildTarget === 'toutiao') {
  currentPlatform = 'toutiao';
  currentPlatformComponentProps = getToutiaoComponentProps();
} else {
  if (typeof wx !== 'undefined') {
    currentPlatform = 'wechat';
    currentPlatformComponentProps = getWechatComponentProps();
  } else if (typeof my !== 'undefined') {
    currentPlatform = 'ali';
    currentPlatformComponentProps = getAliComponentProps();
  } else if (typeof tt !== 'undefined') {
    currentPlatform = 'toutiao';
    currentPlatformComponentProps = getToutiaoComponentProps();
  } else {
    currentPlatform = 'wechat';
    currentPlatformComponentProps = getWechatComponentProps();
  }
}

export { currentPlatform };

export const platformComponentProps: Record<Platform, ComponentProps> = {
  get wechat() {
    return getWechatComponentProps();
  },
  get ali() {
    return getAliComponentProps();
  },
  get toutiao() {
    return getToutiaoComponentProps();
  },
} as Record<Platform, ComponentProps>;

export const componentConfigs: Record<string, ComponentConfig> = {
  View: {
    name: 'View',
    tagName: 'view',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Text: {
    name: 'Text',
    tagName: 'text',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Image: {
    name: 'Image',
    tagName: 'image',
    eventHandlers: ['onLoad', 'onError'],
  },
  Button: {
    name: 'Button',
    tagName: 'button',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Input: {
    name: 'Input',
    tagName: 'input',
    eventHandlers: ['onChange', 'onInput', 'onConfirm', 'onFocus', 'onBlur'],
  },
  Textarea: {
    name: 'Textarea',
    tagName: 'textarea',
    eventHandlers: ['onChange', 'onInput', 'onConfirm', 'onFocus', 'onBlur'],
  },
  Form: {
    name: 'Form',
    tagName: 'form',
    eventHandlers: ['onSubmit', 'onReset'],
  },
  Label: {
    name: 'Label',
    tagName: 'label',
    eventHandlers: ['onTap'],
  },
  Navigator: {
    name: 'Navigator',
    tagName: 'navigator',
    eventHandlers: ['onTap'],
  },
  WebView: {
    name: 'WebView',
    tagName: 'web-view',
    eventHandlers: ['onMessage'],
  },
  ScrollView: {
    name: 'ScrollView',
    tagName: 'scroll-view',
    eventHandlers: ['onScroll', 'onScrollToUpper', 'onScrollToLower'],
  },
  Swiper: {
    name: 'Swiper',
    tagName: 'swiper',
    eventHandlers: ['onChange'],
  },
  SwiperItem: {
    name: 'SwiperItem',
    tagName: 'swiper-item',
    eventHandlers: [],
  },
  Switch: {
    name: 'Switch',
    tagName: 'switch',
    eventHandlers: ['onChange'],
  },
  Radio: {
    name: 'Radio',
    tagName: 'radio',
    eventHandlers: ['onChange'],
  },
  RadioGroup: {
    name: 'RadioGroup',
    tagName: 'radio-group',
    eventHandlers: ['onChange'],
  },
  Checkbox: {
    name: 'Checkbox',
    tagName: 'checkbox',
    eventHandlers: ['onChange'],
  },
  CheckboxGroup: {
    name: 'CheckboxGroup',
    tagName: 'checkbox-group',
    eventHandlers: ['onChange'],
  },
  Picker: {
    name: 'Picker',
    tagName: 'picker',
    eventHandlers: ['onChange', 'onColumnChange'],
  },
  PickerView: {
    name: 'PickerView',
    tagName: 'picker-view',
    eventHandlers: ['onChange'],
  },
  PickerViewColumn: {
    name: 'PickerViewColumn',
    tagName: 'picker-view-column',
    eventHandlers: [],
  },
  Slider: {
    name: 'Slider',
    tagName: 'slider',
    eventHandlers: ['onChange', 'onChanging'],
  },
  Progress: {
    name: 'Progress',
    tagName: 'progress',
    eventHandlers: [],
  },
  Video: {
    name: 'Video',
    tagName: 'video',
    eventHandlers: ['onPlay', 'onPause', 'onEnded', 'onTimeUpdate', 'onFullscreenChange', 'onWaiting', 'onError'],
  },
  Canvas: {
    name: 'Canvas',
    tagName: 'canvas',
    eventHandlers: ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Camera: {
    name: 'Camera',
    tagName: 'camera',
    eventHandlers: ['onStop', 'onError'],
  },
  Map: {
    name: 'Map',
    tagName: 'map',
    eventHandlers: ['onTap', 'onMarkerTap', 'onControlTap', 'onCalloutTap', 'onRegionChange'],
  },
  RichText: {
    name: 'RichText',
    tagName: 'rich-text',
    eventHandlers: [],
  },
  CoverView: {
    name: 'CoverView',
    tagName: 'cover-view',
    eventHandlers: ['onTap'],
  },
  CoverImage: {
    name: 'CoverImage',
    tagName: 'cover-image',
    eventHandlers: ['onLoad', 'onError'],
  },
  MovableArea: {
    name: 'MovableArea',
    tagName: 'movable-area',
    eventHandlers: [],
  },
  MovableView: {
    name: 'MovableView',
    tagName: 'movable-view',
    eventHandlers: ['onChange', 'onScale'],
  },
  Icon: {
    name: 'Icon',
    tagName: 'icon',
    eventHandlers: [],
  },
  MatchMedia: {
    name: 'MatchMedia',
    tagName: 'match-media',
    eventHandlers: ['onChange'],
  },
  PageContainer: {
    name: 'PageContainer',
    tagName: 'page-container',
    eventHandlers: ['onShow', 'onHide'],
  },
  ShareElement: {
    name: 'ShareElement',
    tagName: 'share-element',
    eventHandlers: ['onTransitionEnd'],
  },
  RootPortal: {
    name: 'RootPortal',
    tagName: 'root-portal',
    eventHandlers: [],
  },
  PageMeta: {
    name: 'PageMeta',
    tagName: 'page-meta',
    eventHandlers: [],
  },
  Ad: {
    name: 'Ad',
    tagName: 'ad',
    eventHandlers: ['onLoad', 'onError', 'onClose'],
  },
};

function assignDefaultProps(inputProps: Record<string, any>, defaultProps: Record<string, any>): void {
  Object.keys(defaultProps).forEach(key => {
    if (inputProps[key] === undefined) {
      inputProps[key] = defaultProps[key];
    }
  });
}

function aliasProps(props: Record<string, any>, alias: Record<string, string>): Record<string, any> {
  const nextProps: Record<string, any> = {};
  for (const key in props) {
    nextProps[alias[key] ?? key] = props[key];
  }
  return nextProps;
}

function getEventCreator(handler: string): ((event: any) => any) | undefined {
  switch (handler) {
    case 'onTap':
    case 'onLongTap':
      return createTapEvent;
    case 'onTouchStart':
    case 'onTouchMove':
    case 'onTouchEnd':
    case 'onTouchCancel':
      return createTouchEvent;
    case 'onLoad':
    case 'onError':
      return createImageEvent;
    case 'onChange':
    case 'onInput':
    case 'onConfirm':
    case 'onFocus':
    case 'onBlur':
    case 'onChanging':
      return createInputEvent;
    case 'onSubmit':
    case 'onReset':
      return createFormEvent;
    default:
      return undefined;
  }
}

function getMemoizedCallback(handler: string): typeof createCallback {
  switch (handler) {
    case 'onTap':
      return createTapCallback;
    case 'onTouchStart':
      return createTouchStartCallback;
    case 'onTouchMove':
      return createTouchMoveCallback;
    case 'onTouchEnd':
      return createTouchEndCallback;
    case 'onTouchCancel':
      return createTouchCancelCallback;
    case 'onChange':
      return createChangeCallback;
    case 'onInput':
      return createInputCallback;
    case 'onConfirm':
      return createConfirmCallback;
    case 'onFocus':
      return createFocusCallback;
    case 'onBlur':
      return createBlurCallback;
    case 'onSubmit':
      return createSubmitCallback;
    case 'onReset':
      return createResetCallback;
    case 'onLoad':
      return createImageLoadCallback;
    case 'onError':
      return createImageErrorCallback;
    case 'onChanging':
      return createChangeCallback;
    default:
      return createCallback;
  }
}

export function createUnifiedComponent<P = {}>(
  componentName: string,
  customConfig?: Partial<ComponentConfig>
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<any>> {
  const config: ComponentConfig = {
    ...componentConfigs[componentName],
    ...customConfig,
  };

  const { tagName, alias, defaultProps: customDefaultProps, eventHandlers } = config;

  const Component = (props: React.PropsWithoutRef<P>, ref: React.Ref<any>) => {
    const platformDefaultProps = currentPlatformComponentProps[componentName] || {};

    const inputProps = { ...props } as Record<string, any>;

    assignDefaultProps(inputProps, platformDefaultProps);

    if (customDefaultProps) {
      assignDefaultProps(inputProps, customDefaultProps);
    }

    if (eventHandlers) {
      eventHandlers.forEach(handler => {
        if (inputProps[handler]) {
          const eventCreator = getEventCreator(handler);
          if (eventCreator) {
            const memoizedCallback = getMemoizedCallback(handler);
            inputProps[handler] = memoizedCallback(inputProps[handler], eventCreator);
          }
        }
      });
    }

    let nextProps = inputProps;
    if (alias) {
      nextProps = aliasProps(inputProps, alias);
    }
    nextProps.ref = ref;

    return React.createElement(tagName, nextProps);
  };

  if (process.env.NODE_ENV === 'development') {
    (Component as any).displayName = formatDisplayName(config.name);
  }

  return React.forwardRef(Component) as React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<any>
  >;
}
