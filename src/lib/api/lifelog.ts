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

export type UpdateParams = {
  id: number;
  user_id: number;
  action: string;
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

  const index = (page = 0) =>
    client.get('/lifelogs', { headers, params: { page: page } });

  const create = (params: CreatParams) =>
    client.post('/lifelogs', { data: params }, { headers });

  const update = (params: UpdateParams) =>
    client.put('/lifelogs/' + params.id, { data: params }, { headers });

  const destroy = (id: number) => client.delete('/lifelogs/' + id, { headers });

  return {
    index,
    create,
    update,
    destroy,
  };
}
