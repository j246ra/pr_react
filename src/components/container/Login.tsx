import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/AuthApiProvider';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';
import SessionCard from '@presentational/SessionCard';

const DEFAULT_PATH = '/lifelogs';

const Login: React.FC = () => {
  const { createToken } = useSession();
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
    createToken(email);
    session
      .signIn(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        notify.success('ログイン成功');
        navigate(DEFAULT_PATH);
      })
      .catch((e) => {
        let message = '認証に失敗しました。';
        if (e.response.status === 401)
          message = '認証に失敗しました。IDとパスワードをご確認ください。';
        notify.error(message);
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
        <EmailInput value={email} onChange={handleEmailChange} />
        <PasswordInput value={password} onChange={handlePasswordChange} />
        <Button type="submit" intent="primary" icon="log-in" text="ログイン" />
      </form>
      <div className={'links'}>
        <Link className="password-forget-link" to={'/password_forget'}>
          パスワードを忘れた方
        </Link>
        <Link className="sign-up-link" to={'/sign_up'}>
          新規登録
        </Link>
      </div>
    </SessionCard>
  );
};

export default Login;
