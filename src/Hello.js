import './Hello.css';
import { Button, Intent, Card, Elevation } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import {useLoaderData} from "react-router-dom"
import {useUser} from "./providers/UserProvider";
import {useEffect, useState} from "react";
import {useAuth} from "./providers/AuthApiProvider";

const Hello = () => {
  const { user , clearUser } = useUser();
  const { authApi } = useAuth();
  const [ valid, setValid ] = useState(false)
  const [message, setMessage] = useState('');

  const response = useLoaderData();
  useEffect(()=>{
    setMessage(response.message);
  },[response.message])

  const handleValidToken = (e) => {
    e.preventDefault();
    authApi.validate()
      .then(() => {
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
