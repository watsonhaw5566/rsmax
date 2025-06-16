import loadable from '@loadable/component';
import { PluginDriver, RuntimeOptions } from '@rsmax/framework-shared';
import type { History } from 'history';
import React from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { KeepAlive, KeepAliveProvider } from './KeepAlive';
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
        <KeepAliveProvider>
          <Routes>
            <Route path="/" element={<Navigate to={`/${pages[0]?.route}`} replace />} />
            {pages.map((page, i) => {
              // 合并页面配置
              const pageConfig = {
                ...appConfig.window,
                ...page.config,
              };

              // 默认所有页面都开启keepAlive
              const pageElement = React.createElement(pageComponentsHoc[i], {
                pageConfig,
                tabBar: appConfig.tabBar,
              });

              return (
                <Route
                  key={page.route}
                  path={`/${page.route}`}
                  element={<KeepAlive cacheKey={`/${page.route}`}>{pageElement}</KeepAlive>}
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
          {appConfig.tabBar?.items && appConfig.tabBar.items.length > 0 && <TabBar config={appConfig.tabBar} />}
          {process.env.NODE_ENV === 'development' && <LogLocation />}
        </KeepAliveProvider>
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
