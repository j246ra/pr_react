import { API } from '@lib/consts/common';
import { baseUrl } from '@lib/api/client';

const normalizeUrl = (url: string) => {
  let noExtraSlashUrl = url.replace(/([^:]\/)\/+/g, '$1');
  return noExtraSlashUrl.replace(/\/+$/, '');
};

export const apiHost = (path: string, version = API.VERSION) => {
  const url = new URL(`/${version}/${path}`, baseUrl).toString();
  return normalizeUrl(url);
};
