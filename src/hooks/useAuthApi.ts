import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import { COMMON, CONST } from '@lib/consts/common';
import session from '@lib/api/session';
import { InvalidTokenError } from '@src/errors/InvalidTokenError';

type Data = {
  errors: [string];
};

export type AuthApiErrorResponse = {
  status: number | undefined;
  messages: string[];
};

const useAuthApi = () => {
  const { getHeaders, saveUser, validSessionId, sessionIdIsBlank } = useUser();

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    switch (response.config.url) {
      case CONST.API.SESSION.ENDPOINT.SIGN_OUT:
      case CONST.API.SESSION.ENDPOINT.PASSWORD_RESET:
        return response;
      case CONST.API.SESSION.ENDPOINT.USER:
        if (
          response.config.method === 'delete' ||
          response.config.method === 'DELETE'
        )
          return response;
    }
    if (sessionIdIsBlank()) {
      saveUser({
        email: response.headers['uid'] || '',
        sessionId: response.headers['session-id'] || '',
      });
    } else if (!validSessionId(response.headers['session-id'])) {
      throw new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.SESSION_CONFLICT);
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
      if (typeof error.response.data === 'string') {
        response.messages.push(error.response.data);
      } else {
        const data = error.response.data as Data;
        if (data?.errors !== undefined) response.messages.push(...data.errors);
      }
    }
    return Promise.reject(response);
  };

  return session(getHeaders, responseInterceptor, errorInterceptor);
};

export default useAuthApi;
