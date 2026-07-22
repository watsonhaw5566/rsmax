import { PageInstanceContext, RuntimeOptions } from '@rsmax/framework-shared';
import { useContext as useClassicContext } from 'react';
import { useContext as useLightContext } from '../hooks-light';

export default function useQuery<
  Q extends Record<string, string | undefined> = { [name: string]: string | undefined },
>(): Q {
  const pageInstance: any =
    RuntimeOptions.get('renderer') === 'light'
      ? useLightContext(PageInstanceContext)
      : useClassicContext(PageInstanceContext);
  return pageInstance.query;
}
