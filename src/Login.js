import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import "./Login.scss";
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";
import AppToaster from "./lib/toaster";

const toaster = AppToaster();

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
        toaster.show({icon: 'info-sign', intent: Intent.SUCCESS, message: "ログイン成功"});
      })
      .catch((e) => {
        const props = {
          icon: "error",
          intent: Intent.DANGER,
          message: "認証に失敗しました。",
        }
        if (e.response.status === 401){
          props.message = "認証に失敗しました。IDとパスワードをご確認ください。";
        }
        toaster.show(props);
      });
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
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
            icon="log-in"
            text="ログイン"
          />
        </form>
        <div className={"links"}>
          <Link className="password-forget-link" to={'/password_forget'}>パスワードを忘れた方</Link>
          <Link className="sign-up-link" to={'/sign_up'}>新規登録</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
