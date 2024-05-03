import React, { createContext, ReactNode, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';
import { CookiesProvider } from 'react-cookie';
import { AxiosResponse } from 'axios';
import { expires } from '@lib/dateUtil';
import { COMMON } from '@lib/consts/common';

type SessionContextType = {
  initializeByUid: (uid: string) => void;
  getHeaders: () => Headers;
  hasToken: () => boolean;
  setHeaders: (r: AxiosResponse<Headers> | Headers) => void;
  removeHeaders: () => void;
};

const SessionContext = createContext({} as SessionContextType);
export const useSession = () => useContext(SessionContext);

export type Headers = {
  'access-token'?: string;
  uid?: string;
  client?: string;
};

export type SessionProviderProps = {
  children: ReactNode;
};

const defaultOptions = {
  path: COMMON.APP_URL.BASE_DIR,
};

export default function SessionProvider({ children }: SessionProviderProps) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const hasToken = (): boolean => {
    const cookie = { ...(cookies.token as Headers) };
    return !(
      cookie['access-token'] === undefined || cookie['access-token'] === ''
    );
  };

  const initializeByUid = (uid: string): void => {
    const token: Headers = { uid };
    setCookie('token', token, { ...defaultOptions, expires: expires() });
  };

  const getHeaders = (): Headers => {
    const cookie = { ...(cookies.token as Headers) };
    return {
      'access-token': cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };

  const setHeaders = (r: AxiosResponse<Headers> | Headers): void => {
    let headersToSet: Headers;
    if ('headers' in r) {
      headersToSet = {
        'access-token': r.headers['access-token'],
        uid: r.headers.uid,
        client: r.headers.client,
      };
    } else {
      headersToSet = r;
    }
    if (
      headersToSet['access-token'] === undefined ||
      headersToSet['access-token'] === ''
    )
      return;
    else if (typeof headersToSet['access-token'] === 'string') {
      setCookie('token', headersToSet, {
        ...defaultOptions,
        expires: expires(),
      });
    } else {
      const error = new TypeError();
      error.name = 'SessionProvider';
      error.message = 'Invalid access-token type error.';
      throw error;
    }
  };

  const removeHeaders = (): void => removeCookie('token');

  return (
    <CookiesProvider defaultSetOptions={defaultOptions}>
      <SessionContext.Provider
        value={{
          initializeByUid,
          getHeaders,
          hasToken,
          setHeaders,
          removeHeaders,
        }}
      >
        {children}
      </SessionContext.Provider>
    </CookiesProvider>
  );
}
