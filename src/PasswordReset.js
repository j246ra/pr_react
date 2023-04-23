import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useNavigate } from "react-router-dom";
import AppToaster from "./lib/toaster";

const toaster = AppToaster();

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    toaster.show({icon: 'info-sign', message: "未実装"});
    navigate('/');
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        {
          <form onSubmit={handlePasswordReset}>
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
            <Button
              type="submit"
              intent={Intent.PRIMARY}
              icon={IconNames.KEY}
              text="送信"
            />
          </form>
        }
      </Card>
    </div>
  );
};

export default PasswordReset;
