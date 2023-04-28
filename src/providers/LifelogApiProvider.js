import React, {createContext, useContext} from 'react';
import test from "../lib/api/test";
import {useUser} from "./UserProvider";
import {useAuth} from "./AuthApiProvider";

const LifelogApiContext = createContext();
export const useLifelog = () => useContext(LifelogApiContext);

export default function LifelogApiProvider({ children }) {
  const { updateToken, clearUser } = useUser();
  const { headers } = useAuth();
  const responseInterceptor = (response) => {
    updateToken(response.headers['access-token']);
    return response;
  };
  const errorInterceptor = (error) => {
    if (error?.status === 401) clearUser();
    return Promise.reject(error);
  };
  const lifelogApi = test(headers, responseInterceptor, errorInterceptor)

  return (
    <LifelogApiContext.Provider value={{ lifelogApi }} >
      {children}
    </LifelogApiContext.Provider>
  );
}
