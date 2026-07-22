import {
  AppInstanceContext,
  type Callback,
  ComponentInstanceContext,
  PageInstanceContext,
  RuntimeOptions,
  lifeCycleName,
  registerLifecycle,
  useAppEvent as useClassicAppEvent,
  useComponentInstance as useClassicComponentInstance,
  usePageEvent as useClassicPageEvent,
  usePageInstance as useClassicPageInstance,
} from '@rsmax/framework-shared';
import { useContext as useLightContext, useLayoutEffect as useLightLayoutEffect } from '../hooks-light';

export function usePageEvent(eventName: string, callback: Callback) {
  if (RuntimeOptions.get('renderer') !== 'light') {
    return useClassicPageEvent(eventName, callback);
  }
  const pageInstance = useLightContext(PageInstanceContext);
  const lifeCycle = lifeCycleName(eventName);
  useLightLayoutEffect(() => {
    return registerLifecycle(pageInstance, lifeCycle, callback);
  });
}

export function useAppEvent(eventName: string, callback: Callback) {
  if (RuntimeOptions.get('renderer') !== 'light') {
    return useClassicAppEvent(eventName, callback);
  }
  const lifeCycle = lifeCycleName(eventName);
  useLightLayoutEffect(() => {
    return registerLifecycle(AppInstanceContext, lifeCycle, callback);
  });
}

export function usePageInstance() {
  if (RuntimeOptions.get('renderer') !== 'light') {
    return useClassicPageInstance();
  }
  return useLightContext(PageInstanceContext);
}

export function useComponentInstance() {
  if (RuntimeOptions.get('renderer') !== 'light') {
    return useClassicComponentInstance();
  }
  return useLightContext(ComponentInstanceContext);
}

export { default as useNativeEffect } from './useNativeEffect';
export { default as useQuery } from './useQuery';
