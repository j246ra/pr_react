import React, { useState } from 'react';
import { Alert, Button, FormGroup, InputGroup, Card, Elevation } from '@blueprintjs/core';
import { useUser } from "./providers/UserProvider"
import { useNavigate } from "react-router-dom";
import session from "./lib/api/session";
import accountUpdateValidator from "./validators/accountUpdateValidator";

const AccountUpdate = () => {
  const {user, updateUser, requestHeaders, clearUser } = useUser();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const api = session(requestHeaders());

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    if(accountUpdateValidator(email, password).isInvalid) return;
    let params = { };
    if(email !== '') params = { ...params, email };
    if(password !== '') params = { ...params, password };
    api.updateUser(params)
      .then(r => {
        if (r.status !== 200) return;
        updateUser(email, r.headers['uid'], r.headers['client'], r.headers['access-token']);
        navigate('/');
      });
  };

  const handleOpenAlert = () => {
    setIsOpen(true);
  };
  const handleCloseAlert = () => {
    setIsOpen(false);
  };
  const handleAccountDelete = (e) => {
    e.preventDefault();
    api.deleteUser(requestHeaders())
      .finally(()=> {
        clearUser();
        handleCloseAlert();
        navigate('/login');
      });
  };

  return (
    <div className="login-container">
      <Card elevation={Elevation.TWO} className="login-card">
        <form onSubmit={handleAccountUpdate}>
          <FormGroup
            label="メールアドレス"
            labelFor="email-input"
          >
            <InputGroup
              id="email-input"
              placeholder="メールアドレスを入力"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup
            label="パスワード"
            labelFor="password-input"
          >
            <InputGroup
              id="password-input"
              placeholder="パスワードを入力"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            type="submit"
            intent="primary"
            icon="floppy-disk"
            text="更新"
          />
        </form>
        <a
          style={{
            color: 'red',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
          href="#"
          onClick={handleOpenAlert}
        >
          アカウント削除
        </a>
        <Alert isOpen={isOpen}
               cancelButtonText="キャンセル"
               onCancel={handleCloseAlert}
               confirmButtonText="削除"
               onConfirm={handleAccountDelete}
               intent="danger"
               icon="trash"
               canEscapeKeyCancel={true}
               canOutsideClickCancel={true}
        >
          本当にアカウントを削除しますか？
        </Alert>
      </Card>
    </div>
  );
};

export default AccountUpdate;
