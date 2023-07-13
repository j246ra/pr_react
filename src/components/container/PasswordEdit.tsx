import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from '@blueprintjs/core';
import { Headers } from '@providers/SessionProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import passwordEditValidator from '@validators/passwordEdit';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import SessionCard from '@presentational/SessionCard';
import { PasswordInput } from '@presentational/PasswordInput';

const PasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const { setToken } = useSession();
  const { authApi: api } = useAuth();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [params] = useSearchParams();
  useEffect(() => {
    const headers: Headers = {
      accessToken: params.get('accessToken') || undefined,
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

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  return (
    <SessionCard>
      <form onSubmit={handlePasswordConfirmation}>
        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          placeholder={'新しいパスワードを入力'}
        />
        <PasswordInput
          value={passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          id={'password-input-confirmation'}
          label={'パスワード（確認用）'}
          placeholder={'新しいパスワードを入力（確認用）'}
        />
        <Button
          type="submit"
          intent="primary"
          icon="key"
          text="パスワード変更"
        />
      </form>
    </SessionCard>
  );
};

export default PasswordEdit;
