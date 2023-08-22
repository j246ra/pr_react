import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { useUser } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import signUpValidator from '@validators/signUp';
import notify from '@lib/toast';
import { useSession } from '@providers/SessionProvider';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';
import SessionCard from '@presentational/SessionCard';
import { SIGN_UP } from '@lib/consts';
import { IconNames } from '@blueprintjs/icons';

const SignUp = () => {
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
    <SessionCard>
      <form onSubmit={handleSignUp} data-testid={'sign-up-form'}>
        <EmailInput
          id={'sign-up-email-input'}
          value={email}
          onChange={handleEmailChange}
        />
        <PasswordInput
          id={'sign-up-password-input'}
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          data-testid={'sign-up-button'}
          type="submit"
          intent={Intent.PRIMARY}
          icon={IconNames.NEW_PERSON}
          text={SIGN_UP.BUTTON.SUBMIT}
        />
      </form>
      <div className={'links'}>
        <Link className="password-forget-link" to={'/password_forget'}>
          {SIGN_UP.LINK.PASSWORD_FORGET}
        </Link>
      </div>
    </SessionCard>
  );
};

export default SignUp;
