import client from "./client";

export const execTest = () => {
  return client.get("/test")
}

export const authSignIn = (email, password) => {
  return client.post("/auth/sign_in", { email, password })
}

export const validateToken = (params) => {
  return client.get("/auth/validate_token", { headers: params })
}
