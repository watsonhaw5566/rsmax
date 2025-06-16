import loadable from '@loadable/component';
import { PluginDriver, RuntimeOptions } from '@rsmax/framework-shared';
import type { History } from 'history';
import React from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { TabBar } from './TabBar';
import createAppConfig from './createAppConfig';
import createPageConfig from './createPageConfig';
import type { BootstrapOptions } from './types';

export default function createApp(options: BootstrapOptions, history: History) {
  const { async = true, appComponent, appConfig, pageComponents, pages, plugins = [] } = options;
  const AppConfig = createAppConfig(appComponent);

  const pluginDriver = new PluginDriver(plugins.map(plugin => plugin.default || plugin));
  RuntimeOptions.apply({ pluginDriver });

  const pageComponentsHoc = pages.map((page, i) => {
    return async
      ? loadable<any>(() =>
        (pageComponents[i]() as Promise<{ default: React.ComponentType }>).then(({ default: c }) =>
          createPageConfig(c, page.route)
        )
      )
      : createPageConfig(pageComponents[i]() as React.ComponentType, page.route);
  });
  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppConfig>
        <Routes>
          <Route path="/" element={<Navigate to={`/${pages[0]?.route}`} replace />} />
          {pages.map((page, i) => {
            return (
              <Route
                key={page.route}
                path={`/${page.route}`}
                element={React.createElement(pageComponentsHoc[i], {
                  pageConfig: {
                    ...appConfig.window,
                    ...page.config,
                  },
                  tabBar: appConfig.tabBar,
                })}
              />
            );
          })}
          <Route
            path="*"
            element={
              /*找不到路由时重定向到首页*/
              <Navigate to={`/${pages[0]?.route}`} replace />
            }
          />
        </Routes>
        {appConfig.tabBar?.items && appConfig.tabBar.items.length > 0 && (
          <TabBar history={history} config={appConfig.tabBar} />
        )}
        {process.env.NODE_ENV === 'development' && <LogLocation />}
      </AppConfig>
    </HashRouter>
  );
}

function LogLocation() {
  const location = useLocation();
  React.useEffect(() => {
    console.log('[rsmax][react-router]location change', location.pathname);
  }, [location]);

  return null;
}
