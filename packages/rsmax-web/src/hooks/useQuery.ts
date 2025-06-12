import { RuntimeOptions } from '@rsmax/framework-shared';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

export default function useQuery<
  Q extends Record<string, string | undefined> = { [name: string]: string | undefined }
>(): Q {
  const location = RuntimeOptions.get('mpa') ? window.location : useLocation();

  return qs.parse(location.search, { ignoreQueryPrefix: true }) as Q;
}
