import { LifelogEditDialogProps } from '@lifelog/container/LifelogEditDialog';
import { Lifelog, useLifelog } from '@providers/LifelogProvider';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type LifelogEditDialogContextType = {
  openEditDialog: (log: Lifelog) => void;
  editDialogProps: LifelogEditDialogProps;
};

const LifelogEditDialogContext = createContext(
  {} as LifelogEditDialogContextType
);
export const useLifelogEditDialog = () => useContext(LifelogEditDialogContext);

export const LifelogEditDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { newLog } = useLifelog();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [editLog, setEditLog] = useState<Lifelog>(newLog());

  const openEditDialog = (log: Lifelog) => {
    if (isOpenEditDialog) return;
    setIsOpenEditDialog(true);
    setEditLog(log);
  };

  const closeEditDialog = () => {
    setIsOpenEditDialog(false);
  };

  const editDialogProps: LifelogEditDialogProps = {
    log: editLog,
    isOpen: isOpenEditDialog,
    handleCloseDialog: closeEditDialog,
  };

  return (
    <LifelogEditDialogContext.Provider
      value={{
        openEditDialog,
        editDialogProps,
      }}
    >
      {children}
    </LifelogEditDialogContext.Provider>
  );
};

export default LifelogEditDialogProvider;
