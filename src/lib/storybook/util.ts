const normalizeUrl = (url: string) => {
  let noExtraSlashUrl = url.replace(/([^:]\/)\/+/g, '$1');
  return noExtraSlashUrl.replace(/\/+$/, '');
};

export const apiHost = (path: string, version = 'v1') => {
  const url = new URL(
    `/${version}/${path}`,
    'http://localhost:3000/'
  ).toString();
  return normalizeUrl(url);
};
