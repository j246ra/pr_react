import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { API, COMMON } from '@lib/consts/common';
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
  const { user, updateUser, updateSessionId } = useUser();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    setHeaders(response);
    if(user.sessionId === '' || user.sessionId === undefined) {
      updateSessionId(response.headers['session-id']);
      updateUser(response.headers['uid']);
    } else if( response.headers['session-id'] !== undefined && user.sessionId !== response.headers['session-id']){
      console.log(user.sessionId);
      console.log(response.headers['session-id']);
      throw new Error(API.MESSAGE.ERROR.INVALID_TOKEN);
    }
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
