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

  const toValid = () => setUser({...user, valid: true});

  const loginHeader = () => {
    return({
      "access-token": user.token,
      uid: user.uid,
      client: user.client
    });
  }

  return (
    <UserContext.Provider value={{ user, createUser, updateUser, toValid, loginHeader }}>
      {children}
    </UserContext.Provider>
  );
}
