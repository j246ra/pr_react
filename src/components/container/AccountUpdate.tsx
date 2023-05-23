import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from '@blueprintjs/core';
import { useUser, User } from '@providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import accountUpdateValidator from '@validators/accountUpdate';
import { useAuth } from '@providers/AuthApiProvider';
import { UserParams } from '@lib/api/session';
import { EmailInput } from '@presentational/EmailInput';
import { PasswordInput } from '@presentational/PasswordInput';
import AccountDelete from '@container/AccountDelete';
import SessionCard from '@presentational/SessionCard';

const AccountUpdate: React.FC = () => {
  const { user, updateUser } = useUser();
  const { authApi } = useAuth();
  const [email, setEmail] = useState((user as User).email);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAccountUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (accountUpdateValidator(email, password).isInvalid) return;
    let params: UserParams = {};
    if (email !== '') params = { ...params, email };
    if (password !== '') params = { ...params, password };
    authApi.updateUser(params).then((r) => {
      if (r.status !== 200) return;
      updateUser(email);
      navigate('/');
    });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <SessionCard>
      <form onSubmit={handleAccountUpdate}>
        <EmailInput
          value={email}
          onChange={handleEmailChange}
          required={false}
        />
        <PasswordInput
          value={password}
          onChange={handlePasswordChange}
          required={false}
        />
        <Button type="submit" intent="primary" icon="floppy-disk" text="更新" />
      </form>
      <AccountDelete />
    </SessionCard>
  );
};

export default AccountUpdate;
