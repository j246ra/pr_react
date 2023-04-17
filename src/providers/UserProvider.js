import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }){
  const [user, setUser] = useState({
    email: '',
    uid: '',
    client: '',
    token: '',
    valid: false,
  });

  const createUser = (email) => setUser({...user, email});

  const updateUser = (email, uid, client, token) => setUser({
    ...user, email, uid, client, token
  });

  const updateToken = (token) => {
    if(token !== "") setUser({...user, token})
  };

  const toValid = () => setUser({...user, valid: true});

  const clearUser = () => {
    setUser({
      email: '',
      uid: '',
      client: '',
      token: '',
      valid: false,
    })
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
