import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { authSignIn, validateToken } from "./lib/api/test";
import { useUser } from "./providers/UserProvider"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, createUser, updateUser, toValid, loginHeader } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    if (user.token !== '') return;
    createUser(email);
    authSignIn(email, password)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
      });
  };

  const checkToken = (e) => {
    e.preventDefault();
    validateToken(loginHeader()).then(toValid());
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <p>uid:{user.uid}</p>
        <p>client:{user.client}</p>
        <p>token:{user.token}</p>
        <p>{user.valid ? "検証済み" : "未検証"}</p>
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
        <form onSubmit={checkToken}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="トークン検証"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
