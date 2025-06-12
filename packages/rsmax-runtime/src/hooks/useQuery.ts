import { PageInstanceContext } from '@rsmax/framework-shared';
import { useContext } from 'react';

export default function useQuery<
  Q extends Record<string, string | undefined> = { [name: string]: string | undefined },
>(): Q {
  const pageInstance: any = useContext(PageInstanceContext);
  return pageInstance.query;
}
