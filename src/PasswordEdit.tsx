import React, { FormEvent, useEffect, useState } from 'react';
import { Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import { Headers } from './providers/SessionProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import passwordEditValidator from './validators/passwordEdit';
import notify from './lib/toast';
import { useSession } from './providers/SessionProvider';
import { useAuth } from './providers/AuthApiProvider';

const PasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useSession();
  const { authApi: api } = useAuth();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [params] = useSearchParams();
  useEffect(() => {
    const headers: Headers = {
      'access-token': params.get('access-token') || undefined,
      client: params.get('client') || undefined,
      uid: params.get('uid') || undefined,
    };
    setToken(headers);
  }, [params]);

  const handlePasswordConfirmation = (e: FormEvent) => {
    e.preventDefault();
    if (passwordEditValidator(password, passwordConfirmation).isInvalid) return;
    api
      .passwordReset(password, passwordConfirmation)
      .then(() => {
        notify.success('パスワードリセットが成功しました。');
        navigate('/');
      })
      .catch(() => {
        notify.error('パスワードリセットに失敗しました。');
      });
  };

  return (
    <div className="session-container">
      <Card elevation={2} className="session-card">
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
