import client from "./client";
// https://devise-token-auth.gitbook.io/devise-token-auth/usage

export const hello = (headers) => {
  return client.get("/test", {headers});
}

export const signUp = (email, password) => {
  return client.post('/auth', {email, password})
}

export const signIn = (email, password) => {
  return client.post("/auth/sign_in", { email, password })
}

export const signOut = (headers) => {
  return client.delete('/auth/sign_out', {headers})
}

export const deleteUser = (headers) => {
  return client.delete('/auth', {headers})
}

export const validateToken = (headers) => {
  return client.get("/auth/validate_token", {headers})
}
