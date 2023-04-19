import {useNavigate} from "react-router-dom"
import {useUser} from "./providers/UserProvider";
import {useEffect, useState} from "react";
import test from "./lib/api/test";

const Hello = () => {
  const { requestHeaders, updateToken, clearUser } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const api = test(requestHeaders());

  useEffect(() => {
    api.hello()
      .then(r => {
        updateToken(r.headers['access-token']); // TODO: トークン更新処理の共通化
        setMessage(r.data.message);
      })
      .catch((r) => {
        if(r.status === 401) clearUser();
        navigate('/');
      });
  },[])

  return(
    <h2>{message}</h2>
  );
};

export default Hello;
