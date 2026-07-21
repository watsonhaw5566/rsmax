import type React from 'react';

const REACT_PORTAL_TYPE = Symbol.for('react.portal');

export function createPortal(children: React.ReactNode, containerInfo: any, key?: string): any {
  return {
    // This tag allow us to uniquely identify this as a React Portal
    $$typeof: REACT_PORTAL_TYPE,
    key: key || '',
    children,
    containerInfo,
    implementation: null,
  };
}
