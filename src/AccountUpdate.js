import React, { useState } from 'react';
import { Alert, Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import { useUser } from './providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import accountUpdateValidator from './validators/accountUpdate';
import { useAuth } from './providers/AuthApiProvider';

const AccountUpdate = () => {
  const { user, updateUser, clearUser } = useUser();
  const { authApi } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    if (accountUpdateValidator(email, password).isInvalid) return;
    let params = {};
    if (email !== '') params = { ...params, email };
    if (password !== '') params = { ...params, password };
    authApi.updateUser(params).then((r) => {
      if (r.status !== 200) return;
      updateUser(
        email,
        r.headers['uid'],
      );
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
    authApi.deleteUser().finally(() => {
      clearUser();
      handleCloseAlert();
      navigate('/login');
    });
  };

  return (
    <div className="session-container">
      <Card elevation="2" className="session-card">
        <form onSubmit={handleAccountUpdate}>
          <FormGroup label="メールアドレス" labelFor="email-input">
            <InputGroup
              id="email-input"
              placeholder="メールアドレスを入力"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup label="パスワード" labelFor="password-input">
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
        <Button
          text="アカウント削除"
          icon="trash"
          intent="danger"
          onClick={handleOpenAlert}
          minimal={true}
          small={true}
        />
        <Alert
          isOpen={isOpen}
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
