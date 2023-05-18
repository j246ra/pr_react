import React from 'react';
import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from './providers/UserProvider';
import { useEffect, useState } from 'react';
import { useAuth } from './providers/AuthApiProvider';
import { useLifelog } from './providers/LifelogApiProvider';
import { useNavigate } from 'react-router-dom';
import notify from './lib/toast';
import { useCookies } from 'react-cookie/cjs';

const Hello = () => {
  const { user, clearUser, isLogin } = useUser();
  const [cookies] = useCookies();
  const [cookie] = useState({
    token: cookies.token['access-token'],
    uid: cookies.token.uid,
    client: cookies.token.client,
  });
  const { authApi } = useAuth();
  const { lifelogApi: api } = useLifelog();
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin()) {
      notify.error('ログインしてください。');
      return navigate('/login');
    }
    api
      .hello()
      .then((r) => setMessage(r.data.message))
      .catch((e) => {
        notify.error(e.message);
      });
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
    setValid(false);
  };

  return (
    <div className="hello">
      <h2 style={{ textAlign: 'center' }}>{message}</h2>
      <div className="hello-container">
        <Card elevation={Elevation.TWO} className="hello-card">
          <p>email: {user.email}</p>
          <p>client: {cookie.client}</p>
          <p>token: {cookie.token}</p>
          <p>{valid ? '検証済み' : '未検証'}</p>
          <form onSubmit={handleValidToken}>
            <Button
              className="m-4"
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
};

export default Hello;
