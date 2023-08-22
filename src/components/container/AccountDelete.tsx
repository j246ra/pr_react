import React, { useState } from 'react';
import { Alert, Button, Intent } from '@blueprintjs/core';
import { useAuth } from '@providers/AuthApiProvider';
import notify from '@lib/toast';
import { useUser } from '@providers/UserProvider';
import { useSession } from '@providers/SessionProvider';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_DELETE } from '@lib/consts';
import { IconNames } from '@blueprintjs/icons';

const AccountDelete: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authApi: api } = useAuth();
  const { clearUser } = useUser();
  const { removeHeaders } = useSession();
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
      .then(() => notify.success(ACCOUNT_DELETE.MESSAGE.SUCCESS))
      .finally(() => {
        clearUser();
        removeHeaders();
        handleCloseAlert();
        navigate('/login');
      });
  };

  return (
    <>
      <Button
        text={ACCOUNT_DELETE.BUTTON.DELETE}
        icon="trash"
        intent="danger"
        onClick={handleOpenAlert}
        minimal={true}
        small={true}
      />
      <Alert
        isOpen={isOpen}
        cancelButtonText={ACCOUNT_DELETE.ALERT.CANCEL}
        onCancel={handleCloseAlert}
        confirmButtonText={ACCOUNT_DELETE.ALERT.CONFIRM}
        onConfirm={handleAccountDelete}
        intent={Intent.DANGER}
        icon={IconNames.TRASH}
        canEscapeKeyCancel={true}
        canOutsideClickCancel={true}
      >
        {ACCOUNT_DELETE.ALERT.MESSAGE}
      </Alert>
    </>
  );
};

export default AccountDelete;
