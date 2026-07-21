import type { PlatformAdapter } from './PlatformAdapter';
import { createAdapter } from './PlatformAdapter';

declare const tt: Record<string, any> | undefined;

const toutiaoAPI = {
  ...(typeof tt !== 'undefined' ? tt : {}),
};

const toutiaoComponentProps: Record<string, Record<string, any>> = {
  View: {
    hoverClass: '',
    hoverStopPropagation: false,
    hoverStartTime: 50,
    hoverStayTime: 400,
  },
  Text: {
    selectable: false,
    userSelect: false,
    space: '',
    decode: false,
  },
  Image: {
    mode: 'scaleToFill',
    lazyLoad: false,
    showMenuByLongpress: false,
    webp: false,
    loop: false,
  },
  Button: {
    size: 'default',
    type: 'default',
    plain: false,
    disabled: false,
    loading: false,
    formType: '',
    openType: '',
    appParameter: '',
    hoverClass: 'button-hover',
    hoverStopPropagation: false,
    hoverStartTime: 20,
    hoverStayTime: 70,
    lang: 'zh_CN',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataset: {},
  },
  Input: {
    value: '',
    type: 'text',
    password: false,
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: 'input-placeholder',
    disabled: false,
    maxlength: 140,
    autoFocus: false,
    focus: false,
    confirmType: 'done',
    confirmHold: false,
    cursor: -1,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    keyboardHeight: 0,
  },
  Textarea: {
    value: '',
    placeholder: '',
    placeholderStyle: '',
    placeholderClass: 'textarea-placeholder',
    disabled: false,
    maxlength: 140,
    autoFocus: false,
    focus: false,
    adjustPosition: true,
    cursor: -1,
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    autoHeight: false,
    fixed: false,
  },
  Form: {
    reportSubmit: false,
    reportSubmitTimeout: 0,
  },
  Label: {
    for: '',
  },
  Navigator: {
    url: '',
    openType: 'navigate',
    delta: 1,
    appId: '',
    path: '',
    extraData: {},
    version: 'release',
    hoverClass: 'navigator-hover',
    hoverStopPropagation: false,
    hoverStartTime: 20,
    hoverStayTime: 70,
  },
  WebView: {
    src: '',
    onMessage: () => {},
  },
};

export const toutiaoAdapter: PlatformAdapter = createAdapter('toutiao', toutiaoAPI, toutiaoComponentProps);
