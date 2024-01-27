import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { useUser, User } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import accountUpdateValidator from '@validators/accountUpdate';
import { useAuth } from '@providers/AuthApiProvider';
import { UserParams } from '@lib/api/session';
import { EmailInput } from '@session/presentational/EmailInput';
import { PasswordInput } from '@session/presentational/PasswordInput';
import AccountDelete from '@session/container/AccountDelete';
import SessionCard from '@session/presentational/SessionCard';
import notify from '@lib/toast';
import { ACCOUNT_UPDATE } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { ACCOUNT_UPDATE_TEST_ID as TEST_ID } from '@lib/consts/testId';
import SessionForm from '@session/presentational/SessionForm';
import SessionLayout from '@session/SessionLayout';

const AccountUpdate: React.FC = () => {
  const { user, updateUser } = useUser();
  const { authApi } = useAuth();
  const [email, setEmail] = useState((user as User).email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const navigate = useNavigate();

  const handleAccountUpdate = (e: FormEvent) => {
    e.preventDefault();
    const columns = { email, password, passwordConfirmation };
    if (accountUpdateValidator(columns).isInvalid) return;

    let params: UserParams = {};
    if (email !== '') params = { ...params, email };
    if (password !== '') params = { ...params, password };
    authApi
      .updateUser(params)
      .then((r) => {
        if (r.status !== 200) return;
        updateUser(email);
        navigate('/');
      })
      .catch(() => {
        notify.error(ACCOUNT_UPDATE.MESSAGE.ERROR);
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordConfirmation(e.target.value);

  return (
    <SessionLayout>
      <SessionCard>
        <SessionForm onSubmit={handleAccountUpdate}>
          <EmailInput
            testId={TEST_ID.EMAIL_INPUT}
            value={email}
            onChange={handleEmailChange}
            required={false}
          />
          <PasswordInput
            testId={TEST_ID.PASSWORD_INPUT}
            value={password}
            onChange={handlePasswordChange}
            required={false}
          />
          <PasswordInput
            id={ACCOUNT_UPDATE.PASSWORD_CONFIRM.ID}
            testId={TEST_ID.PASSWORD_CONFIRM_INPUT}
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            label={ACCOUNT_UPDATE.PASSWORD_CONFIRM.LABEL}
            placeholder={ACCOUNT_UPDATE.PASSWORD_CONFIRM.PLACEHOLDER}
            required={false}
          />
          <Button
            data-testid={TEST_ID.BUTTON}
            type="submit"
            intent={Intent.PRIMARY}
            icon={IconNames.FLOPPY_DISK}
            text={ACCOUNT_UPDATE.BUTTON.SUBMIT}
            fill={true}
          />
        </SessionForm>
        <AccountDelete />
      </SessionCard>
    </SessionLayout>
  );
};

export default AccountUpdate;
