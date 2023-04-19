import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {deleteUser, signIn, signOut, validateToken} from "./lib/api/auth";
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);
  const { user, createUser, updateUser, updateToken, toValid, clearUser, requestHeaders } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    if (user.token !== '') return;
    createUser(email);
    signIn(email, password)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
      });
  };

  const checkToken = (e) => {
    e.preventDefault();
    validateToken(requestHeaders())
      .then(r => {
        updateToken(r.headers['access-token'])
        setValid(true);
      })
      .catch(() => clear());
  };

  const signUp = (e) => {
    e.preventDefault();
    navigate('sign_up');
  };

  const updateAccount = (e) => {
    e.preventDefault();
    navigate('update_account');
  };

  const logout = (e) => {
    e.preventDefault();
    signOut(requestHeaders())
      .then(r => {
        clear();
      })
      .catch(() => clear());
  };

  const deleteAccount = (e) => {
    e.preventDefault();
    deleteUser(requestHeaders())
      .then(r => {
        clear();
      })
      .catch(() => clear());
  }

  const redirectToHello = (e) => {
    e.preventDefault();
    navigate("/hello")
  };

  const clear = () => {
    clearUser();
    setValid(false);
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <p>uid:{user.uid}</p>
        <p>client:{user.client}</p>
        <p>token:{user.token}</p>
        <p>{valid ? "検証済み" : "未検証"}</p>
        {
          (user.email === '') &&
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
        }
        <form onSubmit={checkToken}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="トークン検証"
          />
        </form>
        <form onSubmit={logout}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="ログアウト"
          />
        </form>
        <form onSubmit={signUp}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="新規登録"
          />
        </form>
        <form onSubmit={updateAccount}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="アカウント更新"
          />
        </form>
        <form onSubmit={deleteAccount}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="削除"
          />
        </form>
        <form onSubmit={redirectToHello}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="ハロー＾＾"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
