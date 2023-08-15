import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from './UserProvider';
import session from '@lib/api/session';
import { useSession } from './SessionProvider';
import { AxiosResponse, AxiosError } from 'axios';
import notify from '@lib/toast';

interface AuthApiContextProps {
  authApi: ReturnType<typeof session>;
}

const AuthApiContext = createContext({} as AuthApiContextProps);
export const useAuth = (): AuthApiContextProps => useContext(AuthApiContext);

interface AuthApiProviderProps {
  children: ReactNode;
}

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
      notify.error(`想定外のエラーが発生しました (${error.message})`);
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
