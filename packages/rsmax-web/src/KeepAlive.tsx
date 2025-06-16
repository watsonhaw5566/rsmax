import React, { createContext, useContext, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface CacheItem {
  component: React.ReactNode;
  status: 'active' | 'inactive';
}

interface KeepAliveContextType {
  cache: Map<string, CacheItem>;
  setCache: React.Dispatch<React.SetStateAction<Map<string, CacheItem>>>;
}

const KeepAliveContext = createContext<KeepAliveContextType | null>(null);

export const KeepAliveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cache, setCache] = useState<Map<string, CacheItem>>(new Map());

  return (
    <KeepAliveContext.Provider value={{ cache, setCache }}>
      {children}
      {/* 渲染所有缓存的组件 */}
      {Array.from(cache.entries()).map(([key, item]) => (
        <div
          key={key}
          style={{
            display: item.status === 'active' ? 'block' : 'none',
            height: '100%',
            width: '100%',
          }}
        >
          {item.component}
        </div>
      ))}
    </KeepAliveContext.Provider>
  );
};

interface KeepAliveProps {
  cacheKey: string;
  children: React.ReactNode;
}

export const KeepAlive: React.FC<KeepAliveProps> = ({ cacheKey, children }) => {
  const context = useContext(KeepAliveContext);
  const location = useLocation();
  const componentRef = useRef(children);

  if (!context) {
    throw new Error('KeepAlive must be used within KeepAliveProvider');
  }

  const { cache, setCache } = context;

  React.useEffect(() => {
    // 更新组件引用
    componentRef.current = children;
    setCache(prev => {
      const next = new Map(prev);
      if (next.has(cacheKey)) {
        next.set(cacheKey, { ...next.get(cacheKey)!, component: children });
      }
      return next;
    });
  }, [children]);

  React.useEffect(() => {
    // 初始化缓存
    if (!cache.has(cacheKey)) {
      setCache(prev => {
        const next = new Map(prev);
        next.set(cacheKey, {
          component: componentRef.current,
          status: 'active',
        });
        return next;
      });
    }

    // 更新状态
    setCache(prev => {
      const next = new Map(prev);
      prev.forEach((value, key) => {
        next.set(key, {
          ...value,
          status: key === cacheKey ? 'active' : 'inactive',
        });
      });
      return next;
    });

    // 清理函数
    return () => {
      // 这里我们不会在路由变化时删除缓存
      // 只是将状态设置为 inactive
      setCache(prev => {
        const next = new Map(prev);
        if (next.has(cacheKey)) {
          next.set(cacheKey, {
            ...next.get(cacheKey)!,
            status: 'inactive',
          });
        }
        return next;
      });
    };
  }, [cacheKey, location.pathname]);

  // 不直接渲染children，因为所有缓存的组件都在Provider中渲染
  return null;
};
