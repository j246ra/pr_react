import React, { createContext, FC, ReactNode, useContext } from 'react';
import { useCookies } from 'react-cookie/cjs';
import { CookiesProvider } from 'react-cookie';
import { AxiosResponse } from 'axios';

const SessionContext = createContext(undefined);
export const useSession = () => useContext(SessionContext);

type props = {
  children: ReactNode;
};

type headers = {
  'access-token'?: string;
  uid?: string;
  client?: string;
};

type token = {
  token?: string;
  uid?: string;
  client?: string;
};

const SessionProvider: FC<props> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const headers = (): headers => {
    return { ...(cookies.token as headers) };
  };
  const hasToken = () => {
    const cookie = { ...cookies.token };
    return !(
      cookie['access-token'] === undefined || cookie['access-token'] === ''
    );
  };
  const createToken = (uid: string) => {
    const token: headers = { uid };
    setCookie('token', token);
  };
  const getToken = (): token => {
    const cookie = { ...(cookies.token as headers) };
    return {
      token: cookie['access-token'],
      uid: cookie.uid,
      client: cookie.client,
    };
  };
  const setToken = (r: AxiosResponse<headers>) => {
    const cookie = {
      'access-token': r.headers['access-token'],
      uid: r.headers['uid'],
      client: r.headers['client'],
    };
    setCookie('token', cookie);
  };
  const removeToken = () => removeCookie('token');
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
