import { AxiosResponse, AxiosError } from 'axios';
import client from './client';
import { Headers } from '../../providers/SessionProvider';

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
type ErrorInterceptor = (error: AxiosError) => Promise<never>;

interface UserParams {
  email: string;
  password: string;
}

export default function session(
  headers: Headers,
  responseInterceptor?: ResponseInterceptor,
  errorInterceptor?: ErrorInterceptor
) {
  if (responseInterceptor !== undefined && errorInterceptor !== undefined)
    client.interceptors.response.use(responseInterceptor, errorInterceptor);

  const signIn = (email: string, password: string) =>
    client.post('/auth/sign_in', { email, password });
  const signUp = (email: string, password: string) =>
    client.post('/auth', { email, password });
  const updateUser = (params: UserParams) =>
    client.put('/auth', params, { headers });
  const signOut = () => client.delete('/auth/sign_out', { headers });
  const deleteUser = () => client.delete('/auth', { headers });
  const validate = () => client.get('/auth/validate_token', { headers });
  const passwordForget = (email: string) =>
    client.post('/auth/password', {
      email,
      redirect_url: `${process.env.REACT_APP_HOST_URL}/password_edit`,
    });
  const passwordReset = (password: string, passwordConfirmation: string) =>
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
