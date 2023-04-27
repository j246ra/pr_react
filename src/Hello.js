import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {useNavigate} from "react-router-dom"
import {useUser} from "./providers/UserProvider";
import {useState} from "react";
import test from "./lib/api/test";
import {useInitialize} from "./hooks/useInitialize";

const Hello = () => {
  const { user ,requestHeaders, updateToken, clearUser, isLogin, api: authApi } = useUser();
  const [ valid, setValid ] = useState(false)
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const api = test(requestHeaders());

  useInitialize(() => {
    if (!isLogin()) return navigate('/login');
    api.hello()
      .then(r => {
        updateToken(r.headers['access-token']); // TODO: トークン更新処理の共通化
        setMessage(r.data.message);
      })
      .catch((r) => {
        if (r.status === 401) clearUser();
        navigate('/login');
      });
    }, [isLogin, navigate, api, updateToken, setMessage, clearUser]);

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
      <h2 style={{textAlign: 'center'}}>{message}</h2>
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
