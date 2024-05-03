import React, { useState } from 'react';
import { Alert, Button, Intent } from '@blueprintjs/core';
import { ACCOUNT_DELETE } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import useAccount from '@src/hooks/useAccount';

export default function AccountDelete() {
  const [isOpen, setIsOpen] = useState(false);
  const { remove: accountDelete } = useAccount();
  const handleOpenAlert = () => {
    setIsOpen(true);
  };

  const handleCloseAlert = () => {
    setIsOpen(false);
  };

  const handleAccountDelete: React.MouseEventHandler<HTMLElement> = (e) => {
    e?.preventDefault();
    accountDelete();
    handleCloseAlert();
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
}
