import { useUser } from '@providers/UserProvider';
import notify from '@lib/toast';
import {
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  LOGIN,
  LOGOUT,
  PASSWORD_EDIT,
  PASSWORD_FORGET,
  SIGN_UP,
} from '@lib/consts/component';
import { ROUTES } from '@lib/consts/common';
import { useNavigate } from 'react-router-dom';
import { Headers, useSession } from '@providers/SessionProvider';
import accountUpdateValidator from '@validators/accountUpdate';
import passwordEditValidator from '@validators/passwordEdit';
import signUpValidator from '@validators/signUp';
import useAuthApi from '@src/hooks/useAuthApi';
import { useLifelog } from '@providers/LifelogProvider';

const useAccount = () => {
  const { createUser, clearUser } = useUser();
  const { setHeaders, removeHeaders } = useSession();

  const { clear: clearLifelog } = useLifelog();
  const navigate = useNavigate();
  const api = useAuthApi();

  const errorNotification = (messages: string[], defaultMessage: string) => {
    if (messages.length === 0) notify.error(defaultMessage);
    else messages.map((message) => notify.error(message));
  };

  const login = (email: string, password: string) => {
    createUser(email);
    api
      .signIn(email, password)
      .then(() => {
        notify.success(LOGIN.MESSAGE.SUCCESS);
        navigate(ROUTES.LIFELOGS);
      })
      .catch((r) => errorNotification(r.messages, LOGIN.MESSAGE.ERROR.NORMAL));
  };

  const logout = () => {
    api
      .signOut()
      .then(() => {
        clearUser();
        clearLifelog();
        removeHeaders();
        navigate(ROUTES.LOGIN);
        notify.success(LOGOUT.MESSAGE.SUCCESS);
      })
      .catch((r) => {
        errorNotification(r.messages, LOGOUT.MESSAGE.ERROR);
      });
  };

  const update = (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    const columns = { email, password, passwordConfirmation };
    if (accountUpdateValidator(columns).isInvalid) return;
    api
      .updateUser({ email, password })
      .then(() => {
        notify.success(ACCOUNT_UPDATE.MESSAGE.SUCCESS);
        navigate('/');
      })
      .catch((r) => {
        errorNotification(r.messages, ACCOUNT_UPDATE.MESSAGE.ERROR);
      });
  };

  const passwordChange = (password: string, passwordConfirmation: string, headers: Headers) => {
    if (passwordEditValidator(password, passwordConfirmation).isInvalid) return;
    api
      .passwordReset(password, passwordConfirmation, headers)
      .then(() => {
        setHeaders(headers);
        notify.success(PASSWORD_EDIT.MESSAGE.SUCCESS);
        navigate('/');
      })
      .catch((r) => {
        errorNotification(r.messages, PASSWORD_EDIT.MESSAGE.ERROR);
      });
  };

  const passwordForget = (email: string) => {
    api
      .passwordForget(email)
      .then(() => {
        notify.success(PASSWORD_FORGET.MESSAGE.SUCCESS);
        navigate(ROUTES.RESET_MAIL_SEND_SUCCESS);
      })
      .catch((r) => {
        if (r.status === 404) {
          notify.success(PASSWORD_FORGET.MESSAGE.SUCCESS);
          navigate(ROUTES.RESET_MAIL_SEND_SUCCESS);
        } else {
          errorNotification(r.messages, PASSWORD_FORGET.MESSAGE.ERROR);
        }
      });
  };

  const signUp = (email: string, password: string) => {
    if (signUpValidator(email, password).isInvalid) return;
    api
      .signUp(email, password)
      .then(() => {
        notify.success(SIGN_UP.MESSAGE.SUCCESS);
        navigate(ROUTES.LIFELOGS);
      })
      .catch((r) => {
        errorNotification(r.messages, SIGN_UP.MESSAGE.ERROR);
        clearUser();
        removeHeaders();
      });
  };

  const remove = () => {
    api
      .deleteUser()
      .then(() => {
        clearUser();
        clearLifelog();
        removeHeaders();
        navigate(ROUTES.LOGIN);
        notify.success(ACCOUNT_DELETE.MESSAGE.SUCCESS);
      })
      .catch((r) =>
        errorNotification(r.messages, ACCOUNT_DELETE.MESSAGE.ERROR)
      );
  };

  return {
    login,
    logout,
    update,
    passwordChange,
    passwordForget,
    signUp,
    remove,
  };
};

export default useAccount;
