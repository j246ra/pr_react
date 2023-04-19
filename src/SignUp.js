import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { clearUser, updateUser, requestHeaders } = useUser();
  const navigate = useNavigate();
  const api = session(requestHeaders());

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO 入力チェック
    api.signUp(email, password)
      .then(r => {
        if (r.status !== 200) return;
        clearUser();
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        navigate('/');
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
              intent={Intent.PRIMARY}
              icon={IconNames.KEY}
              text="登録"
            />
          </form>
        }
      </Card>
    </div>
  );
};

export default SignUp;
