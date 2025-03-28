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
import { CONST, ROUTES } from '@lib/consts/common';
import { useNavigate } from 'react-router';
import accountUpdateValidator from '@validators/accountUpdate';
import passwordEditValidator from '@validators/passwordEdit';
import signUpValidator from '@validators/signUp';
import useAuthApi, { AuthApiErrorResponse } from '@src/hooks/useAuthApi';
import { useLifelog } from '@providers/LifelogProvider';
import toast from '@lib/toast';
import { Headers } from '@lib/api/client';
import { useErrorBoundary } from 'react-error-boundary';
import { InvalidTokenError } from '@src/errors/InvalidTokenError';

const useAccount = () => {
  const { user, createUser, clearUser } = useUser();

  const { clear: clearLifelog } = useLifelog();
  const navigate = useNavigate();
  const api = useAuthApi();

  const { showBoundary } = useErrorBoundary();

  const errorDispatch = (e: AuthApiErrorResponse) => {
    if (e.status === 401) {
      if (e.messages[0] === 'Invalid session_id')
        showBoundary(
          new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.SESSION_CONFLICT)
        );
      else
        showBoundary(new InvalidTokenError(CONST.COMMON.MESSAGE.ERROR.EXPIRED));
    }
  };

  const errorNotification = (
    e: AuthApiErrorResponse | Error,
    defaultMessage: string
  ) => {
    if ('messages' in e && Array.isArray(e.messages)) {
      if (e.messages.length === 0) notify.error(defaultMessage);
      else e.messages.forEach((message) => notify.error(message));
      return;
    }
    if ('message' in e && e.message) notify.error(e.message);
    else notify.error(defaultMessage);
  };

  const login = (email: string, password: string) => {
    createUser(email);
    api
      .signIn(email, password)
      .then(() => {
        notify.success(LOGIN.MESSAGE.SUCCESS);
      })
      .catch((e) => {
        errorNotification(e, LOGIN.MESSAGE.ERROR.NORMAL);
      });
  };

  const logout = () => {
    api
      .signOut()
      .then(() => {
        clearUser();
        clearLifelog();
        notify.success(LOGOUT.MESSAGE.SUCCESS);
      })
      .catch((r) => {
        errorNotification(r, LOGOUT.MESSAGE.ERROR);
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
      .catch((e) => {
        errorDispatch(e);
        errorNotification(e, ACCOUNT_UPDATE.MESSAGE.ERROR);
      });
  };

  const passwordChange = (
    password: string,
    passwordConfirmation: string,
    headers: Headers
  ) => {
    if (passwordEditValidator(password, passwordConfirmation).isInvalid) return;
    api
      .passwordReset(password, passwordConfirmation, headers)
      .then(() => {
        notify.success(PASSWORD_EDIT.MESSAGE.SUCCESS);
        navigate('/');
      })
      .catch((r) => {
        errorNotification(r, PASSWORD_EDIT.MESSAGE.ERROR);
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
          errorNotification(r, PASSWORD_FORGET.MESSAGE.ERROR);
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
        errorNotification(r, SIGN_UP.MESSAGE.ERROR);
        clearUser();
      });
  };

  const remove = () => {
    api
      .deleteUser()
      .then(() => {
        clearUser();
        clearLifelog();
        navigate(ROUTES.LOGIN);
        notify.success(ACCOUNT_DELETE.MESSAGE.SUCCESS);
      })
      .catch((r) => errorNotification(r, ACCOUNT_DELETE.MESSAGE.ERROR));
  };

  const checkAuthenticated = () => {
    if (user.sessionId !== null) return;
    api.validate().catch(() => {
      toast.info(LOGIN.MESSAGE.ERROR.NEED_LOGIN);
    });
  };

  return {
    login,
    logout,
    update,
    passwordChange,
    passwordForget,
    signUp,
    remove,
    checkAuthenticated,
  };
};

export default useAccount;
