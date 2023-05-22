import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import signUpValidator from '@validators/signUp';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';

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
      .catch((e) => {
        clearUser();
        removeToken();
        if (e.response === undefined) {
          notify.error(`想定外のサーバーが発生しました (${e.message})`);
        } else {
          e.response.data.errors.fullMessages.forEach((message: string) => {
            notify.error(message);
          });
        }
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="session-container">
      <Card elevation={2} className="session-card">
        {
          <form onSubmit={handleSignUp}>
            <EmailInput value={email} onChange={handleEmailChange} />
            <PasswordInput value={password} onChange={handlePasswordChange} />
            <Button
              type="submit"
              intent="primary"
              icon="new-person"
              text="登録"
            />
          </form>
        }
        <div className={'links'}>
          <Link className="password-forget-link" to={'/password_forget'}>
            パスワードを忘れた方
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
