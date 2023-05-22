import React, { useState } from 'react';
import { Alert, Button } from '@blueprintjs/core';
import { useAuth } from '@providers/AuthApiProvider';
import notify from '@lib/toast';
import { useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useNavigate } from 'react-router-dom';

const AccountDelete: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authApi: api } = useAuth();
  const { clearUser } = useUser();
  const { removeToken } = useSession();
  const navigate = useNavigate();
  const handleOpenAlert = () => {
    setIsOpen(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
  };

  const handleAccountDelete: React.MouseEventHandler<HTMLElement> = (e) => {
    e?.preventDefault();
    api
      .deleteUser()
      .then(() => notify.success('アカウントを削除しました。'))
      .finally(() => {
        clearUser();
        removeToken();
        handleCloseAlert();
        navigate('/login');
      });
  };

  return (
    <>
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
    </>
  );
};

export default AccountDelete;
