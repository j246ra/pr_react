import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import session from './lib/api/session';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import passwordEditValidator from './validators/passwordEdit';

const PasswordEdit = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  let [params] = useSearchParams();
  const api = session({
    'access-token': params.get('access-token'),
    client: params.get('client'),
    uid: params.get('uid'),
  });

  const handlePasswordConfirmation = (e) => {
    e.preventDefault();
    if (passwordEditValidator(password, passwordConfirmation).isInvalid) return;
    api
      .passwordReset(password, passwordConfirmation)
      .then(() => {
        toast.success('パスワードリセットが成功しました。');
        navigate('/');
      })
      .catch(() => {
        toast.error('パスワードリセットに失敗しました。', {
          style: { color: 'red' },
        });
      });
  };

  return (
    <div className="session-container">
      <Card elevation="2" className="session-card">
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
            intent="primary"
            icon="key"
            text="パスワード変更"
          />
        </form>
      </Card>
    </div>
  );
};

export default PasswordEdit;
