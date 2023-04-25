import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import AppToaster from "./lib/toaster";
import session from "./lib/api/session";
import './PasswordForget.scss';

const toaster = AppToaster();

const PasswordForget = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const api = session();

  const handlePasswordForget = (e) => {
    e.preventDefault();
    api.passwordForget(email)
      .then(r => {
        toaster.show({icon: 'info-sign', intent: "success", message: "パスワードリセットメールを送信しました。"});
        setSuccess(true); //todo 成功画面は別途作成する
      })
      .catch(e => {
        toaster.show({icon: "error", intent: "danger", message: "送信に失敗しました。"});
      });
  };

  return (
    <div className="mail-send-container">
      { success ? <h3>送信に成功しました。メールをご確認ください。</h3> :
        <Card elevation={Elevation.TWO} className="mail-send-card">
          <form onSubmit={handlePasswordForget}>
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
        </Card>
      }
    </div>
  );
};

export default PasswordForget;
