import React, { createContext, useState, useContext } from "react";
import {useCookies} from "react-cookie";

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

  const requestHeaders = () => {
    return({
      "access-token": user.token,
      uid: user.uid,
      client: user.client
    });
  };

  return (
    <UserContext.Provider value={{ user, createUser, updateUser, updateToken, clearUser, requestHeaders }}>
      {children}
    </UserContext.Provider>
  );
}
