import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Headers, useSession } from '@providers/SessionProvider';

export default function useSearchParamsForHeaders() {
  const { setHeaders } = useSession();
  const [params] = useSearchParams();
  useEffect(() => {
    const headers: Headers = {
      'access-token': params.get('access-token') || undefined,
      client: params.get('client') || undefined,
      uid: params.get('uid') || undefined,
    };
    setHeaders(headers);
  }, [params]);
}
