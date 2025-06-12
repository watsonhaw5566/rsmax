import { type DependencyList, useLayoutEffect } from 'react';
import nativeEffect, { type Listener } from '../nativeEffect';

export default function useNativeEffect(listener: Listener, deps?: DependencyList) {
  useLayoutEffect(() => {
    return nativeEffect.connect(listener, !!deps);
  }, deps);
}
