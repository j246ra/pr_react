import client from "./client";

export default function session(headers){
  const signIn = (email, password) => client.post("/auth/sign_in", { email, password })
  const signUp = (email, password) => client.post('/auth', {email, password})
  const updateUser = (email, password) => client.put('/auth', {email, password},{headers})
  const signOut = () => client.delete('/auth/sign_out', {headers})
  const deleteUser = () => client.delete('/auth', {headers})
  const validate = () => client.get("/auth/validate_token", {headers});

  return {signIn, signUp, updateUser, signOut, deleteUser, validate}
}
