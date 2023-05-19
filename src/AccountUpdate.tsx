import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Alert, Button, FormGroup, InputGroup, Card } from '@blueprintjs/core';
import { useUser, User } from './providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import accountUpdateValidator from './validators/accountUpdate';
import { useAuth } from './providers/AuthApiProvider';
import { useSession } from './providers/SessionProvider';
import { UserParams } from './lib/api/session';

const AccountUpdate: React.FC = () => {
  const { removeToken } = useSession();
  const { user, updateUser, clearUser } = useUser();
  const { authApi } = useAuth();
  const [email, setEmail] = useState((user as User).email);
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccountUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (accountUpdateValidator(email, password).isInvalid) return;
    let params: UserParams = {};
    if (email !== '') params = { ...params, email };
    if (password !== '') params = { ...params, password };
    authApi.updateUser(params).then((r) => {
      if (r.status !== 200) return;
      updateUser(email);
      navigate('/');
    });
  };

  const handleOpenAlert = () => {
    setIsOpen(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
  };

  const handleAccountDelete: React.MouseEventHandler<HTMLElement> = (e) => {
    e?.preventDefault();
    authApi.deleteUser().finally(() => {
      clearUser();
      removeToken();
      handleCloseAlert();
      navigate('/login');
    });
  };

  return (
    <div className="session-container">
      <Card elevation={2} className="session-card">
        <form onSubmit={handleAccountUpdate}>
          <FormGroup label="メールアドレス" labelFor="email-input">
            <InputGroup
              id="email-input"
              placeholder="メールアドレスを入力"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </FormGroup>
          <FormGroup label="パスワード" labelFor="password-input">
            <InputGroup
              id="password-input"
              placeholder="パスワードを入力"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
