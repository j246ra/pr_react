import {useNavigate} from "react-router-dom"
import {useUser} from "./providers/UserProvider";
import {hello} from "./lib/api/auth";
import {useEffect, useState} from "react";

const Hello = () => {
  const { requestHeaders, updateToken, clearUser } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(()=>{
    hello(requestHeaders())
      .then(r => {
        updateToken(r.headers['access-token']); // TODO: トークン更新処理の共通化
        setMessage(r.data.message);
      })
      .catch((r) => {
        if(r.status === 401) clearUser();
        navigate('/');
      });
    },[]);

  return(
    <h2>{message}</h2>
  );
};

export default Hello;
