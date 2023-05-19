import React, { createContext, useContext, ReactNode } from 'react';
import { useUser } from './UserProvider';
import session from '../lib/api/session';
import { useSession } from './SessionProvider';
import { AxiosResponse, AxiosError } from 'axios';

interface AuthApiContextProps {
  authApi: ReturnType<typeof session>;
}

const AuthApiContext = createContext<AuthApiContextProps | undefined>(
  undefined
);

export const useAuth = (): AuthApiContextProps => {
  const context = useContext(AuthApiContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthApiProvider');
  }
  return context;
};

interface AuthApiProviderProps {
  children: ReactNode;
}

export default function AuthApiProvider({ children }: AuthApiProviderProps) {
  const { headers, setToken } = useSession();
  const { user, updateUser } = useUser();
  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setToken(response);
    if (user.email !== response.headers['uid'])
      updateUser(response.headers['uid']);
    return response;
  };
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  };

  const authApi = session(headers, responseInterceptor, errorInterceptor);

  return (
    <AuthApiContext.Provider value={{ authApi }}>
      {children}
    </AuthApiContext.Provider>
  );
}
