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
    valid: false,
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

  const toValid = () => setUser({...user, valid: true});

  const clearUser = () => {
    setUser({
      email: '',
      uid: '',
      client: '',
      token: '',
      valid: false,
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
    <UserContext.Provider value={{ user, createUser, updateUser, updateToken, toValid, clearUser, requestHeaders }}>
      {children}
    </UserContext.Provider>
  );
}
