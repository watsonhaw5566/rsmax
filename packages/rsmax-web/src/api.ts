import { RuntimeOptions } from '@rsmax/framework-shared';

interface NavigateToParams {
  url: string;
}

interface NavigateBackParams {
  /** 返回的页面数 */
  delta?: number;
}

type RedirectToParams = NavigateToParams;
type ReLaunchParams = NavigateToParams;
type SwitchTabParams = NavigateToParams;

export function navigateTo(params: NavigateToParams) {
  const navigate = RuntimeOptions.get('navigate');
  navigate(params.url, {
    replace: true,
  });
  return Promise.resolve();
}

export function navigateBack(params?: NavigateBackParams) {
  const navigate = RuntimeOptions.get('navigate');
  navigate(-(params?.delta || 1));
  return Promise.resolve();
}

export function redirectTo(params: RedirectToParams) {
  const navigate = RuntimeOptions.get('navigate');
  navigate(params.url, {
    replace: true,
  });

  return Promise.resolve();
}

export function reLaunch(params: ReLaunchParams) {
  window.location.href = params.url;
}

export function switchTab(params: SwitchTabParams) {
  navigateTo(params).then();
}
