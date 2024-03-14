import { useSession } from '@providers/SessionProvider';
import { useUser } from '@providers/UserProvider';
import { AxiosError, AxiosResponse } from 'axios';
import notify from '@lib/toast';
import { COMMON } from '@lib/consts/common';
import session from '@lib/api/session';

type Data = {
  errors: {
    fullMessages: [string];
  };
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
  const errorInterceptor = (error: AxiosError): Promise<never> => {
    if (error.response === undefined) {
      notify.error(`${COMMON.MESSAGE.ERROR.GENERAL}(${error.message})`);
    } else {
      const data = error.response.data as Data;
      if (data?.errors.fullMessages !== undefined) {
        data.errors.fullMessages.forEach((message: string) => {
          notify.error(message);
        });
      }
    }
    return Promise.reject(error);
  };

  return session(getHeaders, responseInterceptor, errorInterceptor);
};

export default useAuthApi;
