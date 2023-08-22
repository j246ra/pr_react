import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import notify from '@lib/toast';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@presentational/EmailInput';
import { useNavigate } from 'react-router-dom';
import SessionCard from '@presentational/SessionCard';
import { PASSWORD_FORGET } from '@lib/consts';
import { IconNames } from '@blueprintjs/icons';

const PasswordForget: React.FC = () => {
  const { authApi: session } = useAuth();
  const [email, setEmail] = useState<string>('');
  const navigate = useNavigate();

  const handlePasswordForget = (e: FormEvent) => {
    e.preventDefault();
    session
      .passwordForget(email)
      .then(() => {
        notify.success(PASSWORD_FORGET.MESSAGE.SUCCESS);
        navigate('/send_success');
      })
      .catch((e) => {
        if (e?.response.status === 404) {
          notify.success(PASSWORD_FORGET.MESSAGE.SUCCESS);
        } else {
          notify.error(PASSWORD_FORGET.MESSAGE.ERROR);
        }
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  return (
    <SessionCard>
      <Callout className="session-callout" icon="info-sign" intent="primary">
        {PASSWORD_FORGET.MESSAGE.INFO}
      </Callout>
      <form onSubmit={handlePasswordForget}>
        <EmailInput
          id={'password-forget-email-input'}
          value={email}
          placeholder={PASSWORD_FORGET.EMAIL_INPUT.PLACEHOLDER}
          onChange={handleEmailChange}
        />
        <Button
          data-testid={'password-forget-submit-button'}
          type="submit"
          intent={Intent.PRIMARY}
          icon={IconNames.ENVELOPE}
          text={PASSWORD_FORGET.BUTTON.SUBMIT}
        />
      </form>
    </SessionCard>
  );
};

export default PasswordForget;
