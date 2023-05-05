import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import { useUser } from './providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import session from './lib/api/session';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { createUser, updateUser, clearUser, isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin()) return navigate('/hello');
  }, [isLogin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    clearUser();
    createUser(email);
    session()
      .signIn(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        updateUser(
          email,
          r.headers['uid'],
          r.headers['client'],
          r.headers['access-token']
        );
        navigate('/');
        toast.success('ログイン成功');
      })
      .catch((e) => {
        const props = {
          icon: 'error',
          intent: 'danger',
          message: '認証に失敗しました。',
        };
        if (e.response.status === 401) {
          props.message =
            '認証に失敗しました。IDとパスワードをご確認ください。';
        }
        toast.error(props.message, { style: { color: 'red' } });
      });
  };

  return (
    <div className="session-container">
      <Card elevation="2" className="session-card">
        <form onSubmit={handleLogin}>
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
            icon="log-in"
            text="ログイン"
          />
        </form>
        <div className={'links'}>
          <Link className="password-forget-link" to={'/password_forget'}>
            パスワードを忘れた方
          </Link>
          <Link className="sign-up-link" to={'/sign_up'}>
            新規登録
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
