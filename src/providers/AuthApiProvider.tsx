import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from './UserProvider';
import session from '@lib/api/session';
import { useSession } from './SessionProvider';
import { AxiosResponse, AxiosError } from 'axios';
import notify from '@lib/toast';
import { COMMON } from '@lib/consts/common';

type AuthApiContextProps = {
  authApi: ReturnType<typeof session>;
};

const AuthApiContext = createContext({} as AuthApiContextProps);
export const useAuth = (): AuthApiContextProps => useContext(AuthApiContext);

type AuthApiProviderProps = {
  children: ReactNode;
};

type Data = {
  errors: {
    fullMessages: [string];
  };
};

export default function AuthApiProvider({ children }: AuthApiProviderProps) {
  const { getHeaders, setHeaders } = useSession();
  const { user, updateUser } = useUser();
  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setHeaders(response);
    if (user.email !== response.headers['uid'])
      updateUser(response.headers['uid']);
    return response;
  };
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    if (error.response === undefined) {
      notify.error(`${COMMON.MESSAGE.ERROR.GENERAL}(${error.message})`);
    } else {
      const data = error.response.data as Data;
      if (data?.errors.fullMessages !== undefined) {
        data.errors.fullMessages.forEach((message: string) => {
          notify.error(message);
        });
      }
    }
    return Promise.reject(error);
  };

  const authApi = session(getHeaders, responseInterceptor, errorInterceptor);

  return (
    <AuthApiContext.Provider value={{ authApi }}>
      {children}
    </AuthApiContext.Provider>
  );
}
