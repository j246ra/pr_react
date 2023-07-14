import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Callout } from '@blueprintjs/core';
import notify from '@lib/toast';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@presentational/EmailInput';
import { useNavigate } from 'react-router-dom';
import SessionCard from '@presentational/SessionCard';

const PasswordForget: React.FC = () => {
  const { authApi: session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handlePasswordForget = (e: FormEvent) => {
    e.preventDefault();
    session
      .passwordForget(email)
      .then(() => {
        notify.success('パスワードリセットメールを送信しました。');
        navigate('/send_success');
      })
      .catch((e) => {
        if (e?.response.status === 404) {
          notify.success('パスワードリセットメールを送信しました。');
        } else {
          notify.error('送信に失敗しました。');
        }
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <SessionCard>
      <Callout className="session-callout" icon="info-sign" intent="primary">
        パスワードリセットメールの送信先を入力してください。
      </Callout>
      <form onSubmit={handlePasswordForget}>
        <EmailInput
          id={'password-forget-email-input'}
          value={email}
          placeholder={'送信先のメールドレスを入力'}
          onChange={handleEmailChange}
        />
        <Button
          data-testid={'password-forget-submit-button'}
          type="submit"
          intent="primary"
          icon="envelope"
          text="送信"
        />
      </form>
    </SessionCard>
  );
};

export default PasswordForget;
