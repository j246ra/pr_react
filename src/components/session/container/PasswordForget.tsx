import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Button, Callout, Intent } from '@blueprintjs/core';
import notify from '@lib/toast';
import { useAuth } from '@providers/AuthApiProvider';
import { EmailInput } from '@session/presentational/EmailInput';
import { useNavigate } from 'react-router-dom';
import SessionCard from '@session/presentational/SessionCard';
import { PASSWORD_FORGET } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { PASSWORD_FORGET_TEST_ID as TEST_ID } from '@lib/consts/testId';

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
      <Callout
        className="session-callout"
        icon={IconNames.INFO_SIGN}
        intent={Intent.PRIMARY}
      >
        {PASSWORD_FORGET.MESSAGE.INFO}
      </Callout>
      <form onSubmit={handlePasswordForget}>
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
        />
      </form>
    </SessionCard>
  );
};

export default PasswordForget;
