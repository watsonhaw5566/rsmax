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

interface ComponentConfig {
  name: string;
  alias?: Record<string, string>;
  defaultProps?: Record<string, any>;
  eventHandlers?: string[];
}

declare const wx: Record<string, any> | undefined;
declare const my: Record<string, any> | undefined;
declare const tt: Record<string, any> | undefined;

const wechatComponentProps: Record<string, Record<string, any>> = {
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
};

const aliComponentProps: Record<string, Record<string, any>> = {
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
};

const toutiaoComponentProps: Record<string, Record<string, any>> = {
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
};

function getPlatformComponentProps(): Record<string, Record<string, any>> {
  if (typeof wx !== 'undefined') return wechatComponentProps;
  if (typeof my !== 'undefined') return aliComponentProps;
  if (typeof tt !== 'undefined') return toutiaoComponentProps;
  return {};
}

const platformComponentProps = getPlatformComponentProps();

const componentConfigs: Record<string, ComponentConfig> = {
  View: {
    name: 'view',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Text: {
    name: 'text',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Image: {
    name: 'image',
    eventHandlers: ['onLoad', 'onError'],
  },
  Button: {
    name: 'button',
    eventHandlers: ['onTap', 'onLongTap', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
  },
  Input: {
    name: 'input',
    eventHandlers: ['onChange', 'onInput', 'onConfirm', 'onFocus', 'onBlur'],
  },
  Textarea: {
    name: 'textarea',
    eventHandlers: ['onChange', 'onInput', 'onConfirm', 'onFocus', 'onBlur'],
  },
  Form: {
    name: 'form',
    eventHandlers: ['onSubmit', 'onReset'],
  },
  Label: {
    name: 'label',
    eventHandlers: ['onTap'],
  },
  Navigator: {
    name: 'navigator',
    eventHandlers: ['onTap'],
  },
  WebView: {
    name: 'web-view',
    eventHandlers: ['onMessage'],
  },
};

function assignDefaultProps(inputProps: Record<string, any>, defaultProps: Record<string, any>): void {
  Object.keys(defaultProps).forEach(key => {
    inputProps[key] = inputProps[key] ?? defaultProps[key];
  });
}

function aliasProps(props: Record<string, any>, alias: Record<string, string>): Record<string, any> {
  const nextProps: Record<string, any> = {};
  for (const key in props) {
    nextProps[alias[key] ?? key] = props[key];
  }
  return nextProps;
}

export function createUnifiedComponent(componentName: string, customConfig?: Partial<ComponentConfig>): any {
  const config: ComponentConfig = {
    ...componentConfigs[componentName],
    ...customConfig,
  };

  const { name, alias, defaultProps: customDefaultProps, eventHandlers } = config;

  const Component: React.ForwardRefRenderFunction<any, any> = (props: any, ref: React.Ref<any>) => {
    const platformDefaultProps = platformComponentProps[componentName] || {};

    const inputProps = { ...props };

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

    return React.createElement(name, nextProps);
  };

  if (process.env.NODE_ENV === 'development') {
    Component.displayName = formatDisplayName(name);
  }

  return React.forwardRef(Component);
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
    default:
      return createCallback;
  }
}

export function createComponents(): Record<string, any> {
  const components: Record<string, any> = {};

  Object.keys(componentConfigs).forEach(name => {
    components[name] = createUnifiedComponent(name);
  });

  return components;
}
