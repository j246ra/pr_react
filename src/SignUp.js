import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import { useUser } from './providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import signUpValidator from './validators/signUp';
import toast from 'react-hot-toast';
import session from './lib/api/session';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (signUpValidator(email, password).isInvalid) return;
    session()
      .signUp(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        clearUser();
        updateUser(
          email,
          r.headers['uid'],
        );
        toast.success('アカウント作成に成功しました');
        navigate('/');
      })
      .catch((e) => {
        clearUser();
        if (e.response === undefined) {
          toast.error(`想定外のサーバーが発生しました (${e.message})`, {
            style: { color: 'red' },
          });
        } else {
          e.response.data.errors.fullMessages.forEach((message) => {
            toast.error(message, { style: { color: 'red' } });
          });
        }
      });
  };

  return (
    <div className="session-container">
      <Card elevation="2" className="session-card">
        {
          <form onSubmit={handleSignUp}>
            <FormGroup
              label="メールアドレス"
              labelFor="email-input"
              labelInfo="(必須)"
            >
              <InputGroup
                id="email-input"
                placeholder="メールアドレスを入力"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup
              label="パスワード"
              labelFor="password-input"
              labelInfo="(必須)"
            >
              <InputGroup
                id="password-input"
                placeholder="パスワードを入力"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
            <Button
              type="submit"
              intent="primary"
              icon="new_person"
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
