import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { COMMON } from '@lib/consts/common';
import session from '@lib/api/session';

type Data = {
  errors: [string];
};

export type AuthApiErrorResponse = {
  status: number | undefined;
  messages: string[];
};

const useAuthApi = () => {
  const { getHeaders, setHeaders } = useSession();
  const { user, updateUser } = useUser();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setHeaders(response);
    if (user.email !== response.headers['uid'])
      updateUser(response.headers['uid']);
    return response;
  };
  const errorInterceptor = (
    error: AxiosError
  ): Promise<AuthApiErrorResponse> => {
    const response: AuthApiErrorResponse = {
      status: undefined,
      messages: [],
    };
    if (error.response === undefined) {
      response.messages.push(
        `${COMMON.MESSAGE.ERROR.GENERAL}(${error.message})`
      );
    } else {
      response.status = error.response.status;
      const data = error.response.data as Data;
      if (data?.errors !== undefined) {
        response.messages.push(...data.errors);
      }
    }
    return Promise.reject(response);
  };

  return session(getHeaders, responseInterceptor, errorInterceptor);
};

export default useAuthApi;
