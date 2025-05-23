import { AxiosError, AxiosResponse } from 'axios';
import createClient from '@lib/api/client';
import { Headers } from '@lib/api/client';
import { API } from '@lib/consts/common';

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
type ErrorInterceptor = (error: AxiosError) => Promise<never>;

export type CreatParams = {
  action?: string;
  detail?: string | null;
  startedAt?: string;
  finishedAt?: string | null;
};

export type UpdateParams = {
  id: number;
  userId: number;
  action: string;
  detail: string | null;
  startedAt: string;
  finishedAt: string | null;
};

const ENDPOINT = API.LIFELOG.ENDPOINT;

export default function lifelog(
  headers: () => Headers,
  responseInterceptor?: ResponseInterceptor,
  errorInterceptor?: ErrorInterceptor
) {
  const client = createClient();

  if (responseInterceptor !== undefined && errorInterceptor !== undefined)
    client.interceptors.response.use(responseInterceptor, errorInterceptor);

  const index = (page = 0, word = '') =>
    client.get(ENDPOINT, { headers: headers(), params: { page, word } });

  const create = (params: CreatParams) =>
    client.post(ENDPOINT, { data: params }, { headers: headers() });

  const update = (params: UpdateParams) =>
    client.put(
      `${ENDPOINT}/${params.id}`,
      { data: params },
      { headers: headers() }
    );

  const destroy = (id: number) =>
    client.delete(`${ENDPOINT}/${id}`, { headers: headers() });

  return {
    index,
    create,
    update,
    destroy,
  };
}
