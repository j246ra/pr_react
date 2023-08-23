import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import notify from '@lib/toast';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';
import SessionCard from '@presentational/SessionCard';
import { LOGIN } from '@lib/consts';
import { IconNames } from '@blueprintjs/icons';
import { LOGIN_TEST_ID as TEST_ID } from '@lib/consts/testId';

const DEFAULT_PATH = '/lifelogs';

const Login: React.FC = () => {
  const { authApi: session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { createUser, isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) return navigate(DEFAULT_PATH);
  }, [isLogin, navigate]);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser(email);
    session
      .signIn(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        notify.success(LOGIN.MESSAGE.SUCCESS);
        navigate(DEFAULT_PATH);
      })
      .catch((e) => {
        if (e.response.status === 401)
          notify.error(LOGIN.MESSAGE.ERROR.STATUS_401);
        else notify.error(LOGIN.MESSAGE.ERROR.NORMAL);
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <SessionCard>
      <form onSubmit={handleLogin}>
        <EmailInput
          testId={TEST_ID.EMAIL_INPUT}
          value={email}
          onChange={handleEmailChange}
        />
        <PasswordInput
          testId={TEST_ID.PASSWORD_INPUT}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          data-testid={TEST_ID.BUTTON}
          type="submit"
          intent={Intent.PRIMARY}
          icon={IconNames.LOG_IN}
          text={LOGIN.BUTTON.SUBMIT}
        />
      </form>
      <div className={'links'}>
        <Link className="password-forget-link" to={'/password_forget'}>
          {LOGIN.LINK.PASSWORD_FORGET}
        </Link>
        <Link className="sign-up-link" to={'/sign_up'}>
          {LOGIN.LINK.SIGN_UP}
        </Link>
      </div>
    </SessionCard>
  );
};

export default Login;
