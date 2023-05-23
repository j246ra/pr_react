import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import signUpValidator from '@validators/signUp';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';
import SessionCard from '@presentational/SessionCard';

const SignUp = () => {
  const { removeToken } = useSession();
  const { authApi: session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (signUpValidator(email, password).isInvalid) return;
    session
      .signUp(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        updateUser(email);
        notify.success('アカウント作成に成功しました');
        navigate('/');
      })
      .catch(() => {
        clearUser();
        removeToken();
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <SessionCard>
      <form onSubmit={handleSignUp}>
        <EmailInput value={email} onChange={handleEmailChange} />
        <PasswordInput value={password} onChange={handlePasswordChange} />
        <Button type="submit" intent="primary" icon="new-person" text="登録" />
      </form>
      <div className={'links'}>
        <Link className="password-forget-link" to={'/password_forget'}>
          パスワードを忘れた方
        </Link>
      </div>
    </SessionCard>
  );
};

export default SignUp;
