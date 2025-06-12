import { createPortal, usePageInstance } from '@rsmax/runtime';
import type * as React from 'react';

export default function Modal({ children }: React.PropsWithChildren<Record<string, any>>) {
  const inst = usePageInstance();

  return createPortal(children, inst.modalContainer);
}
