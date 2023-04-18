import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {updateAccount} from "./lib/api/auth";
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";

const AccountUpdate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { updateUser, requestHeaders } = useUser();
  const navigate = useNavigate();

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    // TODO 入力チェック
    updateAccount(requestHeaders(), email, password)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        navigate('/');
      });
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        {
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
        }
      </Card>
    </div>
  );
};

export default AccountUpdate;
