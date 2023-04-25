import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, FormGroup, InputGroup, Card, Elevation } from '@blueprintjs/core';
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";
import signUpValidator from "./validators/signUp";
import AppToaster from "./lib/toaster";

const toaster = AppToaster();

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { clearUser, updateUser, requestHeaders } = useUser();
  const navigate = useNavigate();
  const api = session(requestHeaders());

  const handleSignUp = (e) => {
    e.preventDefault();
    if(signUpValidator(email, password).isInvalid) return;
    api.signUp(email, password)
      .then(r => {
        if (r.status !== 200) return;
        clearUser();
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        toaster.show({icon: 'info-sign', intent: "success", message: "アカウント作成に成功しました"});
        navigate('/');
      })
      .catch(e => {
        clearUser();
        if(e.response === undefined){
          toaster.show({icon: 'error', intent: "danger", message: `想定外のサーバーが発生しました (${e.message})`});
        }else{
          e.response.data.errors.fullMessages.forEach((message)=>{
            toaster.show({icon: 'error', intent: "danger", message});
          });
        }
    });
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
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
        <div className={"links"}>
          <Link className="password-forget-link" to={'/password_forget'}>パスワードを忘れた方</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
