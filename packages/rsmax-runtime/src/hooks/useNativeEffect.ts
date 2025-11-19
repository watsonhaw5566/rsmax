import { type DependencyList, useEffect, useLayoutEffect } from 'react';
import nativeEffect, { type Listener } from '../nativeEffect';

// 创建服务端安全的effect hook
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function useNativeEffect(listener: Listener, deps?: DependencyList) {
  useIsomorphicLayoutEffect(() => {
    return nativeEffect.connect(listener, !!deps);
  }, deps);
}
