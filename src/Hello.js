import React from 'react';
import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from '@providers/UserProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@providers/AuthApiProvider';
import { useNavigate } from 'react-router-dom';
import notify from './lib/toast';
import { useSession } from '@providers/SessionProvider';

export default function Hello() {
  const { user, clearUser, isLoggedIn } = useUser();
  const { getHeaders, removeHeaders } = useSession();
  const { authApi } = useAuth();
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const cookie = getHeaders();

  useEffect(() => {
    if (!isLoggedIn()) {
      notify.error('ログインしてください。');
      return navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValidToken = (e) => {
    e.preventDefault();
    authApi
      .validate()
      .then(() => {
        setValid(true);
      })
      .catch(() => clear());
  };

  const clear = () => {
    clearUser();
    removeHeaders();
    setValid(false);
  };

  return (
    <div className="hello">
      <div className="hello-container">
        <Card elevation={Elevation.TWO} className="hello-card">
          <p>email: {user.email}</p>
          <p>client: {cookie.client}</p>
          <p>token: {cookie['access-token']}</p>
          <p>{valid ? '検証済み' : '未検証'}</p>
          <form onSubmit={handleValidToken}>
            <Button
              style={{ margin: '4px' }}
              type="submit"
              intent={Intent.PRIMARY}
              icon={IconNames.TICK}
              text="トークン検証"
            />
          </form>
        </Card>
      </div>
    </div>
  );
}
