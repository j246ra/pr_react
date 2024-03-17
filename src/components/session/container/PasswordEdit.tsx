import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import SessionCard from '@session/presentational/SessionCard';
import PasswordInput from '@session/presentational/PasswordInput';
import { PASSWORD_EDIT } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import SessionForm from '@session/presentational/SessionForm';
import SessionLayout from '@session/SessionLayout';
import useAccount from '@src/hooks/useAccount';
import useSearchParamsForHeaders from '@src/hooks/useSearchParamsForHeaders';

export default function PasswordEdit() {
  useSearchParamsForHeaders();
  const { passwordChange } = useAccount();
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handlePasswordConfirmation = (e: FormEvent) => {
    e.preventDefault();
    passwordChange(password, passwordConfirmation);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  return (
    <SessionLayout>
      <SessionCard>
        <SessionForm onSubmit={handlePasswordConfirmation}>
          <PasswordInput
            value={password}
            onChange={handlePasswordChange}
            placeholder={PASSWORD_EDIT.PASSWORD_INPUT.PLACEHOLDER}
          />
          <PasswordInput
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            id={'password-input-confirmation'}
            label={PASSWORD_EDIT.PASSWORD_CONFIRM.LABEL}
            placeholder={PASSWORD_EDIT.PASSWORD_CONFIRM.PLACEHOLDER}
          />
          <Button
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.KEY}
            text={PASSWORD_EDIT.BUTTON.SUBMIT}
            fill={true}
          />
        </SessionForm>
      </SessionCard>
    </SessionLayout>
  );
}
