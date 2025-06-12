import loadable from '@loadable/component';
import { CacheRoute, CacheSwitch } from '@remax/react-router-cache-route';
import { PluginDriver, RuntimeOptions } from '@rsmax/framework-shared';
import type { History } from 'history';
import React from 'react';
import { Redirect, Route, Router, useLocation } from 'react-router-dom';
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
    const pageComponent = async
      ? loadable<any>(() =>
          (pageComponents[i]() as Promise<{ default: React.ComponentType }>).then(({ default: c }) =>
            createPageConfig(c, page.route)
          )
        )
      : createPageConfig(pageComponents[i]() as React.ComponentType, page.route);
    return pageComponent;
  });
  return (
    <Router history={history as any}>
      <AppConfig>
        <CacheSwitch>
          <Route exact path="/">
            <Redirect to={`/${pages[0]?.route}`} />
          </Route>
          {pages.map((page, i) => {
            return (
              <CacheRoute key={page.route} className="rsmax-cached-router-wrapper" path={`/${page.route}`} exact={true}>
                {(props: any) => {
                  const pageComponent = pageComponentsHoc[i];
                  return React.createElement(pageComponent, {
                    ...props,
                    pageConfig: {
                      ...appConfig.window,
                      ...page.config,
                    },
                    tabBar: appConfig.tabBar,
                  });
                }}
              </CacheRoute>
            );
          })}
          <Route>
            {/*找不到路由时重定向到首页*/}
            <Redirect to={`/${pages[0]?.route}`} />
          </Route>
        </CacheSwitch>
        {appConfig.tabBar?.items && appConfig.tabBar.items.length > 0 && (
          <TabBar history={history} config={appConfig.tabBar} />
        )}
        {process.env.NODE_ENV === 'development' && <LogLocation />}
      </AppConfig>
    </Router>
  );
}

function LogLocation() {
  const location = useLocation();
  React.useEffect(() => {
    console.log('[rsmax][react-router]location change', location.pathname);
  }, [location]);

  return null;
}
