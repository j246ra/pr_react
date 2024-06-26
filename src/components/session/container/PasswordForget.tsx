import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import EmailInput from '@session/presentational/EmailInput';
import SessionCard from '@session/presentational/SessionCard';
import { PASSWORD_FORGET } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { PASSWORD_FORGET_TEST_ID as TEST_ID } from '@lib/consts/testId';
import styles from './PasswordForget.module.scss';
import SessionForm from '@session/presentational/SessionForm';
import SessionLayout from '@session/SessionLayout';
import useAccount from '@src/hooks/useAccount';

export default function PasswordForget() {
  const { passwordForget } = useAccount();
  const [email, setEmail] = useState<string>('');

  const handlePasswordForget = (e: FormEvent) => {
    e.preventDefault();
    passwordForget(email);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <SessionLayout>
      <Callout
        className={styles.sessionCallout}
        icon={IconNames.INFO_SIGN}
        intent={Intent.PRIMARY}
      >
        {PASSWORD_FORGET.MESSAGE.INFO}
      </Callout>
      <SessionCard>
        <SessionForm onSubmit={handlePasswordForget}>
          <EmailInput
            testId={TEST_ID.EMAIL_INPUT}
            value={email}
            placeholder={PASSWORD_FORGET.EMAIL_INPUT.PLACEHOLDER}
            onChange={handleEmailChange}
          />
          <Button
            data-testid={TEST_ID.BUTTON}
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.ENVELOPE}
            text={PASSWORD_FORGET.BUTTON.SUBMIT}
            fill={true}
          />
        </SessionForm>
      </SessionCard>
    </SessionLayout>
  );
}
