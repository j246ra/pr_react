import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {useNavigate} from "react-router-dom"
import {useUser} from "./providers/UserProvider";
import {useEffect, useState} from "react";
import test from "./lib/api/test";
import session from "./lib/api/session";

const Hello = () => {
  const { user ,requestHeaders, updateToken, clearUser, isLogin } = useUser();
  const [ valid, setValid ] = useState(false)
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const api = test(requestHeaders());
  const authApi = session(requestHeaders());

  useEffect(() => {
    if(!isLogin()) return navigate('/login');
    api.hello()
      .then(r => {
        updateToken(r.headers['access-token']); // TODO: トークン更新処理の共通化
        setMessage(r.data.message);
      })
      .catch((r) => {
        if(r.status === 401) clearUser();
        navigate('/login');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  const handleValidToken = (e) => {
    e.preventDefault();
    authApi.validate()
      .then(r => {
        updateToken(r.headers['access-token'])
        setValid(true);
      })
      .catch(() => clear());
  };

  const clear = () => {
    clearUser();
    setValid(false);
  };

  return(
    <div className="hello">
      <h2>{message}</h2>
      <div className="hello-container">
        <Card elevation={Elevation.TWO} className="hello-card">
          <p>uid:{user.uid}</p>
          <p>client:{user.client}</p>
          <p>token:{user.token}</p>
          <p>{valid ? "検証済み" : "未検証"}</p>
          <form onSubmit={handleValidToken}>
            <Button className="m-4"
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
