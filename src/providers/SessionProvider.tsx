import React, { createContext, FC, ReactNode, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';
import { CookiesProvider } from 'react-cookie';
import { AxiosResponse } from 'axios';

type SessionContextType = {
  headers: Headers;
  createToken: (uid: string) => void;
  getToken: () => Token;
  hasToken: () => boolean;
  setToken: (r: AxiosResponse<Headers> | Headers) => void;
  removeToken: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export type Headers = {
  'access-token'?: string;
  uid?: string;
  client?: string;
};

type Token = {
  token?: string;
  uid?: string;
  client?: string;
};

const SessionProvider: FC<Props> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const headers: Headers = { ...(cookies.token as Headers) };

  const hasToken = (): boolean => {
    const cookie = { ...(cookies.token as Headers) };
    return !(
      cookie['access-token'] === undefined || cookie['access-token'] === ''
    );
  };

  const createToken = (uid: string): void => {
    const token: Headers = { uid };
    setCookie('token', token);
  };

  const getToken = (): Token => {
    const cookie = { ...(cookies.token as Headers) };
    return {
      token: cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };

  const setToken = (r: AxiosResponse<Headers> | Headers): void => {
    let headersToSet: Headers;
    if ('headers' in r) {
      headersToSet = {
        'access-token': r.headers['access-token'],
        uid: r.headers['uid'],
        client: r.headers['client'],
      };
    } else {
      headersToSet = r;
    }
    if (headersToSet['access-token']) setCookie('token', headersToSet);
  };

  const removeToken = (): void => removeCookie('token');

  return (
    <CookiesProvider>
      <SessionContext.Provider
        value={{
          headers,
          createToken,
          getToken,
          hasToken,
          setToken,
          removeToken,
        }}
      >
        {children}
      </SessionContext.Provider>
    </CookiesProvider>
  );
};

export default SessionProvider;
