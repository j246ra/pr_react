import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import signUpValidator from '@validators/signUp';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import EmailInput from '@session/presentational/EmailInput';
import PasswordInput from '@session/presentational/PasswordInput';
import SessionCard from '@session/presentational/SessionCard';
import { SIGN_UP } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { SIGN_UP_TEST_ID as TEST_ID } from '@lib/consts/testId';
import SessionOtherLinks from '@session/presentational/SessionOtherLinks';
import SessionForm from '@session/presentational/SessionForm';
import SessionLayout from '@session/SessionLayout';

export default function SignUp() {
  const { removeHeaders } = useSession();
  const { authApi: session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { clearUser, updateUser } = useUser();
  const navigate = useNavigate();

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (signUpValidator(email, password).isInvalid) return;
    session
      .signUp(email, password)
      .then((r) => {
        if (r.status !== 200) return;
        updateUser(email);
        notify.success(SIGN_UP.MESSAGE.SUCCESS);
        navigate('/');
      })
      .catch(() => {
        clearUser();
        removeHeaders();
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <SessionLayout>
      <SessionCard>
        <SessionForm onSubmit={handleSignUp} data-testid={TEST_ID.FORM}>
          <EmailInput
            id={TEST_ID.EMAIL_INPUT}
            value={email}
            onChange={handleEmailChange}
          />
          <PasswordInput
            id={TEST_ID.PASSWORD_INPUT}
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            data-testid={TEST_ID.BUTTON}
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.NEW_PERSON}
            text={SIGN_UP.BUTTON.SUBMIT}
            fill={true}
          />
        </SessionForm>
        <SessionOtherLinks signUpEnabled={true} />
      </SessionCard>
    </SessionLayout>
  );
}
