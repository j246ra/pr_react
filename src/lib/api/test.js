import client from "./client";

export const hello = (headers) => {
  return client.get("/test", {headers});
}

export const authSignIn = (email, password) => {
  return client.post("/auth/sign_in", { email, password })
}

export const validateToken = (headers) => {
  return client.get("/auth/validate_token", headers)
}
