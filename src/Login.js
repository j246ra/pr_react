import React, {useEffect, useState} from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, createUser, updateUser, requestHeaders, isLogin } = useUser();
  const navigate = useNavigate();
  const api = session(requestHeaders());

  useEffect(() => {
    if(isLogin()) return navigate('/')
  },[isLogin, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.token !== '') return;
    createUser(email);
    api.signIn(email, password)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        navigate('/');
      });
  };

  // 仮にここへ実装
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/sign_up');
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <p>uid:{user.uid}</p>
        <p>client:{user.client}</p>
        <p>token:{user.token}</p>
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
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="ログイン"
          />
        </form>
        <form onSubmit={handleSignUp}>
          <Button className="m-4"
                  type="submit"
                  intent={Intent.PRIMARY}
                  icon={IconNames.ADD}
                  text="新規登録"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
