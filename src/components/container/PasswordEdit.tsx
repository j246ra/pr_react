import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Intent } from '@blueprintjs/core';
import { Headers } from '@providers/SessionProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import passwordEditValidator from '@validators/passwordEdit';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import SessionCard from '@presentational/SessionCard';
import { PasswordInput } from '@presentational/PasswordInput';
import { PASSWORD_EDIT } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';

const PasswordEdit: React.FC = () => {
  const navigate = useNavigate();
  const { setHeaders } = useSession();
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
    setHeaders(headers);
  }, [params]);

  const handlePasswordConfirmation = (e: FormEvent) => {
    e.preventDefault();
    if (passwordEditValidator(password, passwordConfirmation).isInvalid) return;
    api
      .passwordReset(password, passwordConfirmation)
      .then(() => {
        notify.success(PASSWORD_EDIT.MESSAGE.SUCCESS);
        navigate('/');
      })
      .catch(() => {
        notify.error(PASSWORD_EDIT.MESSAGE.ERROR);
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
        />
      </form>
    </SessionCard>
  );
};

export default PasswordEdit;
