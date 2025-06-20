import type { NodePath } from '@babel/traverse';
import Store from '@rsmax/build-store';
import { slash } from '@rsmax/shared';
import { createMacro } from 'babel-plugin-macros';
import type * as React from 'react';
import createHostComponentMacro from './createHostComponent';
import requirePluginMacro from './requirePlugin';
import requirePluginComponentMacro from './requirePluginComponent';
import useAppEventMacro from './useAppEvent';
import usePageEventMacro from './usePageEvent';

type PageEventName =
  | 'onLoad'
  | 'onShow'
  | 'onHide'
  | 'onReady'
  | 'onPullDownRefresh'
  | 'onReachBottom'
  | 'onPageScroll'
  | 'onShareAppMessage'
  | 'onShareTimeline'
  | 'onTitleClick'
  | 'onOptionMenuClick'
  | 'onPopMenuClick'
  | 'onPullIntercept'
  | 'onBack'
  | 'onKeyboardHeight'
  | 'onTabItemTap'
  | 'beforeTabItemTap'
  | 'onResize'
  | 'onUnload';

type AppEventName =
  | 'onLaunch'
  | 'onShow'
  | 'onHide'
  | 'onError'
  | 'onShareAppMessage'
  | 'onShareTimeline'
  | 'onPageNotFound'
  | 'onUnhandledRejection'
  | 'onThemeChange';

function rsmax({ references, state }: { references: { [name: string]: NodePath[] }; state: any }) {
  references.createHostComponent?.forEach(path => createHostComponentMacro(path, state));

  references.requirePluginComponent?.forEach(path => requirePluginComponentMacro(path, state));

  references.requirePlugin?.forEach(path => requirePluginMacro(path));

  const importer = slash(state.file.opts.filename);

  Store.appEvents.delete(importer);
  Store.pageEvents.delete(importer);

  references.useAppEvent?.forEach(path => useAppEventMacro(path, state));

  references.usePageEvent?.forEach(path => usePageEventMacro(path, state));
}

export declare function createHostComponent<P = any>(
  name: string,
  props: Array<string | [string, string]>
): React.ComponentType<P>;

export declare function requirePluginComponent<P = any>(pluginName: string): React.ComponentType<P>;

export declare function requirePlugin<P = any>(pluginName: string): P;

export declare function usePageEvent(eventName: PageEventName, callback: (...params: any[]) => any): void;

export declare function useAppEvent(eventName: AppEventName, callback: (...params: any[]) => any): void;

export default createMacro(rsmax);
