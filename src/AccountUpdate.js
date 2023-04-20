import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";

const AccountUpdate = () => {
  const {user, updateUser, requestHeaders, clearUser } = useUser();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const api = session(requestHeaders());

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    // TODO 入力チェック
    api.updateUser(email, password)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        navigate('/');
      });
  };

  const handleAccountDelete = (e) => {
    e.preventDefault();
    api.deleteUser(requestHeaders())
      .finally(()=> {
        clearUser();
        navigate('/login');
      });
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <form onSubmit={handleAccountUpdate}>
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
            text="更新"
          />
        </form>
        <form onSubmit={handleAccountDelete}>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="削除"
          />
        </form>

      </Card>
    </div>
  );
};

export default AccountUpdate;
