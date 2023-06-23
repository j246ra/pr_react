import React, { createContext, ReactNode, useContext } from 'react';
import { useUser } from './UserProvider';
import { useSession } from './SessionProvider';
import { AxiosError, AxiosResponse } from 'axios';
import lifelog from '@lib/api/lifelog';

export interface LifelogApiContextProps {
  lifelogApi: ReturnType<typeof lifelog>;
}

const LifelogApiContext = createContext<LifelogApiContextProps | undefined>(
  undefined
);

export const useLifelog = (): LifelogApiContextProps => {
  const context = useContext(LifelogApiContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthApiProvider');
  }
  return context;
};

interface LifelogApiProviderProps {
  children: ReactNode;
}

export default function LifelogApiProvider({
  children,
}: LifelogApiProviderProps) {
  const { headers, setToken } = useSession();
  const { clearUser } = useUser();
  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setToken(response);
    return response;
  };
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    if (error?.status === 401) clearUser();
    return Promise.reject(error);
  };

  const lifelogApi = lifelog(headers, responseInterceptor, errorInterceptor);

  return (
    <LifelogApiContext.Provider value={{ lifelogApi }}>
      {children}
    </LifelogApiContext.Provider>
  );
}
