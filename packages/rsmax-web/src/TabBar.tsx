import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { TabBarConfig, TabItem } from './types';

export function TabBar({ config }: { config: TabBarConfig }) {
  const location = useLocation();
  const currentPath = location.pathname;

  React.useEffect(() => {}, [currentPath]);

  const isActive = (url: string) => {
    if (!url.startsWith('/')) {
      url = `/${url}`;
    }
    return currentPath === url;
  };
  return (
    <div className="rsmax-tab-bar" style={{ backgroundColor: config.backgroundColor ?? '' }}>
      {config.items.map((item, index) => (
        <TabBarItem key={index} config={config} isActive={isActive(item.url)} item={item} />
      ))}
    </div>
  );
}

function TabBarItem({ config, isActive, item }: { config: TabBarConfig; isActive: boolean; item: TabItem }) {
  const icon = isActive ? item.activeImage || item.image : item.image;
  const textColor = config.textColor ?? '#333';
  const selectedColor = config.selectedColor ?? '#108ee9';

  return (
    <Link to={item.url.startsWith('/') ? item.url : `/${item.url}`} className={'rsmax-tab-item'}>
      <div className={'rsmax-tab-item-image'} style={{ backgroundImage: `url(${icon})` }} />
      <div
        className={'rsmax-tab-item-title'}
        style={{
          color: isActive ? selectedColor : textColor,
        }}
      >
        {item.title}
      </div>
    </Link>
  );
}
