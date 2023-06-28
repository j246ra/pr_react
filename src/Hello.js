import React from 'react';
import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useUser } from '@providers/UserProvider';
import { useEffect, useState } from 'react';
import { useAuth } from '@providers/AuthApiProvider';
import { useLifelog } from '@providers/LifelogApiProvider';
import { useNavigate } from 'react-router-dom';
import notify from './lib/toast';
import { useSession } from '@providers/SessionProvider';
import LifelogList from '@lifelog/container/LifelogList';
import ContextInput from '@lifelog/presentational/ContextInput';
import { useLifelogs } from '@providers/LifelogProvider';

const Hello = () => {
  const { user, clearUser, isLogin } = useUser();
  const { getToken, removeToken } = useSession();
  const { authApi } = useAuth();
  const { lifelogApi: api } = useLifelog();
  const { createLog } = useLifelogs();
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState('');
  const [context, setContext] = useState('');
  const navigate = useNavigate();
  const cookie = getToken();

  useEffect(() => {
    if (!isLogin()) {
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

  const handleCreateLifelog = (e) => {
    e.preventDefault();
    api
      .create({ context: context })
      .then((r) => {
        setContext('');
        setMessage(`ログ保存成功！！(${r.status})`);
        createLog(r.data);
      })
      .catch((e) => notify.error(e.message));
  };

  const clear = () => {
    clearUser();
    removeToken();
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
          <ContextInput
            onSubmit={handleCreateLifelog}
            value={context}
            onChange={(e) => setContext(e.target.value)}
          />
        </Card>
      </div>
      <LifelogList />
    </div>
  );
};

export default Hello;
