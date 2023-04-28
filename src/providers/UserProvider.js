import React, { createContext, useState, useContext } from "react";
import {useCookies} from "react-cookie";
import session from "../lib/api/session";
import test from "../lib/api/test";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }){
  const [cookies, setCookie, removeCookie] = useCookies(['tokens']);
  const [user, setUser] = useState({
    email: '',
    uid: '',
    client: '',
    token: '',
    ...cookies.tokens,
  });

  const createUser = (email) => setUser({...user, email});

  const updateUser = (email, uid, client, token) => {
    setUser({
      ...user, email, uid, client, token
    });
    setCookie('tokens', {token, uid, client, email});
  };

  const updateToken = (token) => {
    if(token !== "") {
      setUser({...user, token});
      setCookie('tokens', {...cookies.tokens, token});
    }
  };

  const clearUser = () => {
    setUser({
      email: '',
      uid: '',
      client: '',
      token: '',
    });
    removeCookie('tokens');
  };

  const isLogin = () => {
    return user.token !== '';
  }

  const requestHeaders = () => {
    return({
      "access-token": user.token,
      uid: user.uid,
      client: user.client
    });
  };

  const api = session(requestHeaders());

  const responseInterceptor = (response) => {
    updateToken(response.headers['access-token']);
    return response;
  };
  const errorInterceptor = (error) => {
    if (error?.status === 401) clearUser();
    return Promise.reject(error);
  };
  const testApi = test(requestHeaders(), responseInterceptor, errorInterceptor)

  return (
    <UserContext.Provider value={{ user, createUser, updateUser, updateToken, clearUser, isLogin, requestHeaders, api, testApi }}>
      {children}
    </UserContext.Provider>
  );
}
