import { AxiosResponse, AxiosError } from 'axios';
import createClient, { Headers } from './client';
import Defs from '@lib/consts';
import { AuthApiErrorResponse } from '@src/hooks/useAuthApi';

type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse;
type ErrorInterceptor = (error: AxiosError) => Promise<AuthApiErrorResponse>;

export type UserParams = {
  email?: string;
  password?: string;
};

const ENDPOINT = Defs.API.SESSION.ENDPOINT;

export default function session(
  headers: () => Headers,
  responseInterceptor?: ResponseInterceptor,
  errorInterceptor?: ErrorInterceptor
) {
  const client = createClient();
  if (responseInterceptor !== undefined && errorInterceptor !== undefined)
    client.interceptors.response.use(responseInterceptor, errorInterceptor);

  const signIn = (email: string, password: string) =>
    client.post(ENDPOINT.SIGN_IN, { email, password });
  const signUp = (email: string, password: string) =>
    client.post(ENDPOINT.USER, { email, password });
  const updateUser = (params: UserParams) =>
    client.put(ENDPOINT.USER, params, { headers: headers() });
  const signOut = () =>
    client.delete(ENDPOINT.SIGN_OUT, { headers: headers() });
  const deleteUser = () => client.delete(ENDPOINT.USER, { headers: headers() });
  const validate = () => client.get(ENDPOINT.VALIDATE, { headers: headers() });
  const passwordForget = (email: string) =>
    client.post(ENDPOINT.PASSWORD_RESET, {
      email,
      redirect_url: `${Defs.COMMON.APP_URL.HOST_URL}${Defs.COMMON.APP_URL.BASE_DIR}/password_edit`,
    });
  const passwordReset = (
    password: string,
    passwordConfirmation: string,
    headers: Headers
  ) =>
    client.put(
      ENDPOINT.PASSWORD_RESET,
      { password, password_confirmation: passwordConfirmation },
      { headers: headers }
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
