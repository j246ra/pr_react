import client from './client';

export default function session(
  headers,
  responseInterceptor,
  errorInterceptor
) {
  if (responseInterceptor !== undefined && errorInterceptor !== undefined)
    client.interceptors.response.use(responseInterceptor, errorInterceptor);

  const signIn = (email, password) =>
    client.post('/auth/sign_in', { email, password });
  const signUp = (email, password) => client.post('/auth', { email, password });
  const updateUser = (params) => client.put('/auth', params, { headers });
  const signOut = () => client.delete('/auth/sign_out', { headers });
  const deleteUser = () => client.delete('/auth', { headers });
  const validate = () => client.get('/auth/validate_token', { headers });
  const passwordForget = (email) =>
    client.post('/auth/password', {
      email,
      redirect_url: `${process.env.REACT_APP_HOST_URL}/password_edit`,
    });
  const passwordReset = (password, passwordConfirmation) =>
    client.put(
      '/auth/password',
      { password, password_confirmation: passwordConfirmation },
      { headers }
    );

  return {
    signIn,
    signUp,
    updateUser,
    signOut,
    deleteUser,
    validate,
    passwordForget,
    passwordReset,
  };
}
