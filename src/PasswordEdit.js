import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import AppToaster from "./lib/toaster";
import session from "./lib/api/session";
import './PasswordEdit.scss';
import { useNavigate, useSearchParams } from "react-router-dom";

const toaster = AppToaster();

const PasswordEdit = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  let [params] = useSearchParams();
  const headers = {
    "access-token": params.get("access-token"),
    client: params.get("client"),
    uid: params.get("uid"),
  }
  const api = session(headers);

  const handlePasswordConfirmation = (e) => {
    e.preventDefault();
    if(password !== passwordConfirmation){
      return toaster.show({icon: 'error', intent: 'danger', message: '入力したパスワードが一致しません。'});
    }
    api.passwordReset(password, passwordConfirmation)
      .then(r => {
        toaster.show({icon: 'info-sign', intent: "success", message: "パスワードリセットが成功しました。"});
        navigate("/");
      })
      .catch(e => {
        toaster.show({icon: "error", intent: "danger", message: "パスワードリセットに失敗しました。"});
      });
  };

  return (
    <div className="password-edit-container">
      <Card elevation={Elevation.TWO} className="password-edit-card">
        <form onSubmit={handlePasswordConfirmation}>
          <FormGroup
            label="パスワード"
            labelFor="password-input"
            labelInfo="(必須)"
          >
            <InputGroup
              id="password-input"
              placeholder="新しいパスワードを入力"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup
            label="パスワード（確認用）"
            labelFor="password-input-confirmation"
            labelInfo="(必須)"
          >
            <InputGroup
              id="password-input-confirmation"
              placeholder="新しいパスワードを入力"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </FormGroup>
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text="パスワード変更"
          />
        </form>
      </Card>
    </div>
  );
};

export default PasswordEdit;
