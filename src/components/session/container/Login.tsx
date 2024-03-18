import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Callout, H2, Intent } from '@blueprintjs/core';
import EmailInput from '@session/presentational/EmailInput';
import PasswordInput from '@session/presentational/PasswordInput';
import SessionCard from '@session/presentational/SessionCard';
import { LOGIN } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { LOGIN_TEST_ID as TEST_ID } from '@lib/consts/testId';
import SessionOtherLinks from '@session/presentational/SessionOtherLinks';
import SessionForm from '@session/presentational/SessionForm';
import SessionLayout from '@session/SessionLayout';
import styles from './Login.module.scss';
import useAccount from '@src/hooks/useAccount';

export default function Login() {
  const { login } = useAccount();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <SessionLayout>
      <H2 className={styles.appTitle}>LIFELOG</H2>
      <Callout className={styles.infoContext}>
        このサイトは日常の出来事を記録し振り返るためのライフログアプリです。
        <br />
        Reactを習得するためにこのWebアプリを制作しました。
      </Callout>
      <SessionCard>
        <SessionForm onSubmit={handleLogin}>
          <EmailInput
            testId={TEST_ID.EMAIL_INPUT}
            value={email}
            onChange={handleEmailChange}
          />
          <PasswordInput
            testId={TEST_ID.PASSWORD_INPUT}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            data-testid={TEST_ID.BUTTON}
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.LOG_IN}
            text={LOGIN.BUTTON.SUBMIT}
            fill={true}
          />
        </SessionForm>
        <SessionOtherLinks passwordForgetEnabled={true} signUpEnabled={true} />
      </SessionCard>
    </SessionLayout>
  );
}
