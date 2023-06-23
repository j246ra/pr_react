import { AxiosError, AxiosResponse } from 'axios';
import client from '@lib/api/client';
import { Headers } from '@providers/SessionProvider';

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
type ErrorInterceptor = (error: AxiosError) => Promise<never>;

type CreatParams = {
  context?: string;
  action?: string;
  detail?: string;
  startedAt?: string;
  finishedAt?: string;
};

export default function lifelog(
  headers: Headers,
  responseInterceptor?: ResponseInterceptor,
  errorInterceptor?: ErrorInterceptor
) {
  if (responseInterceptor !== undefined && errorInterceptor !== undefined)
    client.interceptors.response.use(responseInterceptor, errorInterceptor);

  const index = () => client.get('/lifelogs', { headers });

  const create = (params: CreatParams) =>
    client.post('/lifelogs', { data: params }, { headers });

  return {
    index,
    create,
  };
}
